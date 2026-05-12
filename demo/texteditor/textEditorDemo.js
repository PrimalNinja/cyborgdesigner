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

// Demo 1: TEXTAREA mode with operations
var demoTextarea = new textEditor(api, 'demo-textarea',
{
    mode: 'TEXTAREA',
    rows: 6,
    placeholder: 'Enter multi-line text here...',
    initialvalue: 'This is a textarea.\nIt supports multiple lines.\nTry loading and saving files!',
    allowload: true,
    allowsave: true,
    cbOnChange: function(strValue_a)
    {
        console.log('Textarea changed, length:', strValue_a.length);
    },
    cbOnOperation: function(strCode_a, strValue_a)
    {
        switch (strCode_a)
        {
            case 'UPPER':
                demoTextarea.setValue(strValue_a.toUpperCase());
                break;
            case 'LOWER':
                demoTextarea.setValue(strValue_a.toLowerCase());
                break;
            case 'CLEAR':
                demoTextarea.clear();
                break;
            default:
                break;
        }
    },
    operations: [
        { code: 'UPPER', caption: 'UPPER', style: 'btn-outline-secondary' },
        { code: 'LOWER', caption: 'lower', style: 'btn-outline-secondary' },
        { code: 'CLEAR', caption: 'Clear',  style: 'btn-outline-danger' }
    ]
});

// Demo 2: INPUT mode
var demoInput = new textEditor(api, 'demo-input',
{
    mode: 'INPUT',
    placeholder: 'Single line input...',
    initialvalue: 'Single line text',
    showstatus: false,
    allowload: false,
    allowsave: false
});

// Demo 3: RICH mode with formatting operations
var demoRich = new textEditor(api, 'demo-rich',
{
    mode: 'RICH',
    rows: 6,
    allowformatting: true,
    placeholder: 'Rich text editing...',
    initialvalue: '<b>Bold</b> and <i>italic</i> text.',
    allowload: true,
    allowsave: true,
    cbOnOperation: function(strCode_a, strValue_a)
    {
        var objRich = api.element('#demo-rich .ge-texteditor-rich');
        switch (strCode_a)
        {
            case 'H1':
                document.execCommand('formatBlock', false, 'h1');
                objRich.focus();
                break;
            case 'H2':
                document.execCommand('formatBlock', false, 'h2');
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
            default:
                break;
        }
    },
    operations: [
        { code: 'H1', caption: 'H1', style: 'btn-outline-secondary' },
        { code: 'H2', caption: 'H2', style: 'btn-outline-secondary' },
        { code: 'P',  caption: 'P',  style: 'btn-outline-secondary' },
        { code: 'HR', caption: '&mdash; HR', style: 'btn-outline-secondary' }
    ]
});

// Demo 4: CODE mode with operations
var demoCode = new textEditor(api, 'demo-code',
{
    mode: 'CODE',
    language: 'javascript',
    rows: 8,
    placeholder: 'Write JavaScript code...',
    initialvalue: 'function calculateTotal(items) {\n    return items.reduce(function(sum, item) {\n        return sum + item.price;\n    }, 0);\n}\n\n// Try the operations!',
    showlinenumbers: true,
    allowload: true,
    allowsave: true,
    cbOnChange: function(strValue_a)
    {
        console.log('Code changed');
    },
    cbOnOperation: function(strCode_a, strValue_a)
    {
        switch (strCode_a)
        {
            case 'COPY':
                if (navigator.clipboard)
                {
                    navigator.clipboard.writeText(strValue_a);
                }
                break;
            case 'CLEAR':
                demoCode.clear();
                break;
            default:
                break;
        }
    },
    operations: [
        { code: 'COPY',  caption: 'Copy',  style: 'btn-outline-secondary' },
        { code: 'CLEAR', caption: 'Clear', style: 'btn-outline-danger' }
    ]
});

// Demo 5: READONLY mode (no toolbar, no operations)
var demoReadonly = new textEditor(api, 'demo-readonly',
{
    mode: 'TEXTAREA',
    rows: 4,
    readonly: true,
    initialvalue: 'This is read-only text.\nYou cannot edit this content.\nNo toolbar appears in readonly mode.',
    showstatus: true,
    allowload: false,
    allowsave: false
});

// Demo 6: JSON editor with save callback and validate operation
var demoJson = new textEditor(api, 'demo-json',
{
    mode: 'CODE',
    language: 'json',
    rows: 8,
    placeholder: 'Enter JSON here...',
    initialvalue: '{\n  "name": "My App",\n  "version": "1.0.0",\n  "dependencies": {\n    "jquery": "^3.6.0",\n    "bootstrap": "^5.0.0"\n  }\n}',
    showlinenumbers: true,
    cbOnOperation: function(strCode_a, strValue_a)
    {
        switch (strCode_a)
        {
            case 'VALIDATE':
                try
                {
                    JSON.parse(strValue_a);
                    alert('\u2713 Valid JSON');
                }
                catch (objError)
                {
                    alert('\u2717 Invalid JSON:\n' + objError.message);
                }
                break;
            case 'CLEAR':
                demoJson.clear();
                break;
            default:
                break;
        }
    },
    operations: [
        { code: 'VALIDATE', caption: '\u2713 Validate', style: 'btn-outline-success' },
        { code: 'CLEAR',    caption: 'Clear',           style: 'btn-outline-danger' }
    ]
});