function element(strScope_a, strElement_a)
{
	var objResult = null;
	var strElement = strElement_a;
	var strScope = strScope_a;

	if (strElement === undefined)
	{
		objResult = $(strScope);
	}
	else
	{
		objResult = $(strElement, strScope);
	}
	
	return objResult;
}

// prefix added because mysql doesn't like certain patterns of GUIDs for field names
// eg: 6e4 gets confused by mysql as a standard form number
function getGUID(strPrefix_a)
{
	var strPrefix = strPrefix_a;
	if (strPrefix == undefined) { strPrefix = ''; }

	return strPrefix + 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c)
	{
		var r = Math.random() * 16 | 0,
		v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	}
	);
}

function processArray(arr_a, cb_a)
{
	if (arr_a !== null)
	{
		var intRowNum = 1;
		var intI = 0;
		var blnAbort = false;
		while ((!blnAbort) && (intI < arr_a.length))
		{
			if (arr_a[intI] !== undefined)
			{
				if ($.isFunction(cb_a))
				{
					blnAbort = cb_a(arr_a[intI], intRowNum, intI);
				}
			}
			intRowNum++;
			intI++;
		}
	}
}

function toBoolean(strVal_a)
{
    var blnResult = false;

    if (strVal_a !== null && strVal_a !== undefined)
    {
        var strVal = String(strVal_a).toLowerCase().trim();
        blnResult = (strVal === 'true' || strVal === 't' || strVal === 'yes' || strVal === 'y' || strVal === '1');
    }

    return blnResult;
}