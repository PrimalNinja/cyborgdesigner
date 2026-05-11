// js/menuRenderer.js
// Dynamic menu renderer
// (c) 2025 Cyborg Unicorn Pty Ltd.

function menuRenderer(objOS_a, strTarget_a, strMenuCode_a)
{
	var m_objThis   = this;
	var api         = objOS_a;
	var m_strTarget = strTarget_a;
	var m_strCode   = strMenuCode_a;

	// ============================================================
	// PRIVATE
	// ============================================================

	function render(arrItems_a)
	{
		var strHTML = '';

		for (var intI = 0; intI < arrItems_a.length; intI++)
		{
			var objItem      = arrItems_a[intI];
			var arrSections  = objItem.sections || [];
			var strCaption   = getFieldValueByContainerNameAndFieldName(arrSections, 'FORMDATA', 'DESCRIPTION');
			var strAction    = getFieldValueByContainerNameAndFieldName(arrSections, 'FORMDATA', 'ACTION');
			var strActData   = getFieldValueByContainerNameAndFieldName(arrSections, 'FORMDATA', 'ACTIONDATA');
			var strIsEnabled = getFieldValueByContainerNameAndFieldName(arrSections, 'FORMDATA', 'ISENABLED');

			if (toBoolean(strIsEnabled))
			{
				strHTML += '<button class="gscd-maintabbutton ge-menuitem"';
				strHTML += ' data-action="'     + strAction  + '"';
				strHTML += ' data-actiondata="' + strActData + '"';
				strHTML += '>' + strCaption + '</button>';
			}
		}

		api.element(m_strTarget).html(strHTML);

		api.element(m_strTarget, '.ge-menuitem').on('click', function()
		{
			api.element(m_strTarget, '.ge-menuitem').removeClass('active');
			api.element(this).addClass('active');

			var strAction     = api.element(this).attr('data-action');
			var strActionData = api.element(this).attr('data-actiondata');
			onMenuItemClick(strAction, strActionData);
		});
	}

	function onMenuItemClick(strAction_a, strActionData_a)
	{
		var objActionData = {};

		try
		{
			var strJSON = strActionData_a || '{}';
			objActionData = (new Function('return (' + strJSON + ')'))();
		}
		catch (e)
		{
			api.print('menuRenderer: failed to parse actiondata: ' + e);
		}

		if (strAction_a.toUpperCase() === 'ENTITYLISTER')
		{
			api.openForm('frmEntityLister', objActionData, null);
		}
		else if (strAction_a.toUpperCase() === 'LAYOUTLISTER')
		{
			api.openForm('frmLayoutLister', objActionData, null);
		}
		else if (strAction_a.toUpperCase() === 'OPENENTITYFORM')
		{
			api.openForm('frmEntity', objActionData, null);
		}
		else
		{
			api.print('menuRenderer: unknown action: ' + strAction_a);
		}
	}

	function initialise()
	{
		api.loadFile('menu', m_strCode, function(objResponse_a)
		{
			if (objResponse_a.error && objResponse_a.error.length > 0)
			{
				api.print('menuRenderer: failed to load menu/' + m_strCode);
				return;
			}

			var objMenu      = objResponse_a.data || {};
			var arrSections  = objMenu.sections   || [];
			var strIsEnabled = getFieldValueByContainerNameAndFieldName(arrSections, 'FORMDATA', 'ISENABLED');

			if (!toBoolean(strIsEnabled))
			{
				api.print('menuRenderer: menu ' + m_strCode + ' is disabled');
				return;
			}

			api.listFiles('menuitem', m_strCode, function(objListResponse_a)
			{
				if (objListResponse_a.error && objListResponse_a.error.length > 0)
				{
					api.print('menuRenderer: failed to list menuitem/' + m_strCode);
					return;
				}

				var arrItems = objListResponse_a.data || [];
				render(arrItems);
			});
		});
	}

	initialise();
}