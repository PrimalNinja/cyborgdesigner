// js/os.js
// CyborgDesktop OS layer
// (c) 2025 Cyborg Unicorn Pty Ltd.

function os()
{
	var m_objThis = this;
	var m_arrCB = [];
	var m_arrFormStack = [];
	var m_arrRegisteredForms = [];
	var m_intZOrder = 100;
	var m_strFocusedGUID = '';

	// ============================================================
	// PRIVATE
	// ============================================================

	function registerForm(strFormName_a, strFormGUID_a, objFormInstance_a)
	{
		m_arrRegisteredForms.push(
		{
			formName: strFormName_a,
			formGUID: strFormGUID_a,
			formInstance: objFormInstance_a
		});
	}

	function unregisterForm(strFormGUID_a)
	{
		var arrUpdated = [];
		for (var intI = 0; intI < m_arrRegisteredForms.length; intI++)
		{
			if (m_arrRegisteredForms[intI].formGUID !== strFormGUID_a)
			{
				arrUpdated.push(m_arrRegisteredForms[intI]);
			}
		}
		m_arrRegisteredForms = arrUpdated;
	}

	function isFormRegistered(strFormName_a)
	{
		var blnResult = false;
		for (var intI = 0; intI < m_arrRegisteredForms.length; intI++)
		{
			if (m_arrRegisteredForms[intI].formName === strFormName_a)
			{
				blnResult = true;
			}
		}
		return blnResult;
	}

	function getRegisteredForm(strFormName_a)
	{
		var objResult = null;
		for (var intI = 0; intI < m_arrRegisteredForms.length; intI++)
		{
			if (objResult === null && m_arrRegisteredForms[intI].formName === strFormName_a)
			{
				objResult = m_arrRegisteredForms[intI];
			}
		}
		return objResult;
	}

	function getRegisteredFormByGUID(strFormGUID_a)
	{
		var objResult = null;
		for (var intI = 0; intI < m_arrRegisteredForms.length; intI++)
		{
			if (objResult === null && m_arrRegisteredForms[intI].formGUID === strFormGUID_a)
			{
				objResult = m_arrRegisteredForms[intI];
			}
		}
		return objResult;
	}

	function createFormDOM(strFormGUID_a)
	{
		var objContainer = document.getElementById('ge-formcontainer');

		if (objContainer)
		{
			var objForm = document.createElement('div');
			objForm.id = strFormGUID_a;
			objForm.className = 'gs-form gs-resizable';
			objForm.style.zIndex = m_intZOrder;

			var objTitleBar = document.createElement('div');
			objTitleBar.className = 'gs-form-titlebar ge-form-titlebar';
			objTitleBar.setAttribute('data-formguid', strFormGUID_a);

			var objTitle = document.createElement('span');
			objTitle.className = 'gs-form-title ge-form-title';
			objTitle.textContent = '';

			var objCloseBtn = document.createElement('span');
			objCloseBtn.className = 'gs-form-close ge-form-close';
			objCloseBtn.textContent = '×';
			objCloseBtn.setAttribute('data-formguid', strFormGUID_a);

			objTitleBar.appendChild(objTitle);
			objTitleBar.appendChild(objCloseBtn);

			var objBody = document.createElement('div');
			objBody.className = 'gs-form-body ge-formbody';

			objForm.appendChild(objTitleBar);
			objForm.appendChild(objBody);
			objContainer.appendChild(objForm);

			makeDraggable(objForm, objTitleBar, strFormGUID_a);
			makeResizable(objForm);

			objTitleBar.style.cursor = 'default';

			m_objThis.element(objForm).on('mousedown', function()
			{
				m_strFocusedGUID = strFormGUID_a;
			});

			m_objThis.element(objForm).on('dblclick', function()
			{
				m_intZOrder++;
				objForm.style.zIndex = m_intZOrder;
				m_strFocusedGUID = strFormGUID_a;
			});

			m_objThis.element(objCloseBtn).on('click', function()
			{
				m_objThis.closeForm(strFormGUID_a);
			});
		}
	}

	function makeResizable(objForm_a)
	{
		if (objForm_a.className.indexOf('gs-resizable') >= 0)
		{
			var objHandle = document.createElement('div');
			objHandle.className = 'gs-form-resizehandle';
			objForm_a.appendChild(objHandle);

			var intStartX = 0;
			var intStartY = 0;
			var intStartW = 0;
			var intStartH = 0;

			m_objThis.element(objHandle).on('mousedown', function(objEvent_a)
			{
				objEvent_a.preventDefault();
				objEvent_a.stopPropagation();
				intStartX = objEvent_a.clientX;
				intStartY = objEvent_a.clientY;
				intStartW = parseInt(objForm_a.offsetWidth, 10);
				intStartH = parseInt(objForm_a.offsetHeight, 10);

				m_objThis.element('body').css('cursor', 'nwse-resize');

				m_objThis.element(document).on('mousemove.resize', function(objMoveEvent_a)
				{
					var intNewW = intStartW + (objMoveEvent_a.clientX - intStartX);
					var intNewH = intStartH + (objMoveEvent_a.clientY - intStartY);

					if (intNewW > 300)
					{
						m_objThis.element(objForm_a).css('width', intNewW + 'px');
					}

					if (intNewH > 200)
					{
						m_objThis.element(objForm_a).css('height', intNewH + 'px');
					}
				});

				m_objThis.element(document).on('mouseup.resize', function()
				{
					m_objThis.element('body').css('cursor', '');
					m_objThis.element(document).off('mousemove.resize');
					m_objThis.element(document).off('mouseup.resize');
				});
			});
		}
	}

	function makeDraggable(objForm_a, objHandle_a, strFormGUID_a)
	{
		var intDragX = 0;
		var intDragY = 0;
		var intStartLeft = 0;
		var intStartTop = 0;

		m_objThis.element(objHandle_a).on('mousedown', function(objEvent_a)
		{
			objEvent_a.preventDefault();
			intDragX = objEvent_a.clientX;
			intDragY = objEvent_a.clientY;
			intStartLeft = parseInt(objForm_a.style.left, 10) || 0;
			intStartTop = parseInt(objForm_a.style.top, 10) || 0;

			m_objThis.element('body').css('cursor', 'none');

			m_objThis.element(document).on('mousemove.drag', function(objMoveEvent_a)
			{
				var intDeltaX = objMoveEvent_a.clientX - intDragX;
				var intDeltaY = objMoveEvent_a.clientY - intDragY;
				m_objThis.element(objForm_a).css('left', (intStartLeft + intDeltaX) + 'px');
				m_objThis.element(objForm_a).css('top', (intStartTop + intDeltaY) + 'px');
			});

			m_objThis.element(document).on('mouseup.drag', function()
			{
				m_objThis.element('body').css('cursor', '');
				m_objThis.element(document).off('mousemove.drag');
				m_objThis.element(document).off('mouseup.drag');
			});
		});

		m_objThis.element(objHandle_a).on('mouseup', function()
		{
			m_intZOrder++;
			objForm_a.style.zIndex = m_intZOrder;
			m_strFocusedGUID = strFormGUID_a;
		});
	}

	function initialise()
	{
		document.addEventListener('keydown', function(objEvent_a)
		{
			if (objEvent_a.key === 'Escape')
			{
				var strTarget = '';

				if (m_strFocusedGUID.length > 0)
				{
					strTarget = m_strFocusedGUID;
				}
				else if (m_arrFormStack.length > 0)
				{
					strTarget = m_arrFormStack[m_arrFormStack.length - 1];
				}

				if (strTarget.length > 0)
				{
					m_objThis.closeForm(strTarget);
				}
			}
		});
	}

	// ============================================================
	// PUBLIC
	// ============================================================

	this.element = function(strScope_a, strElement_a)
	{
		var objResult = null;

		if (strElement_a === undefined)
		{
			objResult = $(strScope_a);
		}
		else
		{
			objResult = $(strElement_a, strScope_a);
		}

		return objResult;
	};

	this.isFunction = function(fn_a)
	{
		var getType = {};
		return fn_a && getType.toString.call(fn_a) === '[object Function]';
	};

	this.print = function(strMessage_a)
	{
		console.log(strMessage_a);
	};

	this.openForm = function(strFormName_a, objParameters_a, cb_a)
	{
		var blnAllowMultiple = true;

		try
		{
			var objTest = new window[strFormName_a]('', m_objThis, null);
			if (m_objThis.isFunction(objTest.Form_allowMultipleInstances))
			{
				blnAllowMultiple = objTest.Form_allowMultipleInstances();
			}
		}
		catch(e)
		{
			blnAllowMultiple = true;
		}

		if (!blnAllowMultiple && isFormRegistered(strFormName_a))
		{
			var objExisting = getRegisteredForm(strFormName_a);
			if (objExisting && m_objThis.isFunction(objExisting.formInstance.Form_onFocus))
			{
				objExisting.formInstance.Form_onFocus(objParameters_a);
			}
		}
		else
		{
			if (m_objThis.isFunction(cb_a))
			{
				m_arrCB.push(cb_a);
			}

			m_intZOrder++;
			var strFormGUID = 'frm-' + getGUID('');

			createFormDOM(strFormGUID);

			m_strFocusedGUID = strFormGUID;

			var objFormInstance = new window[strFormName_a](strFormGUID, m_objThis, objParameters_a);
			registerForm(strFormName_a, strFormGUID, objFormInstance);
			m_arrFormStack.push(strFormGUID);

			if (m_objThis.isFunction(objFormInstance.Form_onLoad))
			{
				objFormInstance.Form_onLoad();
			}
		}
	};

	this.closeForm = function(strFormGUID_a)
	{
		var strGUID = strFormGUID_a;
		var objReg = getRegisteredFormByGUID(strGUID);
		var blnCanClose = true;

		if (objReg && m_objThis.isFunction(objReg.formInstance.Form_canClose))
		{
			if (!objReg.formInstance.Form_canClose())
			{
				blnCanClose = false;
			}
		}

		if (blnCanClose)
		{
			if (objReg && m_objThis.isFunction(objReg.formInstance.Form_onBeforeClose))
			{
				objReg.formInstance.Form_onBeforeClose();
			}

			unregisterForm(strGUID);

			if (m_strFocusedGUID === strGUID)
			{
				m_strFocusedGUID = '';
			}

			var arrUpdated = [];
			for (var intI = 0; intI < m_arrFormStack.length; intI++)
			{
				if (m_arrFormStack[intI] !== strGUID)
				{
					arrUpdated.push(m_arrFormStack[intI]);
				}
			}
			m_arrFormStack = arrUpdated;

			var objDOM = document.getElementById(strGUID);
			if (objDOM && objDOM.parentNode)
			{
				objDOM.parentNode.removeChild(objDOM);
			}

			if (m_arrCB.length > 0)
			{
				var cb = m_arrCB.pop();
				if (m_objThis.isFunction(cb))
				{
					cb();
				}
			}
		}
	};

	this.setFormTitle = function(strFormGUID_a, strTitle_a)
	{
		$('#' + strFormGUID_a + ' .ge-form-title').text(strTitle_a);
	};

	// ============================================================
	// SERVER
	// ============================================================

	function callServer(objData_a, objErrorResponse_a, cb_a)
	{
		var objAjax =
		{
			url: 'ws/server.php',
			method: 'POST',
			data: objData_a,
			dataType: 'json',
			success: function(objResponse_a)
			{
				if (m_objThis.isFunction(cb_a))
				{
					cb_a(objResponse_a);
				}
			},
			error: function(objXHR_a)
			{
				if (m_objThis.isFunction(cb_a))
				{
					var objResponse = objErrorResponse_a;
					objResponse.error = 'Request failed: ' + objXHR_a.status;
					cb_a(objResponse);
				}
			}
		};

		$.ajax(objAjax);
	}

	this.deleteFile = function(strType_a, strCode_a, cb_a)
	{
		var objData = { action: 'delete', type: strType_a, code: strCode_a };
		var objErrorResponse = { error: '' };
		callServer(objData, objErrorResponse, cb_a);
	};

	this.loadFile = function(strType_a, strCode_a, cb_a)
	{
		var objData = { action: 'load', type: strType_a, code: strCode_a };
		var objErrorResponse = { error: '', data: null };
		callServer(objData, objErrorResponse, cb_a);
	};

	this.saveFile = function(strType_a, strCode_a, objData_a, cb_a)
	{
		var objData = { action: 'save', type: strType_a, code: strCode_a, data: JSON.stringify(objData_a) };
		var objErrorResponse = { error: '' };
		callServer(objData, objErrorResponse, cb_a);
	};

	this.listFiles = function(strType_a, strPrefix_a, cb_a)
	{
		var objData = { action: 'list', type: strType_a, prefix: strPrefix_a || '' };
		var objErrorResponse = { error: '', data: [] };
		callServer(objData, objErrorResponse, cb_a);
	};

	initialise();
}