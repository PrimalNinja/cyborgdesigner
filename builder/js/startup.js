// js/startup.js
// CyborgDesktop startup
// (c) 2025 Cyborg Unicorn Pty Ltd.

var g_objOS = new os();

$(document).ready(function()
{
	$('.gecd-entities').on('click', function()
	{
		$('.gecd-maintabbutton').removeClass('active');
		$(this).addClass('active');

		g_objOS.openForm('frmLister',
		{
			type:   'lister',
			entity: 'entity'
		},
		null);
	});

	$('.gecd-layouts').on('click', function()
	{
		$('.gecd-maintabbutton').removeClass('active');
		$(this).addClass('active');

		g_objOS.openForm('frmLayoutLister',
		{
			type:       'lister',
			entity:     'layout',
			datafolder: 'form'
		},
		null);
	});

	// open entities on load
	//$('.gecd-entities').trigger('click');
});