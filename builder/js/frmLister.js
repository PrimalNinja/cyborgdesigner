// js/frmLister.js
// Generic metadata-driven lister form
// (c) 2025 Cyborg Unicorn Pty Ltd.

function frmLister(strFormID_a, objOS_a, objParameters_a)
{
	var m_objThis     = this;
	var m_strFormID   = strFormID_a;
	var api           = objOS_a;
	var m_objParameters = objParameters_a || {};

	var m_strType   = m_objParameters.type   || '';
	var m_strEntity = m_objParameters.entity || '';

	var m_objLister  = null;
	var m_objConfig  = null;
	var m_arrData    = [];

	// ============================================================
	// PRIVATE
	// ============================================================

	function getTargetClass()
	{
		return 'ge-frmLister-' + m_strFormID.replace(/[^a-zA-Z0-9]/g, '');
	}

	function buildServerResponse(arrItems_a, intOffset_a, intLimit_a, strSearch_a, arrOrder_a)
	{
		var arrFields     = m_objConfig.fields     || [];
		var arrOperations = m_objConfig.operations || [];
		var arrRows       = [];

		for (var intI = 0; intI < arrItems_a.length; intI++)
		{
			var objItem = arrItems_a[intI];
			var arrRow  = [];

			// first column is always the ID (code)
			arrRow.push(getFieldValueByContainerNameDotFieldName(objItem, m_objConfig.rowid || '') || '');

			for (var intJ = 0; intJ < arrFields.length; intJ++)
			{
				var strFieldCode = arrFields[intJ].code.toLowerCase();
				var varValue     = getFieldValueByContainerNameDotFieldName(objItem, strFieldCode);

				if (varValue === undefined || varValue === null)
				{
					varValue = '';
				}

				arrRow.push(varValue);
			}

			arrRows.push(arrRow);
		}

		// build field definitions for listRenderer - ID hidden first, then config fields
		var arrRendererFields = [];
		arrRendererFields.push({ code: 'ID', caption: 'ID', type: 'STRING', visible: false, sortable: false });

		for (var intK = 0; intK < arrFields.length; intK++)
		{
			arrRendererFields.push(arrFields[intK]);
		}

		var arrOrder_local = arrOrder_a || [];

		if (arrOrder_local.length > 0)
		{
			arrRows.sort(function(arrA_a, arrB_a)
			{
				var intResult = 0;

				for (var intO = 0; intO < arrOrder_local.length; intO++)
				{
					if (intResult === 0)
					{
						var strFieldName = arrOrder_local[intO].fieldname;
						var blnAscending = arrOrder_local[intO].ascending;
						var intColIndex  = -1;

						for (var intF = 0; intF < arrRendererFields.length; intF++)
						{
							if (arrRendererFields[intF].code === strFieldName)
							{
								intColIndex = intF;
							}
						}

						if (intColIndex >= 0)
						{
							var varA   = arrA_a[intColIndex];
							var varB   = arrB_a[intColIndex];
							var numA   = parseFloat(varA);
							var numB   = parseFloat(varB);
							var intCmp = 0;

							if (!isNaN(numA) && !isNaN(numB))
							{
								intCmp = numA - numB;
							}
							else
							{
								var strA = String(varA || '').toLowerCase();
								var strB = String(varB || '').toLowerCase();
								intCmp = strA < strB ? -1 : strA > strB ? 1 : 0;
							}

							if (intCmp !== 0)
							{
								intResult = blnAscending ? intCmp : -intCmp;
							}
						}
					}
				}

				return intResult;
			});
		}

		return {
			control:    { offset: 0, limit: 9999, more: false, total: arrRows.length },
			operations: arrOperations,
			fields:     arrRendererFields,
			data:       arrRows
		};
	}

	function fetchData(cb_a)
	{
		api.listFiles(m_strEntity, function(objResponse_a)
		{
			if (objResponse_a.error && objResponse_a.error.length > 0)
			{
				m_arrData = [];
			}
			else
			{
				m_arrData = objResponse_a.data || [];
			}

			if (api.isFunction(cb_a))
			{
				cb_a();
			}
		});
	}

	function renderLister()
	{
		var strTargetClass = getTargetClass();
		var objBody        = api.element('#' + m_strFormID, '.ge-formbody');

		var strHTML = '<div style="width:100%; height:100%; display:flex; flex-direction:column;">';
		strHTML    += '<div class="' + strTargetClass + '" style="flex:1; min-height:0;"></div>';
		strHTML    += '</div>';

		objBody.html(strHTML);

		fetchData(function()
		{
			var objInitialData = buildServerResponse(m_arrData, 0, 9999, '', []);
console.log(JSON.stringify(objInitialData));
			m_objLister = new listRenderer(api, m_strFormID,
			{
				type:        'LIST',
				flow:        'PAGED',
				target:      strTargetClass,
				allowsearch: true,
				initialData: objInitialData,
				cbLoadData: function(objRequest_a, cb_a)
				{
					var intOffset  = 0;
					var intLimit   = 9999;
					var strSearch  = '';
					var arrOrder   = [];
					var arrParams  = objRequest_a.parameters || [];

					for (var intP = 0; intP < arrParams.length; intP++)
					{
						var objParam = arrParams[intP];

						if (objParam.name === 'offset') { intOffset = parseInt(objParam.value, 10) || 0; }
						if (objParam.name === 'limit')  { intLimit  = parseInt(objParam.value, 10) || 9999; }
						if (objParam.name === 'search') { strSearch = objParam.value || ''; }
						if (objParam.name === 'order')
						{
							try { arrOrder = JSON.parse(objParam.value) || []; }
							catch (objE) { arrOrder = []; }
						}
					}

					fetchData(function()
					{
						cb_a(buildServerResponse(m_arrData, intOffset, intLimit, strSearch, arrOrder));
					});
				},
				cbOnOperation: function(strOperation_a, arrRow_a, strID_a)
				{
					console.log('frmLister cbOnOperation', strOperation_a, strID_a);
					onOperation(strOperation_a, strID_a);
				},
				cbOnDblClick: function(arrRow_a, strID_a)
				{
					console.log('frmLister cbOnDblClick', strID_a);
					if (strID_a)
					{
						onOperation('EDIT', strID_a);
					}
				}
			});
		});
	}

	function onOperation(strOperation_a, strCode_a)
	{
		var strCode = strCode_a || '';
		var strMode = strOperation_a.toLowerCase();   // add | edit | view

		if (strOperation_a === 'ADD')
		{
			strCode = '';
		}

		console.log('frmLister onOperation mode=' + strMode + ' code=' + strCode);

		api.openForm('frmEntity',
		{
			entity: m_strEntity,
			code:   strCode,
			mode:   strMode,
			onSave: function()
			{
				console.log('frmLister onSave refresh');
				if (m_objLister)
				{
					m_objLister.refresh();
				}
			}
		},
		null);
	}

	function fetchConfig(cb_a)
	{
		api.loadFile(m_strType, m_strEntity, function(objResponse_a)
		{
			if (objResponse_a.error && objResponse_a.error.length > 0)
			{
				api.print('frmLister: config not found for ' + m_strType + '/' + m_strEntity);
				m_objConfig = { fields: [], operations: [] };
			}
			else
			{
				m_objConfig = objResponse_a.data || { fields: [], operations: [] };
			}

			if (api.isFunction(cb_a))
			{
				cb_a();
			}
		});
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
		return true;
	};

	this.Form_isDirty = function()
	{
		return false;
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
		if (m_objLister)
		{
			m_objLister.refresh();
		}
	};

	this.Form_onLoad = function()
	{
		var intScreenWidth  = api.element(window).width();
		var intScreenHeight = api.element(window).height();

		var intFormWidth  = Math.floor(intScreenWidth  * 0.7);
		var intFormHeight = Math.floor(intScreenHeight * 0.7);
		var intFormLeft   = Math.floor((intScreenWidth  - intFormWidth)  / 2);
		var intFormTop    = Math.floor((intScreenHeight - intFormHeight) / 2);

		api.element('#' + m_strFormID).css(
		{
			'width':  intFormWidth  + 'px',
			'height': intFormHeight + 'px',
			'left':   intFormLeft   + 'px',
			'top':    intFormTop    + 'px'
		});

		api.setFormTitle(m_strFormID, m_objConfig ? (m_objConfig.title || m_strEntity) : m_strEntity);

		fetchConfig(function()
		{
			api.setFormTitle(m_strFormID, m_objConfig.title || m_strEntity);
			renderLister();
		});
	};

	this.Form_onResize = function(intWidth_a, intHeight_a)
	{
	};

	this.FormTitle_onClick = function()
	{
	};
}