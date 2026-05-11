// js/startup.js
// CyborgDesktop startup
// (c) 2025 Cyborg Unicorn Pty Ltd.

var g_objOS = new os();

$(document).ready(function()
{
	var g_objDeveloperMenu = new menuRenderer(g_objOS, '#ge-developermenu', 'developer');
	var g_objMainMenu = new menuRenderer(g_objOS, '#ge-mainmenu', 'main');
});