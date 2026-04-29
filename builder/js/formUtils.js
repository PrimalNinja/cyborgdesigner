// formUtils.js
// Shared utilities for form data extraction, transfer and version checking
// (c) 2025 Cyborg Unicorn Pty Ltd.

// ============================================================
// GET / SET FIELD VALUE BY CONTAINER NAME AND FIELD NAME
// ============================================================

function getFieldValueByContainerNameAndFieldName(arrSections_a, strContainerName_a, strFieldName_a)
{
	var strContainerUC = strContainerName_a.toUpperCase();
	var strFieldUC     = strFieldName_a.toUpperCase();
	var varResult      = '';

	for (var intS = 0; intS < arrSections_a.length; intS++)
	{
		var arrContainers = arrSections_a[intS].containers || [];

		for (var intC = 0; intC < arrContainers.length; intC++)
		{
			if (varResult === '')
			{
				if ((arrContainers[intC].name || '').toUpperCase() === strContainerUC)
				{
					varResult = getFieldValueFromContainerByFieldName(arrContainers[intC], strFieldUC);
				}
			}
		}
	}

	return varResult;
}

function setFieldValueByContainerNameAndFieldName(arrSections_a, strContainerName_a, strFieldName_a, strValue_a)
{
	var strContainerUC = strContainerName_a.toUpperCase();
	var strFieldUC     = strFieldName_a.toUpperCase();

	for (var intS = 0; intS < arrSections_a.length; intS++)
	{
		var arrContainers = arrSections_a[intS].containers || [];

		for (var intC = 0; intC < arrContainers.length; intC++)
		{
			if ((arrContainers[intC].name || '').toUpperCase() === strContainerUC)
			{
				setFieldValueInContainerByFieldName(arrContainers[intC], strFieldUC, strValue_a);
			}
		}
	}
}

function getFieldValueFromContainerByFieldName(objContainer_a, strFieldUC_a)
{
	var arrChildren = objContainer_a.children || [];
	var varResult   = '';

	for (var intI = 0; intI < arrChildren.length; intI++)
	{
		if (varResult === '')
		{
			var objChild = arrChildren[intI];

			if (objChild.children)
			{
				varResult = getFieldValueFromContainerByFieldName(objChild, strFieldUC_a);
			}
			else if ((objChild.name || '').toUpperCase() === strFieldUC_a)
			{
				varResult = objChild.hasOwnProperty('value') ? objChild.value : '';
			}
		}
	}

	return varResult;
}

function setFieldValueInContainerByFieldName(objContainer_a, strFieldUC_a, strValue_a)
{
	var arrChildren = objContainer_a.children || [];

	for (var intI = 0; intI < arrChildren.length; intI++)
	{
		var objChild = arrChildren[intI];

		if (objChild.children)
		{
			setFieldValueInContainerByFieldName(objChild, strFieldUC_a, strValue_a);
		}
		else if ((objChild.name || '').toUpperCase() === strFieldUC_a)
		{
			objChild.value = strValue_a;
		}
	}
}

// ============================================================
// VERSION CHECK
// ============================================================

function getFormVersion(arrSections_a)
{
	var strVersion = getFieldValueByContainerNameAndFieldName(arrSections_a, 'FORMHEADER', 'FORMVERSION');
	return parseFloat(strVersion) || 0;
}

function isLayoutVersionNewer(arrNewSections_a, arrOldSections_a)
{
	return getFormVersion(arrNewSections_a) > getFormVersion(arrOldSections_a);
}

// ============================================================
// TRANSFER FIELD VALUES FROM OLD SECTIONS TO NEW SECTIONS
// ============================================================

function transferFieldValues(arrNewSections_a, arrOldSections_a)
{
	var objOldMap = buildContainerFieldValueMap(arrOldSections_a);

	for (var intS = 0; intS < arrNewSections_a.length; intS++)
	{
		var arrContainers = arrNewSections_a[intS].containers || [];

		for (var intC = 0; intC < arrContainers.length; intC++)
		{
			transferFieldValuesFromContainer(arrContainers[intC], objOldMap);
		}
	}

	return arrNewSections_a;
}

function buildContainerFieldValueMap(arrSections_a)
{
	var objMap = {};

	for (var intS = 0; intS < arrSections_a.length; intS++)
	{
		var arrContainers = arrSections_a[intS].containers || [];

		for (var intC = 0; intC < arrContainers.length; intC++)
		{
			buildContainerFieldValueMapFromContainer(arrContainers[intC], objMap);
		}
	}

	return objMap;
}

function buildContainerFieldValueMapFromContainer(objContainer_a, objMap_a)
{
	var arrChildren    = objContainer_a.children || [];
	var strContainerUC = (objContainer_a.name || '').toUpperCase();

	for (var intI = 0; intI < arrChildren.length; intI++)
	{
		var objChild = arrChildren[intI];

		if (objChild.children)
		{
			buildContainerFieldValueMapFromContainer(objChild, objMap_a);
		}
		else if (objChild.hasOwnProperty('value'))
		{
			var strKey = strContainerUC + '__' + (objChild.name || '').toUpperCase();
			objMap_a[strKey] = objChild.value;
		}
	}
}

function transferFieldValuesFromContainer(objContainer_a, objOldMap_a)
{
	var arrChildren    = objContainer_a.children || [];
	var strContainerUC = (objContainer_a.name || '').toUpperCase();

	for (var intI = 0; intI < arrChildren.length; intI++)
	{
		var objChild = arrChildren[intI];

		if (objChild.children)
		{
			transferFieldValuesFromContainer(objChild, objOldMap_a);
		}
		else
		{
			var strFieldUC = (objChild.name || '').toUpperCase();
			var strKey     = strContainerUC + '__' + strFieldUC;

			if (objOldMap_a.hasOwnProperty(strKey))
			{
				objChild.value = objOldMap_a[strKey];
			}
		}
	}
}

// ============================================================
// LISTER FIELD EXTRACTION
// ============================================================

// strFieldCode_a is 'CONTAINERNAME.FIELDNAME'
function getFieldValueByContainerNameDotFieldName(objItem_a, strFieldCode_a)
{
	var arrParts     = strFieldCode_a.split('.');
	var strContainer = arrParts.length > 1 ? arrParts[0] : '';
	var strField     = arrParts.length > 1 ? arrParts[1] : arrParts[0];

	return getFieldValueByContainerNameAndFieldName(objItem_a.sections || [], strContainer, strField);
}