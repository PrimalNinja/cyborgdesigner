<?php
// ws/server.php
// CyborgDesktop web service endpoint
// PHP 5.4+

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$strAction = isset($_POST['action']) ? $_POST['action'] : '';
$strType   = isset($_POST['type'])   ? $_POST['type']   : '';
$strCode   = isset($_POST['code'])   ? $_POST['code']   : '';
$strData   = isset($_POST['data'])   ? $_POST['data']   : '';

function fnSanitise($strValue_a)
{
    return preg_replace('/[^a-zA-Z0-9_\-]/', '', $strValue_a);
}

$strType = strtolower(fnSanitise($strType));
$strCode = strtolower(fnSanitise($strCode));

function fnBuildPath($strType_a, $strCode_a)
{
    return __DIR__ . '/' . $strType_a . '/' . $strCode_a . '.json';
}

function fnBuildDir($strType_a)
{
    return __DIR__ . '/' . $strType_a;
}

switch ($strAction)
{
    case 'load':
        if (empty($strType) || empty($strCode))
        {
            echo json_encode(array('error' => 'Missing type or code', 'data' => null));
            break;
        }
        $strPath = fnBuildPath($strType, $strCode);
        if (!file_exists($strPath))
        {
            echo json_encode(array('error' => 'Not found', 'data' => null));
            break;
        }
        $strContent = file_get_contents($strPath);
        $objData    = json_decode($strContent, true);
        echo json_encode(array('error' => '', 'data' => $objData));
        break;

    case 'save':
        if (empty($strType) || empty($strCode) || empty($strData))
        {
            echo json_encode(array('error' => 'Missing type, code or data'));
            break;
        }
        $strDir = fnBuildDir($strType);
        if (!is_dir($strDir))
        {
            mkdir($strDir, 0755, true);
        }
        $strPath = fnBuildPath($strType, $strCode);
        $objData = json_decode($strData, true);
        if ($objData === null)
        {
            echo json_encode(array('error' => 'Invalid JSON data'));
            break;
        }
        file_put_contents($strPath, json_encode($objData, JSON_PRETTY_PRINT));
        echo json_encode(array('error' => ''));
        break;

    case 'list':
        if (empty($strType))
        {
            echo json_encode(array('error' => 'Missing type', 'data' => array()));
            break;
        }
        $strDir = fnBuildDir($strType);
        if (!is_dir($strDir))
        {
            echo json_encode(array('error' => '', 'data' => array()));
            break;
        }
        $arrFiles = glob($strDir . '/*.json');
        $arrItems = array();
        foreach ($arrFiles as $strFile)
        {
            $strContent = file_get_contents($strFile);
            $objItem    = json_decode($strContent, true);
            if ($objItem !== null)
            {
                $arrItems[] = $objItem;
            }
        }
        echo json_encode(array('error' => '', 'data' => $arrItems));
        break;

    default:
        echo json_encode(array('error' => 'Unknown action'));
        break;
}
?>