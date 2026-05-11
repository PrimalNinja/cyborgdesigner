<?php
// ws/server.php
// CyborgDesktop web service endpoint
// PHP 5.4+

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// ============================================================
// DEBUG
// ============================================================

define('DEBUG', true);

function logDebug($str_a)
{
	if (DEBUG)
	{
		file_put_contents(__DIR__ . '/server.log', date('Y-m-d H:i:s') . ' ' . $str_a . "\n", FILE_APPEND);
	}
}

// ============================================================
// SANITIZE
// ============================================================

function sanitize($strValue_a)
{
	return preg_replace('/[^a-zA-Z0-9_\-]/', '', $strValue_a);
}

// ============================================================
// PARAMETERS
// ============================================================

$strAction = isset($_POST['action']) ? strtolower($_POST['action'])           : '';
$strType   = isset($_POST['type'])   ? strtolower(sanitize($_POST['type']))   : '';
$strCode   = isset($_POST['code'])   ? strtolower(sanitize($_POST['code']))   : '';
$strData   = isset($_POST['data'])   ? $_POST['data']                         : '';
$strPrefix = isset($_POST['prefix']) ? strtolower(sanitize($_POST['prefix'])) : '';

// ============================================================
// FUNCTIONS
// ============================================================

function buildPath($strType_a, $strCode_a)
{
	return __DIR__ . '/' . $strType_a . '/' . $strCode_a . '.json';
}

function buildDir($strType_a)
{
	return __DIR__ . '/' . $strType_a;
}

function doDelete($strType_a, $strCode_a)
{
	$objResult = array('error' => '');

	if (empty($strType_a) || empty($strCode_a))
	{
		$objResult['error'] = 'Missing type or code';
	}
	else
	{
		$strPath = buildPath($strType_a, $strCode_a);
		logDebug('DELETE type=' . $strType_a . ' code=' . $strCode_a . ' path=' . $strPath);

		if (!file_exists($strPath))
		{
			$objResult['error'] = 'Not found';
		}
		else
		{
			unlink($strPath);
		}
	}

	return $objResult;
}

function doLoad($strType_a, $strCode_a)
{
	$objResult = array('error' => '', 'data' => null);

	if (empty($strType_a) || empty($strCode_a))
	{
		$objResult['error'] = 'Missing type or code';
	}
	else
	{
		$strPath = buildPath($strType_a, $strCode_a);
		logDebug('LOAD type=' . $strType_a . ' code=' . $strCode_a . ' found=' . (file_exists($strPath) ? 'yes' : 'no'));

		if (!file_exists($strPath))
		{
			$objResult['error'] = 'Not found';
		}
		else
		{
			$strContent        = file_get_contents($strPath);
			$objResult['data'] = json_decode($strContent, true);
		}
	}

	return $objResult;
}

function doSave($strType_a, $strCode_a, $strData_a)
{
	$objResult = array('error' => '');

	if (empty($strType_a) || empty($strCode_a) || empty($strData_a))
	{
		$objResult['error'] = 'Missing type, code or data';
	}
	else
	{
		$objData = json_decode($strData_a, true);

		if ($objData === null)
		{
			$objResult['error'] = 'Invalid JSON data';
		}
		else
		{
			$strDir = buildDir($strType_a);

			if (!is_dir($strDir))
			{
				mkdir($strDir, 0755, true);
			}

			$strPath = buildPath($strType_a, $strCode_a);
			logDebug('SAVE type=' . $strType_a . ' code=' . $strCode_a . ' path=' . $strPath);
			file_put_contents($strPath, json_encode($objData, JSON_PRETTY_PRINT));
		}
	}

	return $objResult;
}

function doList($strType_a, $strPrefix_a)
{
	$objResult = array('error' => '', 'data' => array());

	if (empty($strType_a))
	{
		$objResult['error'] = 'Missing type';
	}
	else
	{
		$strDir = buildDir($strType_a);

		if (is_dir($strDir))
		{
			$strGlob  = !empty($strPrefix_a) ? $strDir . '/' . $strPrefix_a . '--*.json' : $strDir . '/*.json';
			$arrFiles = glob($strGlob);
			logDebug('LIST type=' . $strType_a . ' prefix=' . $strPrefix_a . ' glob=' . $strGlob . ' count=' . count($arrFiles));

			foreach ($arrFiles as $strFile)
			{
				$strContent = file_get_contents($strFile);
				$objItem    = json_decode($strContent, true);

				if ($objItem !== null)
				{
					$objResult['data'][] = $objItem;
				}
			}
		}
	}

	return $objResult;
}

// ============================================================
// ROUTING
// ============================================================

switch ($strAction)
{
	case 'delete': echo json_encode(doDelete($strType, $strCode));         break;
	case 'load':   echo json_encode(doLoad($strType, $strCode));           break;
	case 'save':   echo json_encode(doSave($strType, $strCode, $strData)); break;
	case 'list':   echo json_encode(doList($strType, $strPrefix));         break;
	default:       echo json_encode(array('error' => 'Unknown action'));   break;
}
?>