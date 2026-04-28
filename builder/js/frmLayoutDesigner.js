// js/frmLayoutDesigner.js
// Layout Designer - wraps cyborgDesigner full screen
// (c) 2025 Cyborg Unicorn Pty Ltd.

function frmLayoutDesigner(strFormID_a, objOS_a, objParameters_a)
{
	var m_strFormID     = strFormID_a;
	var api             = objOS_a;
	var m_objParameters = objParameters_a || {};

	var m_strEntity = m_objParameters.entity || 'form';
	var m_strCode   = m_objParameters.code   || '';
	var m_cbOnSave  = m_objParameters.onSave || null;

	var m_blnIsNew    = (m_strCode.length === 0);
	var m_blnDirty    = false;
	var m_blnInitialised = false;
	var m_arrSections = [];

	var m_strTargetID = 'ge-frmLayoutDesigner-' + m_strFormID.replace(/[^a-zA-Z0-9]/g, '');

	// ============================================================
	// DATATYPES
	// ============================================================

	var m_arrNativeDatatypes = [
		{ type: 'nativetextbox', caption: 'Native Text', container: false, properties: [
			{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
			{ name: 'value', label: 'Value', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'length', label: 'Length', datatype: 'nativetextbox' },
			{ name: 'qty', label: 'Qty', datatype: 'nativetextbox' },
			{ name: 'required', label: 'Required', datatype: 'nativeyesno', showinbuilder: true },
			{ name: 'readonly', label: 'Read Only', datatype: 'nativeyesno', showinbuilder: true },
			{ name: 'searchable', label: 'Searchable', datatype: 'nativeyesno', showinbuilder: true },
			{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
			{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
		]},
		{ type: 'nativemultilinetextbox', caption: 'Native Multiline Text', container: false, properties: [
			{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
			{ name: 'value', label: 'Value', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'length', label: 'Length', datatype: 'nativetextbox' },
			{ name: 'lines', label: 'Total Lines', datatype: 'nativetextbox' },
			{ name: 'qty', label: 'Qty', datatype: 'nativetextbox' },
			{ name: 'required', label: 'Required', datatype: 'nativeyesno', showinbuilder: true },
			{ name: 'readonly', label: 'Read Only', datatype: 'nativeyesno', showinbuilder: true },
			{ name: 'searchable', label: 'Searchable', datatype: 'nativeyesno', showinbuilder: true },
			{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
			{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
		]},
		{ type: 'nativelist', caption: 'Native List', container: false, properties: [
			{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
			{ name: 'length', label: 'Length', datatype: 'nativetextbox' },
			{ name: 'qty', label: 'Qty', datatype: 'nativetextbox' },
			{ name: 'value', label: 'Value', datatype: 'nativelistoption', showinbuilder: true },
			{ name: 'options', label: 'Option List', datatype: [ 'nativelistoption' ] },
			{ name: 'datasource', label: 'Data Source', datatype: 'nativetextbox' },
			{ name: 'datafilter', label: 'Data Filter', datatype: 'nativetextbox' },
			{ name: 'datafields', label: 'Data Fields', datatype: 'nativetextbox' },
			{ name: 'required', label: 'Required', datatype: 'nativeyesno', showinbuilder: true },
			{ name: 'readonly', label: 'Read Only', datatype: 'nativeyesno', showinbuilder: true },
			{ name: 'searchable', label: 'Searchable', datatype: 'nativeyesno', showinbuilder: true },
			{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
			{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
		]},
		{ type: 'nativemultilist', caption: 'Native Multi List', container: false, properties: [
			{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
			{ name: 'length', label: 'Length', datatype: 'nativetextbox' },
			{ name: 'qty', label: 'Qty', datatype: 'nativetextbox' },
			{ name: 'values', label: 'Value List', datatype: [ 'nativelistoption' ], showinbuilder: true },
			{ name: 'options', label: 'Option List', datatype: [ 'nativelistoption' ] },
			{ name: 'datasource', label: 'Data Source', datatype: 'nativetextbox' },
			{ name: 'datafilter', label: 'Data Filter', datatype: 'nativetextbox' },
			{ name: 'datafields', label: 'Data Fields', datatype: 'nativetextbox' },
			{ name: 'required', label: 'Required', datatype: 'nativeyesno', showinbuilder: true },
			{ name: 'readonly', label: 'Read Only', datatype: 'nativeyesno', showinbuilder: true },
			{ name: 'searchable', label: 'Searchable', datatype: 'nativeyesno', showinbuilder: true },
			{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
			{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
		]},
		{ type: 'nativelistoption', caption: 'Native List Option', container: false, properties: [
			{ name: 'value', label: 'Value', datatype: 'nativetextbox' },
			{ name: 'code', label: 'Code', datatype: 'nativetextbox' },
			{ name: 'description', label: 'Description', datatype: 'nativetextbox' }
		]},
		{ type: 'nativeyesno', caption: 'Native Yes/No', container: false, properties: [
			{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
			{ name: 'value', label: 'Value', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'required', label: 'Required', datatype: 'nativeyesno', showinbuilder: true },
			{ name: 'readonly', label: 'Read Only', datatype: 'nativeyesno', showinbuilder: true },
			{ name: 'searchable', label: 'Searchable', datatype: 'nativeyesno', showinbuilder: true },
			{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
			{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
		]}
	];

	var m_arrDatatypes = [
		{ type: '--', caption: 'Controls', container: false, properties: [] },
		{ type: 'button', caption: 'Button', container: false, properties: [
			{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
			{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
			{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
		]},
		{ type: 'checkbox', caption: 'Checkbox', container: false, properties: [
			{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
			{ name: 'value', label: 'Value', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'required', label: 'Required', datatype: 'nativeyesno', showinbuilder: true },
			{ name: 'readonly', label: 'Read Only', datatype: 'nativeyesno', showinbuilder: true },
			{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
			{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
		]},
		{ type: 'date', caption: 'Date', container: false, properties: [
			{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
			{ name: 'value', label: 'Value', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'required', label: 'Required', datatype: 'nativeyesno', showinbuilder: true },
			{ name: 'readonly', label: 'Read Only', datatype: 'nativeyesno', showinbuilder: true },
			{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
			{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
		]},
		{ type: 'heading', caption: 'Heading', container: false, properties: [
			{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
			{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
			{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
		]},
		{ type: 'image', caption: 'Image', container: false, properties: [
			{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
			{ name: 'value', label: 'Value', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
			{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
		]},
		{ type: 'instructionaltext', caption: 'Instructional Text', container: false, properties: [
			{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
			{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
			{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
		]},
		{ type: 'label', caption: 'Label', container: false, properties: [
			{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
			{ name: 'value', label: 'Value', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
			{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
		]},
		{ type: 'list', caption: 'List', container: false, properties: [
			{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
			{ name: 'value', label: 'Value', datatype: 'nativelistoption', showinbuilder: true },
			{ name: 'options', label: 'Option List', datatype: [ 'nativelistoption' ] },
			{ name: 'datasource', label: 'Data Source', datatype: 'nativetextbox' },
			{ name: 'datafilter', label: 'Data Filter', datatype: 'nativetextbox' },
			{ name: 'datafields', label: 'Data Fields', datatype: 'nativetextbox' },
			{ name: 'required', label: 'Required', datatype: 'nativeyesno', showinbuilder: true },
			{ name: 'readonly', label: 'Read Only', datatype: 'nativeyesno', showinbuilder: true },
			{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
			{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
		]},
		{ type: 'multilist', caption: 'Multi List', container: false, properties: [
			{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
			{ name: 'values', label: 'Value List', datatype: [ 'nativelistoption' ], showinbuilder: true },
			{ name: 'options', label: 'Option List', datatype: [ 'nativelistoption' ] },
			{ name: 'datasource', label: 'Data Source', datatype: 'nativetextbox' },
			{ name: 'datafilter', label: 'Data Filter', datatype: 'nativetextbox' },
			{ name: 'datafields', label: 'Data Fields', datatype: 'nativetextbox' },
			{ name: 'required', label: 'Required', datatype: 'nativeyesno', showinbuilder: true },
			{ name: 'readonly', label: 'Read Only', datatype: 'nativeyesno', showinbuilder: true },
			{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
			{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
		]},
		{ type: 'multilinetextbox', caption: 'Multiline Text', container: false, properties: [
			{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
			{ name: 'value', label: 'Value', datatype: 'nativemultilinetextbox', showinbuilder: true },
			{ name: 'required', label: 'Required', datatype: 'nativeyesno', showinbuilder: true },
			{ name: 'readonly', label: 'Read Only', datatype: 'nativeyesno', showinbuilder: true },
			{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
			{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
		]},
		{ type: 'number', caption: 'Number', container: false, properties: [
			{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
			{ name: 'value', label: 'Value', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'required', label: 'Required', datatype: 'nativeyesno', showinbuilder: true },
			{ name: 'readonly', label: 'Read Only', datatype: 'nativeyesno', showinbuilder: true },
			{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
			{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
		]},
		{ type: 'password', caption: 'Password', container: false, properties: [
			{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
			{ name: 'value', label: 'Value', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'required', label: 'Required', datatype: 'nativeyesno', showinbuilder: true },
			{ name: 'readonly', label: 'Read Only', datatype: 'nativeyesno', showinbuilder: true },
			{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
			{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
		]},
		{ type: 'spacer', caption: 'Spacer', container: false, properties: [
			{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
			{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
			{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
		]},
		{ type: 'textbox', caption: 'Text', container: false, properties: [
			{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
			{ name: 'value', label: 'Value', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'required', label: 'Required', datatype: 'nativeyesno', showinbuilder: true },
			{ name: 'readonly', label: 'Read Only', datatype: 'nativeyesno', showinbuilder: true },
			{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
			{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
		]},
		{ type: 'time', caption: 'Time', container: false, properties: [
			{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
			{ name: 'value', label: 'Value', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'required', label: 'Required', datatype: 'nativeyesno', showinbuilder: true },
			{ name: 'readonly', label: 'Read Only', datatype: 'nativeyesno', showinbuilder: true },
			{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
			{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
		]},
		{ type: 'url', caption: 'URL', container: false, properties: [
			{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
			{ name: 'value', label: 'Value', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'required', label: 'Required', datatype: 'nativeyesno', showinbuilder: true },
			{ name: 'readonly', label: 'Read Only', datatype: 'nativeyesno', showinbuilder: true },
			{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
			{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
		]},
		{ type: 'yesno', caption: 'Yes / No', container: false, properties: [
			{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
			{ name: 'value', label: 'Value', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'required', label: 'Required', datatype: 'nativeyesno', showinbuilder: true },
			{ name: 'readonly', label: 'Read Only', datatype: 'nativeyesno', showinbuilder: true },
			{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
			{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
		]}
	];

	var m_arrContainers = [
		{ type: '--', caption: 'Containers', container: false, properties: [] },
		{ type: 'horizontalcontainer', caption: 'Horizontal Container', container: true, properties: [
			{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
			{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
			{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
		]},
		{ type: 'verticalcontainer', caption: 'Vertical Container', container: true, properties: [
			{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
			{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
			{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
		]},
		{ type: '--', caption: 'Sections', container: false, properties: [] },
		{ type: 'layoutsection', caption: 'Form Section', container: true, properties: [
			{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
			{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
			{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
			{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
		]}
	];

	// ============================================================
	// PRIVATE
	// ============================================================

	function extractFromFormHeader(arrSections_a, strFieldName_a)
	{
		var strResult = '';

		for (var intS = 0; intS < arrSections_a.length; intS++)
		{
			if ((arrSections_a[intS].caption || '').toLowerCase() === 'form header')
			{
				var arrContainers = arrSections_a[intS].containers || [];

				for (var intC = 0; intC < arrContainers.length; intC++)
				{
					var arrChildren = arrContainers[intC].children || [];

					for (var intF = 0; intF < arrChildren.length; intF++)
					{
						if (strResult === '' && (arrChildren[intF].name || '').toLowerCase() === strFieldName_a.toLowerCase())
						{
							strResult = arrChildren[intF].value || '';
						}
					}
				}
			}
		}

		return strResult;
	}

	function doSave()
	{
		var strCode = (extractFromFormHeader(m_arrSections, 'CODE') || '').toLowerCase().replace(/[^a-z0-9_\-]/g, '');

		if (strCode.length === 0)
		{
			alert('Code is required in the Form Header.');
		}
		else
		{
			var objRecord = {
				code:     strCode,
				sections: m_arrSections
			};

			api.saveFile(m_strEntity, strCode, objRecord, function(objResponse_a)
			{
				if (objResponse_a.error && objResponse_a.error.length > 0)
				{
					alert('Save failed: ' + objResponse_a.error);
				}
				else
				{
					m_blnDirty = false;

					if (api.isFunction(m_cbOnSave))
					{
						m_cbOnSave(objRecord);
					}

					api.closeForm(m_strFormID);
				}
			});
		}
	}

	function doClose()
	{
		api.closeForm(m_strFormID);
	}

	function getDefaultSections()
	{
		return [
			{
				id: getGUID('section-'),
				caption: 'Form Header',
				containers: [
					{
						id: getGUID('container-'),
						type: 'verticalcontainer',
						name: 'FORMHEADER',
						label: 'Form Header',
						children: [
							{ id: getGUID('field-'), type: 'textbox', caption: 'Entity Name', label: 'Entity Name', name: 'ENTITYNAME', container: false },
							{ id: getGUID('field-'), type: 'number', caption: 'Form Version', label: 'Form Version', name: 'FORMVERSION', value: '1', container: false },
							{ id: getGUID('field-'), type: 'textbox', caption: 'Code', label: 'Code', name: 'CODE', container: false },
							{ id: getGUID('field-'), type: 'textbox', caption: 'Description', label: 'Description', name: 'DESCRIPTION', container: false },
							{ id: getGUID('field-'), type: 'checkbox', caption: 'Is Enabled?', label: 'Is Enabled?', name: 'ISENABLED', container: false }
						]
					}
				]
			},
			{
				id: getGUID('section-'),
				caption: 'Data Header',
				containers: [
					{
						id: getGUID('container-'),
						type: 'verticalcontainer',
						name: 'DATAHEADER',
						label: 'Data Header',
						children: [
							{ id: getGUID('field-'), type: 'number', caption: 'Data Version', label: 'Data Version', name: 'DATAVERSION', value: '1', container: false }
						]
					}
				]
			},
			{
				id: getGUID('section-'),
				caption: 'Form Data',
				containers: []
			}
		];
	}

	// ============================================================
	// FORM EVENTS
	// ============================================================

	this.Form_allowMultipleInstances = function() { return true; };

	this.Form_canClose = function()
	{
		var blnCanClose = true;

		if (m_blnDirty)
		{
			blnCanClose = confirm('Changes are unsaved. Close and discard?');
		}

		return blnCanClose;
	};

	this.Form_isDirty    = function() { return m_blnDirty; };
	this.Form_onBeforeClose = function() {};
	this.Form_onBroadcast   = function() {};
	this.Form_onClick       = function() {};
	this.Form_onDblClick    = function() {};
	this.Form_onFocus       = function() {};

	this.Form_onLoad = function()
	{
		var intScreenWidth  = api.element(window).width();
		var intScreenHeight = api.element(window).height();

		var intFormWidth  = Math.floor(intScreenWidth  * 0.9);
		var intFormHeight = Math.floor(intScreenHeight * 0.9);
		var intFormLeft   = Math.floor((intScreenWidth  - intFormWidth)  / 2);
		var intFormTop    = Math.floor((intScreenHeight - intFormHeight) / 2);

		api.element('#' + m_strFormID).css(
		{
			'width':  intFormWidth  + 'px',
			'height': intFormHeight + 'px',
			'left':   intFormLeft   + 'px',
			'top':    intFormTop    + 'px'
		});

		api.setFormTitle(m_strFormID, m_blnIsNew ? 'New Layout' : 'Edit Layout: ' + m_strCode);

		// Designer fills the entire form body
		api.element('#' + m_strFormID, '.ge-formbody').css({'display':'flex','flex-direction':'column'}).html(
			'<div class="gs-form-toolbar">' +
			'<button type="button" class="gs-toolbar-btn" data-operation="CLOSE">Close</button>' +
			'<button type="button" class="gs-toolbar-btn" data-operation="SAVE">Save</button>' +
			'</div>' +
			'<div id="' + m_strTargetID + '" class="gscd" style="flex:1;min-height:0;overflow:hidden;"></div>');

		api.element('#' + m_strFormID, '.gs-toolbar-btn').on('click', function()
		{
			var strOperation = api.element(this).attr('data-operation');
			if (strOperation === 'CLOSE') { doClose(); }
			if (strOperation === 'SAVE')  { doSave();  }
		});

		function launchDesigner(arrSections_a)
		{
			m_arrSections = arrSections_a;
			new cyborgDesigner(
			{
				cbElement: api.element,
				//            api.element,
				cbTransformer:        function(objRaw_a) { return objRaw_a; },
				cbDataRenderer:       function(objRaw_a) { m_arrSections = objRaw_a; if (m_blnInitialised) { m_blnDirty = true; } m_blnInitialised = true; },
				cbSave:               function() { doSave(); },
				cbClose:              function() { doClose(); },
				target:               '#' + m_strTargetID,
				datatypes:            m_arrDatatypes,
				containers:           m_arrContainers,
				allowNativeDatatypes: false,
				nativeDatatypes:      m_arrNativeDatatypes,
				layoutSections:       arrSections_a
			});
		}

		if (!m_blnIsNew)
		{
			api.loadFile(m_strEntity, m_strCode, function(objResponse_a)
			{
				var arrSections = [];
				if (objResponse_a.error.length === 0 && objResponse_a.data)
				{
					arrSections = objResponse_a.data.sections || [];
				}
				launchDesigner(arrSections);
			});
		}
		else
		{
			launchDesigner(getDefaultSections());
		}
	};

	this.Form_onResize     = function() {};
	this.FormTitle_onClick = function() {};
}