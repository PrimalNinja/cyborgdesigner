// js/frmEntity.js
// Generic metadata-driven entity form
// (c) 2025 Cyborg Unicorn Pty Ltd.

function frmEntity(strFormID_a, objOS_a, objParameters_a)
{
	var m_objThis       = this;
	var m_strFormID     = strFormID_a;
	var api             = objOS_a;
	var m_objParameters = objParameters_a || {};

	var m_strType   = m_objParameters.type   || 'form';
	var m_strEntity = m_objParameters.entity || '';
	var m_strCode   = m_objParameters.code   || '';
	var m_cbOnSave  = m_objParameters.onSave || null;

	var m_blnIsNew        = (m_strCode.length === 0);
	var m_objFormRenderer = null;
	var m_blnDirty        = false;
	var m_objConfig       = null;

	// ============================================================
	// PRIVATE
	// ============================================================

	function getTargetClass()
	{
		return 'ge-frmEntity-' + m_strFormID.replace(/[^a-zA-Z0-9]/g, '');
	}

	function fetchConfig(cb_a)
	{
		api.loadFile(m_strType, m_strEntity, function(objResponse_a)
		{
			if (objResponse_a.error && objResponse_a.error.length > 0)
			{
				api.print('frmEntity: form config not found for ' + m_strType + '/' + m_strEntity);
				m_objConfig = { title: m_strEntity, sections: [] };
			}
			else
			{
				m_objConfig = objResponse_a.data || { title: m_strEntity, sections: [] };
			}

			if (api.isFunction(cb_a))
			{
				cb_a();
			}
		});
	}

	function fetchRecord(cb_a)
	{
		api.loadFile(m_strEntity, m_strCode, function(objResponse_a)
		{
			if (api.isFunction(cb_a))
			{
				cb_a(objResponse_a);
			}
		});
	}

	function renderForm()
	{
		var strTargetClass = getTargetClass();
		var objBody        = api.element('#' + m_strFormID, '.ge-formbody');
		var arrSections    = m_objConfig.sections || [];

		var strHTML = '<div class="gs-form-toolbar">';
		strHTML    += '<button type="button" class="gs-toolbar-btn" data-operation="CLOSE">Close</button>';
		strHTML    += '<button type="button" class="gs-toolbar-btn" data-operation="SAVE">Save</button>';
		strHTML    += '</div>';
		strHTML    += '<div style="width:100%; height:100%; overflow:auto; padding:10px;">';
		strHTML    += '<div class="' + strTargetClass + '"></div>';
		strHTML    += '</div>';

		objBody.html(strHTML);

		api.element('#' + m_strFormID, '.gs-toolbar-btn').on('click', function()
		{
			var strOperation = api.element(this).attr('data-operation');
			onToolbarOperation(strOperation);
		});

		m_objFormRenderer = new formRenderer(api, m_strFormID,
		{
			layoutSections: arrSections,
			readonly:       false,
			target:         strTargetClass,
			onChange: function(blnDirty_a)
			{
				m_blnDirty = blnDirty_a;
			},
			onOperation: function(strOperation_a)
			{
				onToolbarOperation(strOperation_a);
			}
		});

		if (!m_blnIsNew)
		{
			fetchRecord(function(objResponse_a)
			{
				if (objResponse_a.error.length === 0 && objResponse_a.data)
				{
					populateRecord(objResponse_a.data);
				}
			});
		}
	}

	function onToolbarOperation(strOperation_a)
	{
		if (strOperation_a === 'CLOSE')
		{
			doClose();
		}
		else if (strOperation_a === 'SAVE')
		{
			doSave();
		}
	}

	function doClose()
	{
		api.closeForm(m_strFormID);
	}

	function populateRecord(objRecord_a)
	{
		var arrSections = objRecord_a.sections || [];
		var objFormData = {};

		for (var intS = 0; intS < arrSections.length; intS++)
		{
			var objSection = arrSections[intS];

			if (objSection.containers)
			{
				for (var intC = 0; intC < objSection.containers.length; intC++)
				{
					populateContainer(objSection.containers[intC], objFormData);
				}
			}
		}

		m_objFormRenderer.setData(objFormData);
	}

	function populateContainer(objContainer_a, objFormData_a)
	{
		var arrChildren      = objContainer_a.children || [];
		var strContainerName = objContainer_a.name     || '';

		for (var intI = 0; intI < arrChildren.length; intI++)
		{
			var objChild = arrChildren[intI];

			if (objChild.children)
			{
				populateContainer(objChild, objFormData_a);
			}
			else
			{
				var strFieldName = objChild.name || '';
				var strType      = objChild.type || '';
				var strKey       = strContainerName.toUpperCase() + '__' + strFieldName.toUpperCase();

				if (strType !== 'toolbarbutton' && strType !== 'button' && strType !== 'heading' && strType !== 'spacer')
				{
					if (objChild.hasOwnProperty('value'))
					{
						objFormData_a[strKey] = objChild.value;
					}
				}
			}
		}
	}

	function collectRecord()
	{
		var objFormData  = m_objFormRenderer.getData();

		// Deep clone the full form config structure
		var objRecord = JSON.parse(JSON.stringify(m_objConfig));

		for (var intS = 0; intS < objRecord.sections.length; intS++)
		{
			var objSection = objRecord.sections[intS];

			if (objSection.containers)
			{
				for (var intC = 0; intC < objSection.containers.length; intC++)
				{
					embedValuesInContainer(objSection.containers[intC], objFormData);
				}
			}
		}

		return objRecord;
	}

	function embedValuesInContainer(objContainer_a, objFormData_a)
	{
		var arrChildren      = objContainer_a.children || [];
		var strContainerName = objContainer_a.name     || '';

		for (var intI = 0; intI < arrChildren.length; intI++)
		{
			var objChild = arrChildren[intI];

			if (objChild.children)
			{
				embedValuesInContainer(objChild, objFormData_a);
			}
			else
			{
				var strFieldName = objChild.name || '';
				var strType      = objChild.type || '';
				var strKey       = strContainerName.toUpperCase() + '__' + strFieldName.toUpperCase();

				if (strType !== 'toolbarbutton' && strType !== 'button' && strType !== 'heading' && strType !== 'spacer' && strType !== 'instructionaltext')
				{
					if (objFormData_a.hasOwnProperty(strKey))
					{
						var varValue = objFormData_a[strKey];

						if (strType === 'checkbox' || strType === 'yesno')
						{
							varValue = (varValue === true || varValue === 'yes' || varValue === 'true') ? 'yes' : 'no';
						}

						objChild.value = varValue;
					}
				}
			}
		}
	}

	function doSave()
	{
		var arrErrors = m_objFormRenderer.validate();

		if (arrErrors.length > 0)
		{
			alert('Please fix the following:\n\n' + arrErrors.join('\n'));
		}
		else
		{
			var objRecord   = collectRecord();
			var objFormData = m_objFormRenderer.getData();
			var strCode     = '';
			var blnFound    = false;

			for (var strKey in objFormData)
			{
				if (blnFound === false && objFormData.hasOwnProperty(strKey) && strKey.toUpperCase().indexOf('__CODE') !== -1)
				{
					strCode  = (objFormData[strKey] || '').toLowerCase().replace(/[^a-z0-9_\-]/g, '');
					blnFound = true;
				}
			}

			if (strCode.length === 0)
			{
				alert('Code is required.');
			}
			else
			{
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
	}

	// ============================================================
	// FORM EVENTS
	// ============================================================

	this.Form_allowMultipleInstances = function()
	{
		return true;
	};

	this.Form_canClose = function()
	{
		var blnCanClose = true;

		if (m_blnDirty)
		{
			blnCanClose = confirm('Data changes are unsaved, are you sure you want to close the form and discard changes?');
		}

		return blnCanClose;
	};

	this.Form_isDirty = function()
	{
		return m_blnDirty;
	};

	this.Form_onBeforeClose = function()
	{
	};

	this.Form_onBroadcast = function(strQueue_a, strMessage_a, objMessageData_a)
	{
	};

	this.Form_onClick = function()
	{
	};

	this.Form_onDblClick = function(objThis_a, objElement_a, objEvent_a)
	{
	};

	this.Form_onFocus = function(objParameters_a)
	{
	};

	this.Form_onLoad = function()
	{
		var intScreenWidth  = api.element(window).width();
		var intScreenHeight = api.element(window).height();

		var intFormWidth  = Math.min(620, Math.floor(intScreenWidth  * 0.5));
		var intFormHeight = Math.min(640, Math.floor(intScreenHeight * 0.8));
		var intFormLeft   = Math.floor((intScreenWidth  - intFormWidth)  / 2);
		var intFormTop    = Math.floor((intScreenHeight - intFormHeight) / 2);

		api.element('#' + m_strFormID).css(
		{
			'width':  intFormWidth  + 'px',
			'height': intFormHeight + 'px',
			'left':   intFormLeft   + 'px',
			'top':    intFormTop    + 'px'
		});

		api.setFormTitle(m_strFormID, m_blnIsNew ? 'New ' + m_strEntity : 'Edit ' + m_strEntity + ': ' + m_strCode);

		fetchConfig(function()
		{
			if (m_objConfig.title)
			{
				var strTitle = m_blnIsNew ? 'New ' + m_objConfig.title : 'Edit ' + m_objConfig.title + ': ' + m_strCode;
				api.setFormTitle(m_strFormID, strTitle);
			}
			renderForm();
		});
	};

	this.Form_onResize = function(intWidth_a, intHeight_a)
	{
	};

	this.FormTitle_onClick = function()
	{
	};
}