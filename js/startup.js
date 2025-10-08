// CyborgDesigner v20251009
// (c) 2025 Cyborg Unicorn Pty Ltd.
// This software is released under MIT License.

// TODO:
//	add the following Designers: Compound DataType (eg: Address), Dock
$(document).ready(function() 
{
	var strTarget = '#gecd';
	
	element('#gecd-maintabbar', '.gecd-application').on('click', function() 
	{
		element('#gecd-maintabbar', '.gecd-maintabbutton').removeClass('active');
		element('#gecd-maintabbar', '.gecd-application').addClass('active');
		createApplicationLayout();
	});

	element('#gecd-maintabbar', '.gecd-dashboard').on('click', function() 
	{
		element('#gecd-maintabbar', '.gecd-maintabbutton').removeClass('active');
		element('#gecd-maintabbar', '.gecd-dashboard').addClass('active');
		createDashboardLayout();
	});
    
	element('#gecd-maintabbar', '.gecd-database').on('click', function() 
	{
		element('#gecd-maintabbar', '.gecd-maintabbutton').removeClass('active');
		element('#gecd-maintabbar', '.gecd-database').addClass('active');
		createDatabaseLayout();
	});
    
	element('#gecd-maintabbar', '.gecd-form').on('click', function() 
	{
		element('#gecd-maintabbar', '.gecd-maintabbutton').removeClass('active');
		element('#gecd-maintabbar', '.gecd-form').addClass('active');
		createFormLayout();
	});

	element('#gecd-maintabbar', '.gecd-menu').on('click', function() 
	{
		element('#gecd-maintabbar', '.gecd-maintabbutton').removeClass('active');
		element('#gecd-maintabbar', '.gecd-menu').addClass('active');
		createMenuLayout();
	});
    
	element('#gecd-maintabbar', '.gecd-report').on('click', function() 
	{
		element('#gecd-maintabbar', '.gecd-maintabbutton').removeClass('active');
		element('#gecd-maintabbar', '.gecd-report').addClass('active');
		createReportLayout();
	});

	element('#gecd-maintabbar', '.gecd-aiorchestration').on('click', function() 
	{
		element('#gecd-maintabbar', '.gecd-maintabbutton').removeClass('active');
		element('#gecd-maintabbar', '.gecd-aiorchestration').addClass('active');
		createAIOrchestrationLayout();
	});

	var arrNativeDatatypes = [
		{ 
			type: 'nativetextbox', 
			caption: 'Native Text', 
			container: false,
			properties: [
				{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
				{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
				{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
				{ name: 'value', label: 'Value', datatype: 'nativetextbox', showinbuilder: true },
				{ name: 'length', label: 'Length', datatype: 'nativetextbox' },
				{ name: 'qty', label: 'Qty', datatype: 'nativetextbox' },
				{ name: 'required', label: 'Required', datatype: 'nativeyesno', showinbuilder: true },
				{ name: 'readonly', label: 'Read Only', datatype: 'nativeyesno', showinbuilder: true },
				{ name: 'searchable', label: 'Searchable', datatype: 'nativeyesno', showinbuilder: true },
				{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
				{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
			]
		},
		{ 
			type: 'nativemultilinetextbox', 
			caption: 'Native Multiline Text', 
			container: false,
			properties: [
				{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
				{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
				{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
				{ name: 'value', label: 'Value', datatype: 'nativetextbox', showinbuilder: true },
				{ name: 'length', label: 'Length', datatype: 'nativetextbox' },
				{ name: 'lines', label: 'Total Lines', datatype: 'nativetextbox' },
				{ name: 'qty', label: 'Qty', datatype: 'nativetextbox' },
				{ name: 'required', label: 'Required', datatype: 'nativeyesno', showinbuilder: true },
				{ name: 'readonly', label: 'Read Only', datatype: 'nativeyesno', showinbuilder: true },
				{ name: 'searchable', label: 'Searchable', datatype: 'nativeyesno', showinbuilder: true },
				{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
				{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
			]
		},
		{ 
			type: 'nativelist', 
			caption: 'Native List', 
			container: false,
			properties: [
				{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
				{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
				{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
				{ name: 'length', label: 'Length', datatype: 'nativetextbox' },
				{ name: 'qty', label: 'Qty', datatype: 'nativetextbox' },

				{ name: 'value', label: 'Value', datatype: 'nativelistoption', showinbuilder: true },
				{ name: 'options', label: 'Option List', datatype: [ 'nativelistoption' ] },

				{ name: 'datasource', label: 'Data Source', datatype: 'nativetextbox' },
				{ name: 'datafilter', label: 'Data Filter', datatype: 'nativetextbox' },
				{ name: 'datafields', label: 'Data Fields', datatype: 'nativetextbox' },

				{ name: 'required', label: 'Required', datatype: 'nativeyesno', showinbuilder: true },
				{ name: 'readonly', label: 'Read Only', datatype: 'nativeyesno', showinbuilder: true },
				{ name: 'searchable', label: 'Searchable', datatype: 'nativeyesno', showinbuilder: true },
				{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
				{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
			]
		},
		{ 
			type: 'nativemultilist', 
			caption: 'Native Multi List', 
			container: false,
			properties: [
				{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
				{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
				{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
				{ name: 'length', label: 'Length', datatype: 'nativetextbox' },
				{ name: 'qty', label: 'Qty', datatype: 'nativetextbox' },

				{ name: 'values', label: 'Value List', datatype: [ 'nativelistoption' ], showinbuilder: true},
				{ name: 'options', label: 'Option List', datatype: [ 'nativelistoption' ] },

				{ name: 'datasource', label: 'Data Source', datatype: 'nativetextbox' },
				{ name: 'datafilter', label: 'Data Filter', datatype: 'nativetextbox' },
				{ name: 'datafields', label: 'Data Fields', datatype: 'nativetextbox' },

				{ name: 'required', label: 'Required', datatype: 'nativeyesno', showinbuilder: true },
				{ name: 'readonly', label: 'Read Only', datatype: 'nativeyesno', showinbuilder: true },
				{ name: 'searchable', label: 'Searchable', datatype: 'nativeyesno', showinbuilder: true },
				{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
				{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
			]
		},
		{ 
			type: 'nativelistoption', 
			caption: 'Native List Option', 
			container: false,
			properties: [
				{ name: 'value', label: 'Value', datatype: 'nativetextbox' },
				{ name: 'code', label: 'Code', datatype: 'nativetextbox' },
				{ name: 'description', label: 'Description', datatype: 'nativetextbox' }
			]
		},
		{ 
			type: 'nativeyesno', 
			caption: 'Native Yes/No', 
			container: false,
			properties: [
				{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
				{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
				{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
				{ name: 'value', label: 'Value', datatype: 'nativetextbox', showinbuilder: true },
				{ name: 'required', label: 'Required', datatype: 'nativeyesno', showinbuilder: true },
				{ name: 'readonly', label: 'Read Only', datatype: 'nativeyesno', showinbuilder: true },
				{ name: 'searchable', label: 'Searchable', datatype: 'nativeyesno', showinbuilder: true },
				{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
				{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
			]
		}
	];

	function createApplicationLayout()
	{
		var objCD = new cyborgDesigner(
		{
			cbElement: element,
			cbDataRenderer: function(objRaw_a) { element(strTarget, '.gecd-layoutdata').html(JSON.stringify(objRaw_a)); },
			cbPreviewRenderer: function(objRaw_a) { element(strTarget, '.gecd-layoutpreview').html(JSON.stringify(objRaw_a)); },
			cbTransformer: function(objRaw_a) { return objRaw_a; },
			target: strTarget,
			datatypes: [
				{ type: '--', caption: 'Controls', container: false, properties: [] },
				{ 
					type: 'heading', 
					caption: 'Heading', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				}
			],
			containers: [
				{ type: '--', caption: 'Containers', container: false, properties: [] },
				{ 
					type: 'horizontalcontainer', 
					caption: 'Horizontal Container', 
					container: true,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'verticalcontainer', 
					caption: 'Vertical Container', 
					container: true,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ type: '--', caption: 'Sections', container: false, properties: [] },
				{ 
					type: 'layoutsection', 
					caption: 'Application Section', 
					container: true,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				}
			],
			allowNativeDatatypes: false,
			nativeDatatypes: arrNativeDatatypes,
			layoutSections: [
				{ 
					id: getGUID('section-'), 
					caption: 'Application Header',
					containers: [
						{
							id: getGUID('container-'),
							type: 'verticalcontainer',
							name: 'APPLICATION-HEADER',
							caption: 'Application Header Container',
							children: [
								{ id: getGUID('field-'), type: 'heading', caption: 'Heading', label: 'Heading', name: 'HEADING', container: false }
							]
						}
					]
				},
				{ 
					id: getGUID('section-'), 
					caption: 'Application Body',
					containers: [
						{
							id: getGUID('container-'),
							type: 'horizontalcontainer',
							caption: 'Horizontal Container',
							children: [
								{
									id: getGUID('container-'),
									name: 'APPLICATION-MENU',
									type: 'verticalcontainer',
									caption: 'Menu Container',
									children: [
									]
								},
								{
									id: getGUID('container-'),
									name: 'APPLICATION-FORMS',
									type: 'verticalcontainer',
									caption: 'Form Container',
									children: [
									]
								}
							]
						}
					]
				},
				{ 
					id: getGUID('section-'), 
					caption: 'Application Footer',
					containers: [
						{
							id: getGUID('container-'),
							type: 'verticalcontainer',
							caption: 'Application Toolbar',
							children: [
							]
						}
					]
				}
			]
		});
	}

	function createDashboardLayout()
	{
		var objCD = new cyborgDesigner(
		{
			cbElement: element,
			cbDataRenderer: function(objRaw_a) { element(strTarget, '.gecd-layoutdata').html(JSON.stringify(objRaw_a)); },
			cbPreviewRenderer: function(objRaw_a) { element(strTarget, '.gecd-layoutpreview').html(JSON.stringify(objRaw_a)); },
			cbTransformer: function(objRaw_a) { return objRaw_a; },
			target: strTarget,
			datatypes: [
				{ type: '--', caption: 'Charts', container: false, properties: [] },
				{ 
					type: 'areachart', 
					caption: 'Area Chart', 
					container: false, 
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					] 
				},
				{ 
					type: 'barchart', 
					caption: 'Bar Chart', 
					container: false, 
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'bubblechart', 
					caption: 'Bubble Chart', 
					container: false, 
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'doughnutchart', 
					caption: 'Doughnut Chart', 
					container: false, 
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'linechart', 
					caption: 'Line Chart', 
					container: false, 
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'piechart', 
					caption: 'Pie Chart', 
					container: false, 
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'scatterchart', 
					caption: 'Scatter Chart', 
					container: false, 
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'stackedareachart', 
					caption: 'Stacked Area Chart', 
					container: false, 
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'stackedbarchart', 
					caption: 'Stacked Bar Chart', 
					container: false, 
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ type: '--', caption: 'Maps', container: false, properties: [] },
				{ 
					type: 'heatmap', 
					caption: 'Heatmap', 
					container: false, 
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					] 
				},
				{ 
					type: 'treemap', 
					caption: 'Treemap', 
					container: false, 
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					] 
				}
			],
			containers: [
				{ type: '--', caption: 'Containers', container: false, properties: [] },
				{ 
					type: 'horizontalcontainer', 
					caption: 'Horizontal Container', 
					container: true,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'verticalcontainer', 
					caption: 'Vertical Container', 
					container: true,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ type: '--', caption: 'Sections', container: false, properties: [] },
				{ 
					type: 'layoutsection', 
					caption: 'Dashboard Section', 
					container: true,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				}
			],
			allowNativeDatatypes: false,
			nativeDatatypes: arrNativeDatatypes,
			layoutSections: [
				{ 
					id: getGUID('section-'), 
					caption: 'Dashboard',
					containers: [
						{
							id: getGUID('container-'),
							type: 'horizontalcontainer',
							caption: 'Horizontal Container',
							children: [
								{
									id: getGUID('container-'),
									type: 'verticalcontainer',
									caption: 'Left Container',
									children: [
										{ id: getGUID('field-'), type: 'barchart', caption: 'Bar Chart', label: 'Bar Chart', name: 'BARCHART', container: false }
									]
								},
								{
									id: getGUID('container-'),
									type: 'verticalcontainer',
									caption: 'Right Container',
									children: [
										{ id: getGUID('field-'), type: 'piechart', caption: 'Pie Chart', label: 'Pie Chart', name: 'PIECHART', container: false }
									]
								}
							]
						}
					]
				}
			]
		});
	}

	function createDatabaseLayout()
	{
		var objCD = new cyborgDesigner(
		{
			cbElement: element,
			cbDataRenderer: function(objRaw_a) { element(strTarget, '.gecd-layoutdata').html(JSON.stringify(objRaw_a)); },
			cbPreviewRenderer: function(objRaw_a) { element(strTarget, '.gecd-layoutpreview').html(JSON.stringify(objRaw_a)); },
			cbTransformer: function(objRaw_a) { return objRaw_a; },
			target: strTarget,
			datatypes: [
				{ type: '--', caption: 'DataTypes', container: false, properties: [] },
				{ 
					type: 'boolean', 
					caption: 'Boolean', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'default', label: 'Default', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'length', label: 'Length', value: 1, datatype: 'nativetextbox' },
						{ name: 'required', label: 'Required', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'readonly', label: 'Read Only', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'searchable', label: 'Searchable', datatype: 'nativeyesno', showinbuilder: true }
					]
				},
				{ 
					type: 'date', 
					caption: 'Date', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'default', label: 'Default', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'length', label: 'Length', value: 10, datatype: 'nativetextbox' },
						{ name: 'required', label: 'Required', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'readonly', label: 'Read Only', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'searchable', label: 'Searchable', datatype: 'nativeyesno', showinbuilder: true }
					]
				},
				{ 
					type: 'number', 
					caption: 'Number', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'default', label: 'Default', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'required', label: 'Required', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'readonly', label: 'Read Only', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'searchable', label: 'Searchable', datatype: 'nativeyesno', showinbuilder: true }
					]
				},
				{ 
					type: 'text', 
					caption: 'Text', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'default', label: 'Default', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'length', label: 'Length', datatype: 'nativetextbox' },
						{ name: 'required', label: 'Required', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'readonly', label: 'Read Only', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'searchable', label: 'Searchable', datatype: 'nativeyesno', showinbuilder: true }
					]
				}
			],
			containers: [
				{ type: '--', caption: 'Containers', container: false, properties: [] },
				{ 
					type: 'verticalcontainer', 
					caption: 'Table', 
					container: true,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ type: '--', caption: 'Sections', container: false, properties: [] },
				{ 
					type: 'layoutsection', 
					caption: 'Database', 
					container: true,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				}
			],
			allowNativeDatatypes: false,
			nativeDatatypes: arrNativeDatatypes,
			layoutSections: [
				{ 
					id: getGUID('section-'), 
					caption: 'Database',
					containers: [
						{
							id: getGUID('container-'),
							type: 'verticalcontainer',
							caption: 'User Table',
							children: [
								{ id: getGUID('field-'), type: 'text', caption: 'User ID', label: 'User ID', name: 'userid', container: false },
								{ id: getGUID('field-'), type: 'text', caption: 'First Name', label: 'First Name', name: 'firstname', container: false },
								{ id: getGUID('field-'), type: 'text', caption: 'Last Name', label: 'Last Name', name: 'lastname', container: false },
								{ id: getGUID('field-'), type: 'boolean', caption: 'Is Enabled?', label: 'Is Enabled?', name: 'isenabled', container: false }
							]
						}
					]
				}
			]
		});
	}

	function createFormLayout()
	{
		var objCD = new cyborgDesigner(
		{
			cbElement: element,
			cbDataRenderer: function(objRaw_a) { element(strTarget, '.gecd-layoutdata').html(JSON.stringify(objRaw_a)); },
			cbPreviewRenderer: function(objRaw_a) { element(strTarget, '.gecd-layoutpreview').html(JSON.stringify(objRaw_a)); },
			cbTransformer: function(objRaw_a) { return objRaw_a; },
			target: strTarget,
			datatypes: [
				{ type: '--', caption: 'Controls', container: false, properties: [] },
				{ 
					type: 'barcode', 
					caption: 'Barcode', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'value', label: 'Value', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'length', label: 'Length', datatype: 'nativetextbox' },
						{ name: 'qty', label: 'Qty', datatype: 'nativetextbox' },
						{ name: 'required', label: 'Required', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'readonly', label: 'Read Only', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'searchable', label: 'Searchable', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'button', 
					caption: 'Button', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'chart', 
					caption: 'Chart', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'value', label: 'Value', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'length', label: 'Length', datatype: 'nativetextbox' },
						{ name: 'qty', label: 'Qty', datatype: 'nativetextbox' },
						{ name: 'required', label: 'Required', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'readonly', label: 'Read Only', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'searchable', label: 'Searchable', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'checkbox', 
					caption: 'Checkbox', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'value', label: 'Value', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'length', label: 'Length', datatype: 'nativetextbox' },
						{ name: 'qty', label: 'Qty', datatype: 'nativetextbox' },
						{ name: 'required', label: 'Required', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'readonly', label: 'Read Only', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'searchable', label: 'Searchable', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'codeeditor', 
					caption: 'Code Editor', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'value', label: 'Value', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'length', label: 'Length', datatype: 'nativetextbox' },
						{ name: 'qty', label: 'Qty', datatype: 'nativetextbox' },
						{ name: 'required', label: 'Required', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'readonly', label: 'Read Only', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'searchable', label: 'Searchable', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'date', 
					caption: 'Date', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'value', label: 'Value', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'length', label: 'Length', datatype: 'nativetextbox' },
						{ name: 'qty', label: 'Qty', datatype: 'nativetextbox' },
						{ name: 'required', label: 'Required', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'readonly', label: 'Read Only', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'searchable', label: 'Searchable', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'document', 
					caption: 'Document', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'value', label: 'Value', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'length', label: 'Length', datatype: 'nativetextbox' },
						{ name: 'qty', label: 'Qty', datatype: 'nativetextbox' },
						{ name: 'required', label: 'Required', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'readonly', label: 'Read Only', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'searchable', label: 'Searchable', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'gps', 
					caption: 'GPS', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'value', label: 'Value', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'length', label: 'Length', datatype: 'nativetextbox' },
						{ name: 'qty', label: 'Qty', datatype: 'nativetextbox' },
						{ name: 'required', label: 'Required', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'readonly', label: 'Read Only', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'searchable', label: 'Searchable', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'heading', 
					caption: 'Heading', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'html', 
					caption: 'HTML', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'value', label: 'Value', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'length', label: 'Length', datatype: 'nativetextbox' },
						{ name: 'qty', label: 'Qty', datatype: 'nativetextbox' },
						{ name: 'required', label: 'Required', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'readonly', label: 'Read Only', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'searchable', label: 'Searchable', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'image', 
					caption: 'Image', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'value', label: 'Value', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'qty', label: 'Qty', datatype: 'nativetextbox' },
						{ name: 'required', label: 'Required', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'readonly', label: 'Read Only', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'searchable', label: 'Searchable', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'instructionaltext', 
					caption: 'Instructional Text', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'label', 
					caption: 'Label', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'value', label: 'Value', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'length', label: 'Length', datatype: 'nativetextbox' },
						{ name: 'qty', label: 'Qty', datatype: 'nativetextbox' },
						{ name: 'required', label: 'Required', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'readonly', label: 'Read Only', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'searchable', label: 'Searchable', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'list', 
					caption: 'List', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'length', label: 'Length', datatype: 'nativetextbox' },
						{ name: 'qty', label: 'Qty', datatype: 'nativetextbox' },

						{ name: 'value', label: 'Value', datatype: 'nativelistoption', showinbuilder: true },
						{ name: 'options', label: 'Option List', datatype: [ 'nativelistoption' ] },

						{ name: 'datasource', label: 'Data Source', datatype: 'nativetextbox' },
						{ name: 'datafilter', label: 'Data Filter', datatype: 'nativetextbox' },
						{ name: 'datafields', label: 'Data Fields', datatype: 'nativetextbox' },

						{ name: 'required', label: 'Required', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'readonly', label: 'Read Only', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'searchable', label: 'Searchable', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'metadata', 
					caption: 'Meta Data', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'value', label: 'Value', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'length', label: 'Length', datatype: 'nativetextbox' },
						{ name: 'qty', label: 'Qty', datatype: 'nativetextbox' },
						{ name: 'required', label: 'Required', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'readonly', label: 'Read Only', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'searchable', label: 'Searchable', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'multilist', 
					caption: 'Multi List', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'length', label: 'Length', datatype: 'nativetextbox' },
						{ name: 'qty', label: 'Qty', datatype: 'nativetextbox' },

						{ name: 'values', label: 'Value List', datatype: [ 'nativelistoption' ], showinbuilder: true },
						{ name: 'options', label: 'Option List', datatype: [ 'nativelistoption' ] },

						{ name: 'datasource', label: 'Data Source', datatype: 'nativetextbox' },
						{ name: 'datafilter', label: 'Data Filter', datatype: 'nativetextbox' },
						{ name: 'datafields', label: 'Data Fields', datatype: 'nativetextbox' },

						{ name: 'required', label: 'Required', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'readonly', label: 'Read Only', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'searchable', label: 'Searchable', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'multilinetextbox', 
					caption: 'Multiline Text', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'value', label: 'Value', datatype: 'nativemultilinetextbox', showinbuilder: true },
						{ name: 'length', label: 'Length', datatype: 'nativetextbox' },
						{ name: 'qty', label: 'Qty', datatype: 'nativetextbox' },
						{ name: 'required', label: 'Required', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'readonly', label: 'Read Only', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'searchable', label: 'Searchable', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'number', 
					caption: 'Number', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'value', label: 'Value', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'length', label: 'Length', datatype: 'nativetextbox' },
						{ name: 'qty', label: 'Qty', datatype: 'nativetextbox' },
						{ name: 'required', label: 'Required', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'readonly', label: 'Read Only', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'searchable', label: 'Searchable', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'password', 
					caption: 'Password', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'value', label: 'Value', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'length', label: 'Length', datatype: 'nativetextbox' },
						{ name: 'qty', label: 'Qty', datatype: 'nativetextbox' },
						{ name: 'required', label: 'Required', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'readonly', label: 'Read Only', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'searchable', label: 'Searchable', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'relatedlinks', 
					caption: 'Related Links', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'value', label: 'Value', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'length', label: 'Length', datatype: 'nativetextbox' },
						{ name: 'qty', label: 'Qty', datatype: 'nativetextbox' },
						{ name: 'required', label: 'Required', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'readonly', label: 'Read Only', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'searchable', label: 'Searchable', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'spacer', 
					caption: 'Spacer', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'textbox', 
					caption: 'Text', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'value', label: 'Value', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'length', label: 'Length', datatype: 'nativetextbox' },
						{ name: 'qty', label: 'Qty', datatype: 'nativetextbox' },
						{ name: 'required', label: 'Required', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'readonly', label: 'Read Only', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'searchable', label: 'Searchable', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'texthtml', 
					caption: 'Text HTML', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'value', label: 'Value', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'length', label: 'Length', datatype: 'nativetextbox' },
						{ name: 'qty', label: 'Qty', datatype: 'nativetextbox' },
						{ name: 'required', label: 'Required', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'readonly', label: 'Read Only', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'searchable', label: 'Searchable', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'time', 
					caption: 'Time', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'value', label: 'Value', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'length', label: 'Length', datatype: 'nativetextbox' },
						{ name: 'qty', label: 'Qty', datatype: 'nativetextbox' },
						{ name: 'required', label: 'Required', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'readonly', label: 'Read Only', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'searchable', label: 'Searchable', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'url', 
					caption: 'URL', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'value', label: 'Value', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'length', label: 'Length', datatype: 'nativetextbox' },
						{ name: 'qty', label: 'Qty', datatype: 'nativetextbox' },
						{ name: 'required', label: 'Required', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'readonly', label: 'Read Only', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'searchable', label: 'Searchable', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'yesno', 
					caption: 'Yes / No', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'value', label: 'Value', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'required', label: 'Required', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'readonly', label: 'Read Only', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'searchable', label: 'Searchable', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				}
			],
			containers: [
				{ type: '--', caption: 'Containers', container: false, properties: [] },
				{ 
					type: 'horizontalcontainer', 
					caption: 'Horizontal Container', 
					container: true,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'verticalcontainer', 
					caption: 'Vertical Container', 
					container: true,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ type: '--', caption: 'Sections', container: false, properties: [] },
				{ 
					type: 'layoutsection', 
					caption: 'Form Section', 
					container: true,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				}
			],
			allowNativeDatatypes: false,
			nativeDatatypes: arrNativeDatatypes,
			layoutSections: [
				{ 
					id: getGUID('section-'), 
					caption: 'Form Header',
					containers: [
						{
							id: getGUID('container-'),
							type: 'verticalcontainer',
							caption: 'Form Header Container',
							name: 'FORMHEADER',
							label: 'Form Header',
							children: [
								{ id: getGUID('field-'), type: 'textbox', caption: 'Entity Name', label: 'Entity Name', name: 'ENTITYNAME', container: false },
								{ id: getGUID('field-'), type: 'number', caption: 'Form Version', label: 'Form Version', name: 'FORMVERSION', value: '1', container: false },
								{ id: getGUID('field-'), type: 'textbox', caption: 'Code', label: 'Code', name: 'CODE', container: false },
								{ id: getGUID('field-'), type: 'textbox', caption: 'Description', label: 'Description', name: 'DESCRIPTION', container: false },
								{ id: getGUID('field-'), type: 'checkbox', caption: 'Is Enabled?', label: 'Is Enabled?', name: 'ISENABLED', container: false }
							]
						}
					]
				},
				{ 
					id: getGUID('section-'), 
					caption: 'Data Header',
					containers: [
						{
							id: getGUID('container-'),
							type: 'verticalcontainer',
							caption: 'Vertical Container',
							name: 'DATAHEADER',
							label: 'Data Header',
							children: [
								{ id: getGUID('field-'), type: 'number', caption: 'Data Version', label: 'Data Version', name: 'DATAVERSION', value: '1', container: false }
							]
						}
					]
				},
				{ 
					id: getGUID('section-'), 
					caption: 'Form Data',
					containers: [
						{
							id: getGUID('container-'),
							type: 'verticalcontainer',
							caption: 'Vertical Container',
							name: 'FORMDATA',
							label: 'Form Data',
							children: [
								{ id: getGUID('field-'), type: 'textbox', caption: 'Code', label: 'Code', name: 'CODE', container: false },
								{ id: getGUID('field-'), type: 'textbox', caption: 'Description', label: 'Description', name: 'DESCRIPTION', container: false },
								{ id: getGUID('field-'), type: 'checkbox', caption: 'Is Enabled?', label: 'Is Enabled?', name: 'ISENABLED', container: false }
							]
						}
					]
				}
			]
		});
	}
	
	function createMenuLayout()
	{
		var objCD = new cyborgDesigner(
		{
			cbElement: element,
			cbDataRenderer: function(objRaw_a) { element(strTarget, '.gecd-layoutdata').html(JSON.stringify(objRaw_a)); },
			cbPreviewRenderer: function(objRaw_a) { element(strTarget, '.gecd-layoutpreview').html(JSON.stringify(objRaw_a)); },
			cbTransformer: function(objRaw_a) { return objRaw_a; },
			target: strTarget,
			datatypes: [
				{ type: '--', caption: 'Menus', container: false, properties: [] },
				{ 
					type: 'menuitem', 
					caption: 'Menu Item', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'submenu', 
					caption: 'Sub Menu', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'submenuname', label: 'Sub Menu Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				}
			],
			containers: [
				{ type: '--', caption: 'Containers', container: false, properties: [] },
				// { 
					// type: 'horizontalcontainer', 
					// caption: 'Horizontal Container', 
					// container: true,
					// properties: [
						// { name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						// { name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						// { name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						// { name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						// { name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					// ]
				// },
				{ 
					type: 'verticalcontainer', 
					caption: 'Menu', 
					container: true,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ type: '--', caption: 'Sections', container: false, properties: [] },
				{ 
					type: 'layoutsection', 
					caption: 'Menu Set', 
					container: true,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				}
			],
			allowNativeDatatypes: false,
			nativeDatatypes: arrNativeDatatypes,
			layoutSections: [
				{ 
					id: getGUID('container-'), 
					caption: 'Application Menus',					
					containers: [
						{
							id: getGUID('section-'),
							type: 'verticalcontainer',
							caption: 'File Container',
							label: 'File Container',
							children: [
								{ id: getGUID('field-'), type: 'menuitem', caption: 'New', name: 'NEW', container: false },
								{ id: getGUID('field-'), type: 'menuitem', caption: 'Open...', name: 'OPEN', container: false },
								{ id: getGUID('field-'), type: 'menuitem', caption: 'Save', name: 'SAVE', container: false },
								{ id: getGUID('field-'), type: 'menuitem', caption: 'Save As...', name: 'SAVEAS', container: false }
							]
						},
						{
							id: getGUID('section-'),
							type: 'verticalcontainer',
							caption: 'Edit Menu',
							label: 'Edit Menu',
							children: [
								{ id: getGUID('field-'), type: 'menuitem', caption: 'Cut', name: 'CUT', container: false },
								{ id: getGUID('field-'), type: 'menuitem', caption: 'Copy', name: 'COPY', container: false },
								{ id: getGUID('field-'), type: 'menuitem', caption: 'Paste', name: 'PASTE', container: false }
							]
						},
						{
							id: getGUID('section-'),
							type: 'verticalcontainer',
							caption: 'Help Menu',
							label: 'Help Menu',
							children: [
								{ id: getGUID('field-'), type: 'menuitem', caption: 'About...', name: 'ABOUT', container: false }
							]
						}
					]
				}
			]
		});
	}

	function createReportLayout()
	{
		var objCD = new cyborgDesigner(
		{
			cbElement: element,
			cbDataRenderer: function(objRaw_a) { element(strTarget, '.gecd-layoutdata').html(JSON.stringify(objRaw_a)); },
			cbPreviewRenderer: function(objRaw_a) { element(strTarget, '.gecd-layoutpreview').html(JSON.stringify(objRaw_a)); },
			cbTransformer: function(objRaw_a) { return objRaw_a; },
			target: strTarget,
			datatypes: [
				{ type: '--', caption: 'Controls', container: false, properties: [] },
				{ 
					type: 'barcode', 
					caption: 'Barcode', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'value', label: 'Value', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'length', label: 'Length', datatype: 'nativetextbox' },
						{ name: 'qty', label: 'Qty', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'chart', 
					caption: 'Chart', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'value', label: 'Value', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'length', label: 'Length', datatype: 'nativetextbox' },
						{ name: 'qty', label: 'Qty', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'heading', 
					caption: 'Heading', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'html', 
					caption: 'HTML', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'value', label: 'Value', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'length', label: 'Length', datatype: 'nativetextbox' },
						{ name: 'qty', label: 'Qty', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'image', 
					caption: 'Image', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'value', label: 'Value', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'qty', label: 'Qty', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'instructionaltext', 
					caption: 'Instructional Text', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'multilinetextbox', 
					caption: 'Multiline Text', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'value', label: 'Value', datatype: 'nativemultilinetextbox', showinbuilder: true },
						{ name: 'length', label: 'Length', datatype: 'nativetextbox' },
						{ name: 'qty', label: 'Qty', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'textbox', 
					caption: 'Text', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'value', label: 'Value', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'length', label: 'Length', datatype: 'nativetextbox' },
						{ name: 'qty', label: 'Qty', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'texthtml', 
					caption: 'Text HTML', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'value', label: 'Value', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'length', label: 'Length', datatype: 'nativetextbox' },
						{ name: 'qty', label: 'Qty', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'url', 
					caption: 'URL', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'value', label: 'Value', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'length', label: 'Length', datatype: 'nativetextbox' },
						{ name: 'qty', label: 'Qty', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ type: '--', caption: 'Charts', container: false, properties: [] },
				{ 
					type: 'areachart', 
					caption: 'Area Chart', 
					container: false, 
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					] 
				},
				{ 
					type: 'barchart', 
					caption: 'Bar Chart', 
					container: false, 
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'bubblechart', 
					caption: 'Bubble Chart', 
					container: false, 
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'doughnutchart', 
					caption: 'Doughnut Chart', 
					container: false, 
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'linechart', 
					caption: 'Line Chart', 
					container: false, 
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'piechart', 
					caption: 'Pie Chart', 
					container: false, 
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'scatterchart', 
					caption: 'Scatter Chart', 
					container: false, 
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'stackedareachart', 
					caption: 'Stacked Area Chart', 
					container: false, 
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'stackedbarchart', 
					caption: 'Stacked Bar Chart', 
					container: false, 
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ type: '--', caption: 'Maps', container: false, properties: [] },
				{ 
					type: 'heatmap', 
					caption: 'Heatmap', 
					container: false, 
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					] 
				},
				{ 
					type: 'treemap', 
					caption: 'Treemap', 
					container: false, 
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					] 
				}
			],
			containers: [
				{ type: '--', caption: 'Containers', container: false, properties: [] },
				{ 
					type: 'horizontalcontainer', 
					caption: 'Horizontal Container', 
					container: true,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'verticalcontainer', 
					caption: 'Vertical Container', 
					container: true,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ type: '--', caption: 'Sections', container: false, properties: [] },
				{ 
					type: 'layoutsection', 
					caption: 'Report Section', 
					container: true,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				}
			],
			allowNativeDatatypes: false,
			nativeDatatypes: arrNativeDatatypes,
			layoutSections: [
				{ 
					id: getGUID('section-'), 
					caption: 'Report Header',
					containers: [
						{
							id: getGUID('container-'),
							type: 'verticalcontainer',
							caption: 'Vertical Container',
							children: [
								{ id: getGUID('field-'), type: 'textbox', caption: 'Report Name', name: 'NAME', container: false },
								{ id: getGUID('field-'), type: 'textbox', caption: 'Report Version', name: 'VERSION', value: '1', container: false },
								{ id: getGUID('field-'), type: 'textbox', caption: 'Code', name: 'CODE', container: false },
								{ id: getGUID('field-'), type: 'textbox', caption: 'Description', name: 'DESCRIPTION', container: false }
							]
						}
					]
				},
				{ 
					id: getGUID('section-'), 
					caption: 'Report Data',
					containers: [
						{
							id: getGUID('container-'),
							type: 'verticalcontainer',
							caption: 'Vertical Container',
							children: [
								{ id: getGUID('field-'), type: 'heading', caption: 'Report Title', name: 'TITLE', container: false },
								{ id: getGUID('field-'), type: 'textbox', caption: 'Summary Text', name: 'SUMMARY', container: false },
								{ id: getGUID('field-'), type: 'barchart', caption: 'Bar Chart', name: 'BARCHART', container: false }
							]
						}
					]
				}
			]
		});
	}
	
	function createAIOrchestrationLayout()
	{
		var objCD = new cyborgDesigner(
		{
			cbElement: element,
			cbDataRenderer: function(objRaw_a) { element(strTarget, '.gecd-layoutdata').html(JSON.stringify(objRaw_a)); },
			cbPreviewRenderer: function(objRaw_a) { element(strTarget, '.gecd-layoutpreview').html(JSON.stringify(objRaw_a)); },
			cbTransformer: function(objRaw_a) { return objRaw_a; },
			target: strTarget,
			datatypes: [
				{ type: '--', caption: 'AI Agents', container: false, properties: [] },
				{ 
					type: 'aiclaude', 
					caption: 'Claude', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', value: 'CLAUDE', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', value: 'Claude', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						
						{ name: 'flavour', label: 'Flavour', value: 'claude', datatype: 'nativetextbox' },
						{ name: 'apikey', label: 'API Key', value: '', datatype: 'nativetextbox' },
						{ name: 'endpoint', label: 'Endpoint', value: 'https://api.anthropic.com/v1/messages', datatype: 'nativetextbox' },
						{ name: 'model', label: 'Model', value: 'claude-3-5-sonnet-20241022', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'parallel', label: 'Parallel', value: 'yes', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'maxtokens', label: 'Max Tokens', value: '2000', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'temperature', label: 'Temperature', value: '0.7', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'proxy', label: 'Proxy', datatype: 'nativetextbox', showinbuilder: true },
						
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'aigemini', 
					caption: 'Gemini', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', value: 'GEMINI', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', value: 'Gemini', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						
						{ name: 'flavour', label: 'Flavour', value: 'gemini', datatype: 'nativetextbox' },
						{ name: 'apikey', label: 'API Key', value: '', datatype: 'nativetextbox' },
						{ name: 'endpoint', label: 'Endpoint', value: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent', datatype: 'nativetextbox' },
						{ name: 'model', label: 'Model', value: 'gemini-1.5-flash', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'parallel', label: 'Parallel', value: 'yes', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'maxtokens', label: 'Max Tokens', value: '1000', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'temperature', label: 'Temperature', value: '0.9', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'proxy', label: 'Proxy', datatype: 'nativetextbox' },
						
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'aigeneric', 
					caption: 'Generic', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						
						{ name: 'flavour', label: 'Flavour', value: 'claude', datatype: 'nativetextbox' },
						{ name: 'apikey', label: 'API Key', value: '', datatype: 'nativetextbox' },
						{ name: 'endpoint', label: 'Endpoint', value: 'https://api.anthropic.com/v1/messages', datatype: 'nativetextbox' },
						{ name: 'model', label: 'Model', value: 'claude-3-5-sonnet-20241022', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'parallel', label: 'Parallel', value: 'yes', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'maxtokens', label: 'Max Tokens', value: '2000', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'temperature', label: 'Temperature', value: '0.7', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'proxy', label: 'Proxy', datatype: 'nativetextbox' },
						
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ type: '--', caption: 'Prompts', container: false, properties: [] },
				{ 
					type: 'dropbox', 
					caption: 'Drop Box', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },

						{ name: 'values', label: 'Value List', datatype: [ 'nativelistoption' ], showinbuilder: true },
						{ name: 'options', label: 'Option List', datatype: [ 'nativelistoption' ] },

						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'prompt', 
					caption: 'Prompt', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },

						{ name: 'value', label: 'Value', datatype: 'nativetextbox', showinbuilder: true },

						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ type: '--', caption: 'Transformers', container: false, properties: [] },
				{ 
					type: 'xfrm_speak', 
					caption: 'Speak Transformer', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						
						{ name: 'accent', label: 'Accent', datatype: 'nativetextbox', showinbuilder: true },
						
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'xfrm_translate', 
					caption: 'Translate Transformer', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						
						{ name: 'provider', label: 'Provider', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'language', label: 'Language', datatype: 'nativetextbox', showinbuilder: true },
						
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ type: '--', caption: 'Controls', container: false, properties: [] },
				{ 
					type: 'number', 
					caption: 'Number', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'value', label: 'Value', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'length', label: 'Length', datatype: 'nativetextbox' },
						{ name: 'qty', label: 'Qty', datatype: 'nativetextbox' },
						{ name: 'required', label: 'Required', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'readonly', label: 'Read Only', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'searchable', label: 'Searchable', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'textbox', 
					caption: 'Text', 
					container: false,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'value', label: 'Value', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'length', label: 'Length', datatype: 'nativetextbox' },
						{ name: 'qty', label: 'Qty', datatype: 'nativetextbox' },
						{ name: 'required', label: 'Required', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'readonly', label: 'Read Only', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'searchable', label: 'Searchable', datatype: 'nativeyesno', showinbuilder: true },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				}
			],
			containers: [
				{ type: '--', caption: 'Containers', container: false, properties: [] },
				{ 
					type: 'horizontalcontainer', 
					caption: 'Parallel Container', 
					container: true,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ 
					type: 'verticalcontainer', 
					caption: 'Sequential Container', 
					container: true,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				},
				{ type: '--', caption: 'Sections', container: false, properties: [] },
				{ 
					type: 'layoutsection', 
					caption: 'Orchestration Section', 
					container: true,
					properties: [
						{ name: 'name', label: 'Name', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'label', label: 'Label', datatype: 'nativetextbox', showinbuilder: true },
						{ name: 'classes', label: 'Classes', datatype: 'nativetextbox' },
						{ name: 'tooltip', label: 'Tool Tip', datatype: 'nativetextbox' },
						{ name: 'metadata', label: 'Meta Data', datatype: 'nativemultilinetextbox' }
					]
				}
			],
			allowNativeDatatypes: false,
			nativeDatatypes: arrNativeDatatypes,
			layoutSections: [
				{ 
					id: getGUID('section-'), 
					caption: 'Orchestration Header',
					containers: [
						{
							id: getGUID('container-'),
							type: 'verticalcontainer',
							caption: 'Orchestration Header Container',
							name: 'FORMHEADER',
							label: 'Orchestration Header',
							children: [
								{ id: getGUID('field-'), type: 'number', caption: 'Orchestration Version', label: 'Orchestration Version', name: 'ORCHESTRATIONVERSION', value: '1', container: false },
								{ id: getGUID('field-'), type: 'textbox', caption: 'Code', label: 'Code', name: 'CODE', container: false },
								{ id: getGUID('field-'), type: 'textbox', caption: 'Description', label: 'Description', name: 'DESCRIPTION', container: false }
							]
						}
					]
				},
				{ 
					id: getGUID('section-'), 
					caption: 'Orchestration Section',
					containers: [
						{
							id: getGUID('container-'),
							type: 'verticalcontainer',
							caption: 'AI Agent Container',
							name: 'AIAGENTS',
							label: 'AI Agents',
							children: [
								{ id: getGUID('field-'), type: 'aiclaude', caption: 'Claude', label: 'Claude', name: 'AGENT_CLAUDE', value: '1', container: false }
							]
						}
					]
				},
				{ 
					id: getGUID('section-'), 
					caption: 'Orchestration Section',
					containers: [
						{
							id: getGUID('container-'),
							type: 'verticalcontainer',
							caption: 'Prompt',
							children: [
								{ id: getGUID('field-'), type: 'prompt', caption: 'Enter Text to Translate', label: 'Enter Text to Translate', name: 'PROMPT', container: false }
							]
						},
						{
							id: getGUID('container-'),
							type: 'verticalcontainer',
							caption: 'Translate to Japanese',
							children: [
								{ id: getGUID('field-'), type: 'xfrm_translate', caption: 'Translate Transformer', label: 'Translate', name: 'TRANSLATE_XFRM', provider: 'claude', language: 'japanese', container: false }
							]
						},
						{
							id: getGUID('container-'),
							type: 'verticalcontainer',
							caption: 'Speak Japanese',
							children: [
								{ id: getGUID('field-'), type: 'xfrm_speak', caption: 'Speak Transformer', label: 'Speak', name: 'SPEAK_XFRM', accent: 'ja-jp', container: false }
							]
						}
					]
				}
			]
		});
	}
});
