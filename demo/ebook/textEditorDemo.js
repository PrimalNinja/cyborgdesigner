// ── api shim (verbatim from demo) ─────────────────────────────────────────
    var api = {
        element: function(strScope_a, strClass_a)
        {
            if (arguments.length === 1)
            {
                return $(strScope_a);
            }
            else
            {
                return $(strClass_a, strScope_a);
            }
        }
    };

    // ── toast ─────────────────────────────────────────────────────────────────
    var g_intToastTimer = null;

    function showToast(strMsg_a)
    {
        var objToast = $('#toast');
        objToast.text(strMsg_a).show();
        if (g_intToastTimer) { clearTimeout(g_intToastTimer); }
        g_intToastTimer = setTimeout(function() { objToast.hide(); }, 2400);
    }

    // ── MD → HTML conversion ──────────────────────────────────────────────────
    function mdInline(str_a)
    {
        var strOut = $('<div>').text(str_a).html(); // html-encode
        strOut = strOut.replace(/`([^`]+)`/g, '<code>$1</code>');
        strOut = strOut.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
        strOut = strOut.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        strOut = strOut.replace(/__(.+?)__/g, '<strong>$1</strong>');
        strOut = strOut.replace(/\*(.+?)\*/g, '<em>$1</em>');
        strOut = strOut.replace(/_(.+?)_/g, '<em>$1</em>');
        strOut = strOut.replace(/  $/, '<br>');
        return strOut;
    }

    function mdToHtml(strMd_a)
    {
        var arrLines = strMd_a.split(/\r?\n/);
        var strOut = '';
        var blnInPre = false;
        var blnInOl = false;
        var blnInUl = false;
        var intI = 0;

        function closeLists()
        {
            if (blnInOl) { strOut += '</ol>'; blnInOl = false; }
            if (blnInUl) { strOut += '</ul>'; blnInUl = false; }
        }

        while (intI < arrLines.length)
        {
            var strLine    = arrLines[intI];
            var strTrimmed = strLine.trim();

            if (strTrimmed.match(/^```/))
            {
                closeLists();
                if (!blnInPre) { strOut += '<pre>'; blnInPre = true; }
                else           { strOut += '</pre>'; blnInPre = false; }
                intI = intI + 1;
                continue;
            }

            if (blnInPre)
            {
                strOut += $('<div>').text(strLine).html() + '\n';
                intI = intI + 1;
                continue;
            }

            if      (strTrimmed.match(/^#{4,} /)) { closeLists(); strOut += '<h3>' + mdInline(strTrimmed.replace(/^#{4,} /, '')) + '</h3>'; }
            else if (strTrimmed.match(/^### /))    { closeLists(); strOut += '<h3>' + mdInline(strTrimmed.replace(/^### /, ''))  + '</h3>'; }
            else if (strTrimmed.match(/^## /))     { closeLists(); strOut += '<h2>' + mdInline(strTrimmed.replace(/^## /, ''))   + '</h2>'; }
            else if (strTrimmed.match(/^# /))      { closeLists(); strOut += '<h1>' + mdInline(strTrimmed.replace(/^# /, ''))    + '</h1>'; }
            else if (strTrimmed.match(/^(\-{3,}|\*{3,}|_{3,})$/)) { closeLists(); strOut += '<hr>'; }
            else if (strTrimmed.match(/^\d+\.\s+/))
            {
                if (blnInUl) { strOut += '</ul>'; blnInUl = false; }
                if (!blnInOl) { strOut += '<ol>'; blnInOl = true; }
                strOut += '<li>' + mdInline(strTrimmed.replace(/^\d+\.\s+/, '')) + '</li>';
            }
            else if (strTrimmed.match(/^[-*+]\s+/))
            {
                if (blnInOl) { strOut += '</ol>'; blnInOl = false; }
                if (!blnInUl) { strOut += '<ul>'; blnInUl = true; }
                strOut += '<li>' + mdInline(strTrimmed.replace(/^[-*+]\s+/, '')) + '</li>';
            }
            else if (strTrimmed === '') { closeLists(); strOut += '<p><br></p>'; }
            else                        { closeLists(); strOut += '<p>' + mdInline(strTrimmed) + '</p>'; }

            intI = intI + 1;
        }

        closeLists();
        if (blnInPre) { strOut += '</pre>'; }

        return strOut;
    }

    // ── EPUB builder ──────────────────────────────────────────────────────────
    function escXml(str_a)
    {
        return String(str_a).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
    }

    function buildEpub(strTitle_a, strAuthor_a)
    {
        var objRich     = $('#ms-editor .gs-texteditor-rich')[0];
        var arrChildren = Array.prototype.slice.call(objRich.childNodes);
        var arrChapters = [];
        var objCurrent  = { title: '', html: '' };
        var intI = 0;

        while (intI < arrChildren.length)
        {
            var objNode = arrChildren[intI];
            if (objNode.nodeType === 1 && objNode.tagName === 'H1')
            {
                if (objCurrent.html.trim().length > 0 || objCurrent.title.length > 0) { arrChapters.push(objCurrent); }
                objCurrent = { title: objNode.innerText || '', html: '' };
            }
            else
            {
                objCurrent.html += objNode.outerHTML || '';
            }
            intI = intI + 1;
        }
        if (objCurrent.html.trim().length > 0 || objCurrent.title.length > 0) { arrChapters.push(objCurrent); }
        if (arrChapters.length === 0) { arrChapters.push({ title: '', html: objRich.innerHTML }); }

        var objZip  = new JSZip();
        var strUUID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c_a) { var r = Math.random()*16|0; return (c_a==='x'?r:(r&0x3|0x8)).toString(16); });
        var strNow  = new Date().toISOString().replace(/\.\d+Z$/, 'Z');

        objZip.file('mimetype', 'application/epub+zip', { compression: 'STORE' });
        objZip.folder('META-INF').file('container.xml',
            '<?xml version="1.0" encoding="UTF-8"?>\n<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">\n' +
            '  <rootfiles><rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/></rootfiles>\n</container>');

        var objOEBPS = objZip.folder('OEBPS');
        objOEBPS.folder('css').file('style.css',
            'body{font-family:serif;font-size:1em;line-height:1.8;margin:1em 2em}\n' +
            'h1{font-size:1.6em;font-weight:bold;margin:2em 0 1em;text-align:center;page-break-before:always}\n' +
            'h1:first-child{page-break-before:avoid}\n' +
            'h2{font-size:1.2em;font-weight:bold;margin:1.5em 0 .5em}\n' +
            'h3{font-size:1em;font-style:italic;font-weight:normal;margin:1em 0 .5em}\n' +
            'p{margin:0;text-indent:1.5em}\nh1+p,h2+p,h3+p{text-indent:0}\n' +
            'hr{border:none;border-top:1px solid #000;margin:1.5em 0}\n' +
            'pre{font-family:monospace;font-size:.9em;white-space:pre-wrap;border:1px solid #ccc;padding:.5em}\n' +
            'ol,ul{margin:.4em 0 .4em 1.6em}\n');

        var arrSpine = [];
        intI = 0;

        while (intI < arrChapters.length)
        {
            var objChap      = arrChapters[intI];
            var strId        = 'chapter' + (intI + 1);
            var strChapTitle = objChap.title.length > 0 ? objChap.title : strTitle_a;
            var strH1        = objChap.title.length > 0 ? '<h1>' + escXml(objChap.title) + '</h1>\n' : '';

            objOEBPS.folder('chapters').file(strId + '.xhtml',
                '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE html>\n' +
                '<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en"><head>\n' +
                '  <meta charset="UTF-8"/><title>' + escXml(strChapTitle) + '</title>\n' +
                '  <link rel="stylesheet" type="text/css" href="../css/style.css"/>\n' +
                '</head><body>\n' + strH1 + objChap.html + '\n</body></html>');

            arrSpine.push({ id: strId, title: strChapTitle });
            intI = intI + 1;
        }

        var strManifest = '';
        var strSpine    = '';
        var strNav      = '';

        intI = 0;
        while (intI < arrSpine.length)
        {
            var objItem  = arrSpine[intI];
            strManifest += '    <item id="' + objItem.id + '" href="chapters/' + objItem.id + '.xhtml" media-type="application/xhtml+xml"/>\n';
            strSpine    += '    <itemref idref="' + objItem.id + '"/>\n';
            strNav      += '    <navPoint id="nav' + (intI+1) + '" playOrder="' + (intI+1) + '">\n' +
                           '      <navLabel><text>' + escXml(objItem.title) + '</text></navLabel>\n' +
                           '      <content src="chapters/' + objItem.id + '.xhtml"/>\n    </navPoint>\n';
            intI = intI + 1;
        }

        objOEBPS.file('content.opf',
            '<?xml version="1.0" encoding="UTF-8"?>\n<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="bookid">\n' +
            '  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">\n' +
            '    <dc:identifier id="bookid">urn:uuid:' + strUUID + '</dc:identifier>\n' +
            '    <dc:title>' + escXml(strTitle_a) + '</dc:title>\n' +
            '    <dc:creator>' + escXml(strAuthor_a) + '</dc:creator>\n' +
            '    <dc:language>en</dc:language>\n' +
            '    <meta property="dcterms:modified">' + strNow + '</meta>\n' +
            '  </metadata>\n  <manifest>\n' +
            '    <item id="css" href="css/style.css" media-type="text/css"/>\n' +
            '    <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>\n' +
            strManifest + '  </manifest>\n  <spine toc="ncx">\n' + strSpine + '  </spine>\n</package>');

        objOEBPS.file('toc.ncx',
            '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE ncx PUBLIC "-//NISO//DTD ncx 2005-1//EN" "http://www.daisy.org/z3986/2005/ncx-2005-1.dtd">\n' +
            '<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">\n' +
            '  <head><meta name="dtb:uid" content="urn:uuid:' + strUUID + '"/></head>\n' +
            '  <docTitle><text>' + escXml(strTitle_a) + '</text></docTitle>\n' +
            '  <navMap>\n' + strNav + '  </navMap>\n</ncx>');

        return objZip.generateAsync({ type: 'blob', mimeType: 'application/epub+zip', compression: 'DEFLATE', compressionOptions: { level: 9 } });
    }


    // ── Rich HTML → CyborgWiki conversion ────────────────────────────────────
    function richToWiki(objEl_a)
    {
        var arrLines = [];
        var arrNodes = Array.prototype.slice.call(objEl_a.childNodes);
        var intI = 0;

        while (intI < arrNodes.length)
        {
            var objNode = arrNodes[intI];
            arrLines.push(nodeToWiki(objNode));
            intI = intI + 1;
        }

        return arrLines.join('\n');
    }

    function nodeToWiki(objNode_a)
    {
        if (objNode_a.nodeType === 3) // text node
        {
            return objNode_a.nodeValue;
        }

        if (objNode_a.nodeType !== 1)
        {
            return '';
        }

        var strTag     = objNode_a.tagName.toUpperCase();
        var strInner   = innerNodesToWiki(objNode_a);
        var strText    = objNode_a.innerText || objNode_a.textContent || '';

        switch (strTag)
        {
            case 'H1':   return '= ' + strText.trim() + ' =';
            case 'H2':   return '== ' + strText.trim() + ' ==';
            case 'H3':   return '=== ' + strText.trim() + ' ===';
            case 'H4':
            case 'H5':
            case 'H6':   return '==== ' + strText.trim() + ' ====';
            case 'B':
            case 'STRONG': return "'''" + strInner + "'''";
            case 'I':
            case 'EM':   return "''" + strInner + "''";
            case 'HR':   return '- - - -';
            case 'BR':   return '';
            case 'PRE':
            case 'CODE': return '<code>' + strText + '</code>';
            case 'A':
                var strHref  = objNode_a.getAttribute('href') || '';
                var strLabel = strText.trim();
                return '[' + strHref + '|' + strLabel + ']';
            case 'UL':
                return listToWiki(objNode_a, '*');
            case 'OL':
                return listToWiki(objNode_a, '#');
            case 'LI':
                return strInner;
            case 'TABLE':
                return tableToWiki(objNode_a);
            case 'P':
                var strPContent = strInner.trim();
                return strPContent.length === 0 ? '' : strPContent;
            case 'DIV':
            case 'SPAN':
                return strInner;
            default:
                return strInner;
        }
    }

    function innerNodesToWiki(objEl_a)
    {
        var strOut = '';
        var arrNodes = Array.prototype.slice.call(objEl_a.childNodes);
        var intI = 0;

        while (intI < arrNodes.length)
        {
            strOut += nodeToWiki(arrNodes[intI]);
            intI = intI + 1;
        }

        return strOut;
    }

    function listToWiki(objEl_a, strPrefix_a)
    {
        var strOut  = '';
        var arrItems = objEl_a.querySelectorAll('li');
        var intI = 0;

        while (intI < arrItems.length)
        {
            strOut += strPrefix_a + innerNodesToWiki(arrItems[intI]) + '\n';
            intI = intI + 1;
        }

        return strOut.replace(/\n$/, '');
    }

    function tableToWiki(objEl_a)
    {
        var strOut  = '{|\n';
        var arrRows = objEl_a.querySelectorAll('tr');
        var intR = 0;

        while (intR < arrRows.length)
        {
            var arrCells = Array.prototype.slice.call(arrRows[intR].childNodes).filter(function(objN_a)
            {
                return objN_a.nodeType === 1 && (objN_a.tagName === 'TD' || objN_a.tagName === 'TH');
            });

            if (arrCells.length === 0)
            {
                intR = intR + 1;
                continue;
            }

            var blnHeader = arrCells[0].tagName === 'TH';
            var strPrefix = blnHeader ? '! ' : '| ';
            var strSep    = blnHeader ? ' !! ' : ' || ';
            var arrVals   = [];
            var intC = 0;

            while (intC < arrCells.length)
            {
                arrVals.push(innerNodesToWiki(arrCells[intC]).trim());
                intC = intC + 1;
            }

            if (intR > 0) { strOut += '|-\n'; }
            strOut += strPrefix + arrVals.join(strSep) + '\n';
            intR = intR + 1;
        }

        strOut += '|}';
        return strOut;
    }

    // ── cbOnOperation handler ─────────────────────────────────────────────────
    function onOperation(strCode_a, strCurrentValue_a)
    {
        var objRich = $('#ms-editor .gs-texteditor-rich');

        switch (strCode_a)
        {
            case 'FONT-MONO':
                document.execCommand('fontName', false, 'monospace');
                objRich.focus();
                break;

            case 'FONT-TIMES':
                document.execCommand('fontName', false, 'Times New Roman, Times, serif');
                objRich.focus();
                break;

            case 'FONT-COURIER':
                document.execCommand('fontName', false, 'Courier New, Courier, monospace');
                objRich.focus();
                break;

            case 'H1':
                document.execCommand('formatBlock', false, 'h1');
                objRich.focus();
                break;

            case 'H2':
                document.execCommand('formatBlock', false, 'h2');
                objRich.focus();
                break;

            case 'H3':
                document.execCommand('formatBlock', false, 'h3');
                objRich.focus();
                break;

            case 'P':
                document.execCommand('formatBlock', false, 'p');
                objRich.focus();
                break;

            case 'HR':
                document.execCommand('insertHorizontalRule', false, null);
                objRich.focus();
                break;

            case 'WIKI-RICH':
                var strWikiRaw = objRich[0].innerText || '';
                if (strWikiRaw.trim().length === 0) { break; }
                objRich.html(cyborgWikiToHtml(strWikiRaw, '', '', []));
                showToast('Wiki converted to rich text');
                break;

            case 'RICH-WIKI':
                objRich.html(richToWiki(objRich[0]));
                showToast('Rich text converted to wiki');
                break;

            case 'MD-RICH':
                var strRaw = objRich[0].innerText || '';
                if (strRaw.trim().length === 0) { break; }
                objRich.html(mdToHtml(strRaw));
                showToast('Markdown converted');
                break;

            case 'EPUB':
                var strTitle  = $('#input-title').val().trim()  || 'My Book';
                var strAuthor = $('#input-author').val().trim() || 'Unknown Author';
                if ((objRich[0].innerText || '').trim().length === 0) { alert('Nothing to export.'); break; }
                showToast('Building EPUB\u2026');
                buildEpub(strTitle, strAuthor).then(function(objBlob_a)
                {
                    var strFilename = strTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.epub';
                    var strURL = URL.createObjectURL(objBlob_a);
                    var objLink = document.createElement('a');
                    objLink.href = strURL;
                    objLink.download = strFilename;
                    document.body.appendChild(objLink);
                    objLink.click();
                    document.body.removeChild(objLink);
                    URL.revokeObjectURL(strURL);
                    showToast('Saved ' + strFilename);
                });
                break;

            default:
                break;
        }
    }

    // ── paste intercept: always plain text into rich editor ───────────────────
    $(document).on('paste', '#ms-editor .gs-texteditor-rich', function(objEvt_a)
    {
        objEvt_a.preventDefault();
        var strPlain = (objEvt_a.originalEvent || objEvt_a).clipboardData.getData('text/plain');
        document.execCommand('insertText', false, strPlain);
    });

    // ── init editor ───────────────────────────────────────────────────────────
    var g_objEditor = new textEditor(api, 'ms-editor',
    {
        mode: 'RICH',
        rows: 30,
        allowformatting: true,
        allowload: true,
        allowsave: true,
        showstatus: true,
        placeholder: 'Paste your manuscript here, or load a file.\nUse MD \u2192 Rich to convert Markdown.',
        initialvalue: '',
        cbOnOperation: onOperation,
        operations: [
            { code: 'FONT-MONO',    caption: 'Mono',    style: 'btn-outline-secondary' },
            { code: 'FONT-TIMES',   caption: 'Times',   style: 'btn-outline-secondary' },
            { code: 'FONT-COURIER', caption: 'Courier', style: 'btn-outline-secondary' },
            { code: 'H1',           caption: 'H1',      style: 'btn-outline-secondary' },
            { code: 'H2',           caption: 'H2',      style: 'btn-outline-secondary' },
            { code: 'H3',           caption: 'H3',      style: 'btn-outline-secondary' },
            { code: 'P',            caption: 'P',       style: 'btn-outline-secondary' },
            { code: 'HR',           caption: '&mdash; HR', style: 'btn-outline-secondary' },
            { code: 'MD-RICH',      caption: 'MD &rarr; Rich',   style: 'btn-outline-warning' },
            { code: 'WIKI-RICH',    caption: 'Wiki &rarr; Rich', style: 'btn-outline-warning' },
            { code: 'RICH-WIKI',    caption: 'Rich &rarr; Wiki', style: 'btn-outline-warning' },
            { code: 'EPUB',         caption: '&darr; Save as EPUB',  style: 'btn-outline-primary' }
        ]
    });

    // ── structure panel ───────────────────────────────────────────────────────
    $('#btn-structure').on('click', function()
    {
        var arrH = $('#ms-editor .gs-texteditor-rich').find('h1, h2, h3');
        var objList  = $('#struct-list');
        var objBadge = $('#struct-badge');

        if (arrH.length === 0)
        {
            objList.html('<div style="padding:12px; font-size:12px; color:#adb5bd;">No headings found.</div>');
            objBadge.hide();
            return;
        }

        var strHTML = '';
        var intI = 0;

        while (intI < arrH.length)
        {
            var objH    = arrH[intI];
            var strTag  = objH.tagName.toLowerCase();
            var strSafe = $('<div>').text(objH.innerText).html();
            strHTML += '<div class="struct-item ' + strTag + '" data-idx="' + intI + '">' + strSafe + '</div>';
            intI = intI + 1;
        }

        objList.html(strHTML);
        objBadge.text(arrH.length).show();

        objList.find('.struct-item').on('click', function()
        {
            var intIdx = parseInt($(this).attr('data-idx'), 10);
            var objTarget = $('#ms-editor .gs-texteditor-rich').find('h1, h2, h3')[intIdx];
            if (objTarget) { objTarget.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
        });
    });