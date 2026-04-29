// js/frmEntity.js
// Generic metadata-driven entity form
// (c) 2025 Cyborg Unicorn Pty Ltd.

function frmEntity(strFormID_a, objOS_a, objParameters_a)
{
	var m_objThis       = this;
	var m_strFormID     = strFormID_a;
	var api             = objOS_a;
	var m_objParameters = objParameters_a || {};

	var m_strEntity = m_objParameters.entity || '';
	var m_strCode   = m_objParameters.code   || '';
	var m_strMode   = m_objParameters.mode   || 'edit';   // add | edit | view
	var m_cbOnSave  = m_objParameters.onSave || null;

	var m_objFormLayout   = null;   // loaded from form/<entity>.json
	var m_objFormRenderer = null;
	var m_blnDirty        = false;

	// ============================================================
	// PRIVATE
	// ============================================================

	function getTargetClass()
	{
		return 'ge-frmEntity-' + m_strFormID.replace(/[^a-zA-Z0-9]/g, '');
	}

	function fetchLayout(cb_a)
	{
		console.log('frmEntity fetchLayout loading form/' + m_strEntity);
		api.loadFile('form', m_strEntity, function(objResponse_a)
		{
			console.log('frmEntity fetchLayout response error=' + (objResponse_a.error || '') + ' hasData=' + !!objResponse_a.data);
			if (objResponse_a.error && objResponse_a.error.length > 0)
			{
				api.print('frmEntity: layout not found for form/' + m_strEntity);
				m_objFormLayout = { title: m_strEntity, sections: [] };
			}
			else
			{
				m_objFormLayout = objResponse_a.data || { title: m_strEntity, sections: [] };
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
		var blnReadOnly    = (m_strMode === 'view');
		var arrSections    = JSON.parse(JSON.stringify(m_objFormLayout.sections || []));

		var strHTML = '<div class="gs-form-toolbar">';
		strHTML    += '<button type="button" class="gs-toolbar-btn" data-operation="CLOSE">Close</button>';

		if (!blnReadOnly)
		{
			strHTML += '<button type="button" class="gs-toolbar-btn" data-operation="SAVE">Save</button>';
		}

		strHTML += '</div>';
		strHTML += '<div style="width:100%; height:100%; overflow:auto; padding:10px;">';
		strHTML += '<div class="' + strTargetClass + '"></div>';
		strHTML += '</div>';

		objBody.html(strHTML);

		api.element('#' + m_strFormID, '.gs-toolbar-btn').on('click', function()
		{
			var strOperation = api.element(this).attr('data-operation');
			onToolbarOperation(strOperation);
		});

		m_objFormRenderer = new formRenderer(api, m_strFormID,
		{
			layoutSections: arrSections,
			readonly:       blnReadOnly,
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

	function doSave()
	{
		var arrErrors = m_objFormRenderer.validate();

		if (arrErrors.length > 0)
		{
			alert('Please fix the following:\n\n' + arrErrors.join('\n'));
		}
		else
		{
			var arrSections    = m_objFormRenderer.getFormJSON();
			var strCode        = (getFieldValueByContainerNameAndFieldName(arrSections, 'FORMDATA', 'CODE') || '').toLowerCase().replace(/[^a-z0-9_\-]/g, '');
			var intDataVersion = parseInt(getFieldValueByContainerNameAndFieldName(arrSections, 'DATAHEADER', 'DATAVERSION') || '1', 10);

			setFieldValueByContainerNameAndFieldName(arrSections, 'DATAHEADER', 'DATAVERSION', String(intDataVersion + 1));

			if (strCode.length === 0)
			{
				alert('Code is required.');
			}
			else
			{
				var objSaveData = { code: strCode, title: m_objFormLayout.title || m_strEntity, sections: arrSections };

				api.saveFile(m_strEntity, strCode, objSaveData, function(objResponse_a)
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
							m_cbOnSave(objSaveData);
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

		var strModeLabel = m_strMode === 'add' ? 'New' : m_strMode === 'view' ? 'View' : 'Edit';
		api.setFormTitle(m_strFormID, strModeLabel + ' ' + m_strEntity);

		console.log('frmEntity Form_onLoad mode=' + m_strMode + ' entity=' + m_strEntity + ' code=' + m_strCode);

		if (m_strMode === 'view')
		{
			// View: load entity record directly, render readonly - no layout needed
			fetchRecord(function(objResponse_a)
			{
				var objRecord = {};

				if (objResponse_a.error && objResponse_a.error.length > 0)
				{
					api.print('frmEntity: record not found for ' + m_strEntity + '/' + m_strCode);
					m_objFormLayout = { title: m_strEntity, sections: [] };
				}
				else
				{
					objRecord       = objResponse_a.data || {};
					m_objFormLayout = objRecord;
					api.setFormTitle(m_strFormID, 'View ' + (m_objFormLayout.title || m_strEntity) + ': ' + m_strCode);
				}

				renderForm();
			});
		}
		else if (m_strMode === 'add')
		{
			// Add: load layout, render blank form
			fetchLayout(function()
			{
				api.setFormTitle(m_strFormID, 'New ' + (m_objFormLayout.title || m_strEntity));
				renderForm();
			});
		}
		else
		{
			// Edit: load layout then record, transfer data if version is newer
			fetchLayout(function()
			{
				api.setFormTitle(m_strFormID, 'Edit ' + (m_objFormLayout.title || m_strEntity) + ': ' + m_strCode);

				fetchRecord(function(objResponse_a)
				{
					var arrSections = JSON.parse(JSON.stringify(m_objFormLayout.sections || []));

					if (objResponse_a.error.length === 0 && objResponse_a.data)
					{
						var arrOldSections = objResponse_a.data.sections || [];

						if (isLayoutVersionNewer(arrSections, arrOldSections))
						{
							arrSections = transferFieldValues(arrSections, arrOldSections);
						}
						else
						{
							arrSections = arrOldSections;
						}
					}

					m_objFormLayout.sections = arrSections;
					renderForm();
				});
			});
		}
	};

	this.Form_onResize = function(intWidth_a, intHeight_a)
	{
	};

	this.FormTitle_onClick = function()
	{
	};
}