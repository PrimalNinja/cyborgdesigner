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

	// ============================================================
	// PRIVATE
	// ============================================================

	function registerForm(strFormName_a, strFormGUID_a, objFormInstance_a)
	{
		m_arrRegisteredForms.push(
		{
			formName:     strFormName_a,
			formGUID:     strFormGUID_a,
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
				break;
			}
		}
		return blnResult;
	}

	function getRegisteredForm(strFormName_a)
	{
		var objResult = null;
		for (var intI = 0; intI < m_arrRegisteredForms.length; intI++)
		{
			if (m_arrRegisteredForms[intI].formName === strFormName_a)
			{
				objResult = m_arrRegisteredForms[intI];
				break;
			}
		}
		return objResult;
	}

	function getRegisteredFormByGUID(strFormGUID_a)
	{
		var objResult = null;
		for (var intI = 0; intI < m_arrRegisteredForms.length; intI++)
		{
			if (m_arrRegisteredForms[intI].formGUID === strFormGUID_a)
			{
				objResult = m_arrRegisteredForms[intI];
				break;
			}
		}
		return objResult;
	}

	function createFormDOM(strFormGUID_a)
	{
		var objContainer = document.getElementById('ge-formcontainer');
		if (!objContainer)
		{
			return;
		}

		var objForm = document.createElement('div');
		objForm.id = strFormGUID_a;
		objForm.className = 'gs-form';
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

		makeDraggable(objForm, objTitleBar);

		objCloseBtn.onclick = function()
		{
			m_objThis.closeForm(strFormGUID_a);
		};
	}

	function makeDraggable(objForm_a, objHandle_a)
	{
		var intDragX    = 0;
		var intDragY    = 0;
		var intStartLeft = 0;
		var intStartTop  = 0;

		objHandle_a.onmousedown = function(objEvent_a)
		{
			objEvent_a.preventDefault();
			intDragX     = objEvent_a.clientX;
			intDragY     = objEvent_a.clientY;
			intStartLeft = parseInt(objForm_a.style.left, 10) || 0;
			intStartTop  = parseInt(objForm_a.style.top, 10)  || 0;

			m_intZOrder++;
			objForm_a.style.zIndex = m_intZOrder;

			document.onmousemove = function(objMoveEvent_a)
			{
				var intDeltaX = objMoveEvent_a.clientX - intDragX;
				var intDeltaY = objMoveEvent_a.clientY - intDragY;
				objForm_a.style.left = (intStartLeft + intDeltaX) + 'px';
				objForm_a.style.top  = (intStartTop  + intDeltaY) + 'px';
			};

			document.onmouseup = function()
			{
				document.onmousemove = null;
				document.onmouseup   = null;
			};
		};
	}

	// ============================================================
	// PUBLIC
	// ============================================================

	this.element = function(strScope_a, strElement_a)
	{
		if (strElement_a === undefined)
		{
			return $(strScope_a);
		}
		return $(strElement_a, strScope_a);
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
			return;
		}

		if (m_objThis.isFunction(cb_a))
		{
			m_arrCB.push(cb_a);
		}

		m_intZOrder++;
		var strFormGUID = 'frm-' + getGUID('');

		createFormDOM(strFormGUID);

		var objFormInstance = new window[strFormName_a](strFormGUID, m_objThis, objParameters_a);
		registerForm(strFormName_a, strFormGUID, objFormInstance);
		m_arrFormStack.push(strFormGUID);

		if (m_objThis.isFunction(objFormInstance.Form_onLoad))
		{
			objFormInstance.Form_onLoad();
		}
	};

	this.closeForm = function(strFormGUID_a)
	{
		var strGUID = strFormGUID_a;

		var objReg = getRegisteredFormByGUID(strGUID);

		if (objReg && m_objThis.isFunction(objReg.formInstance.Form_canClose))
		{
			if (!objReg.formInstance.Form_canClose())
			{
				return;
			}
		}

		if (objReg && m_objThis.isFunction(objReg.formInstance.Form_onBeforeClose))
		{
			objReg.formInstance.Form_onBeforeClose();
		}

		unregisterForm(strGUID);

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
	};

	this.setFormTitle = function(strFormGUID_a, strTitle_a)
	{
		$('#' + strFormGUID_a + ' .ge-form-title').text(strTitle_a);
	};

	this.loadFile = function(strType_a, strCode_a, cb_a)
	{
		$.ajax(
		{
			url:      'ws/server.php',
			method:   'POST',
			data:     { action: 'load', type: strType_a, code: strCode_a },
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
					cb_a({ error: 'Request failed: ' + objXHR_a.status, data: null });
				}
			}
		});
	};

	this.saveFile = function(strType_a, strCode_a, objData_a, cb_a)
	{
		$.ajax(
		{
			url:      'ws/server.php',
			method:   'POST',
			data:     { action: 'save', type: strType_a, code: strCode_a, data: JSON.stringify(objData_a) },
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
					cb_a({ error: 'Request failed: ' + objXHR_a.status });
				}
			}
		});
	};

	this.listFiles = function(strType_a, cb_a)
	{
		$.ajax(
		{
			url:      'ws/server.php',
			method:   'POST',
			data:     { action: 'list', type: strType_a },
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
					cb_a({ error: 'Request failed: ' + objXHR_a.status, data: [] });
				}
			}
		});
	};
}