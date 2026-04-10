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
		var objFormCarrier = [{"id":"section-carrier-header","caption":"Form Header","containers":[{"id":"container-carrier-header","type":"verticalcontainer","caption":"Form Header Container","name":"FORMHEADER","label":"Form Header","children":[{"id":"field-carrier-entity","type":"textbox","caption":"Entity Name","label":"Entity Name","name":"ENTITYNAME","value":"Carrier","container":false},{"id":"field-carrier-formver","type":"number","caption":"Form Version","label":"Form Version","name":"FORMVERSION","value":"1","container":false}]}]},{"id":"section-carrier-data","caption":"Form Data","containers":[{"id":"container-carrier-info","type":"verticalcontainer","caption":"Carrier Information","name":"CARRIERINFO","label":"Carrier Information","children":[{"id":"field-carrier-code","type":"textbox","caption":"Carrier Code","label":"Carrier Code","name":"CARRIERCODE","required":"yes","container":false},{"id":"field-carrier-name","type":"textbox","caption":"Carrier Name","label":"Carrier Name","name":"CARRIERNAME","required":"yes","container":false},{"id":"field-carrier-abn","type":"textbox","caption":"ABN","label":"ABN","name":"ABN","container":false},{"id":"field-carrier-acn","type":"textbox","caption":"ACN","label":"ACN","name":"ACN","container":false},{"id":"field-carrier-email","type":"textbox","caption":"Email","label":"Email","name":"EMAIL","container":false},{"id":"field-carrier-phone","type":"textbox","caption":"Phone","label":"Phone","name":"PHONE","container":false},{"id":"field-carrier-mobile","type":"textbox","caption":"Mobile","label":"Mobile","name":"MOBILE","container":false},{"id":"field-carrier-website","type":"url","caption":"Website","label":"Website","name":"WEBSITE","container":false},{"id":"field-carrier-enabled","type":"checkbox","caption":"Is Enabled?","label":"Is Enabled?","name":"ISENABLED","value":"yes","container":false}]}]},{"id":"section-carrier-address","caption":"Carrier Address","containers":[{"id":"container-carrier-address","type":"verticalcontainer","caption":"Address Details","name":"CARRIERADDRESS","label":"Address","children":[{"id":"field-carrier-addr1","type":"textbox","caption":"Address Line 1","label":"Address Line 1","name":"ADDRESSLINE1","container":false},{"id":"field-carrier-addr2","type":"textbox","caption":"Address Line 2","label":"Address Line 2","name":"ADDRESSLINE2","container":false},{"id":"field-carrier-suburb","type":"textbox","caption":"Suburb","label":"Suburb","name":"SUBURB","container":false},{"id":"field-carrier-state","type":"list","caption":"State","label":"State","name":"STATE","options":[{"value":"NSW","code":"NSW","description":"New South Wales"},{"value":"VIC","code":"VIC","description":"Victoria"},{"value":"QLD","code":"QLD","description":"Queensland"},{"value":"SA","code":"SA","description":"South Australia"},{"value":"WA","code":"WA","description":"Western Australia"},{"value":"TAS","code":"TAS","description":"Tasmania"},{"value":"NT","code":"NT","description":"Northern Territory"},{"value":"ACT","code":"ACT","description":"Australian Capital Territory"}],"container":false},{"id":"field-carrier-postcode","type":"textbox","caption":"Postcode","label":"Postcode","name":"POSTCODE","length":"4","container":false},{"id":"field-carrier-country","type":"textbox","caption":"Country","label":"Country","name":"COUNTRY","value":"Australia","container":false}]}]}];
		var objFormService = [{"id":"section-service-header","caption":"Form Header","containers":[{"id":"container-service-header","type":"verticalcontainer","caption":"Form Header Container","name":"FORMHEADER","label":"Form Header","children":[{"id":"field-service-entity","type":"textbox","caption":"Entity Name","label":"Entity Name","name":"ENTITYNAME","value":"Service","container":false},{"id":"field-service-formver","type":"number","caption":"Form Version","label":"Form Version","name":"FORMVERSION","value":"1","container":false}]}]},{"id":"section-service-data","caption":"Form Data","containers":[{"id":"container-service-info","type":"verticalcontainer","caption":"Service Information","name":"SERVICEINFO","label":"Service Information","children":[{"id":"field-service-carrier","type":"list","caption":"Carrier","label":"Carrier","name":"CARRIERCODE","required":"yes","datasource":"Carriers","datafilter":"ISENABLED=yes","datafields":"CARRIERCODE,CARRIERNAME","container":false},{"id":"field-service-code","type":"textbox","caption":"Service Code","label":"Service Code","name":"SERVICECODE","required":"yes","container":false},{"id":"field-service-name","type":"textbox","caption":"Service Name","label":"Service Name","name":"SERVICENAME","required":"yes","container":false},{"id":"field-service-type","type":"list","caption":"Service Type","label":"Service Type","name":"SERVICETYPE","options":[{"value":"EXPRESS","code":"EXPRESS","description":"Express"},{"value":"STANDARD","code":"STANDARD","description":"Standard"},{"value":"ECONOMY","code":"ECONOMY","description":"Economy"},{"value":"OVERNIGHT","code":"OVERNIGHT","description":"Overnight"},{"value":"SAMEDAY","code":"SAMEDAY","description":"Same Day"}],"container":false},{"id":"field-service-transitdays","type":"number","caption":"Transit Days","label":"Transit Days","name":"TRANSITDAYS","container":false},{"id":"field-service-maxweight","type":"number","caption":"Max Weight (kg)","label":"Max Weight (kg)","name":"MAXWEIGHT","container":false},{"id":"field-service-enabled","type":"checkbox","caption":"Is Enabled?","label":"Is Enabled?","name":"ISENABLED","value":"yes","container":false}]}]}];
		var objFormSender = [{"id":"section-sender-header","caption":"Form Header","containers":[{"id":"container-sender-header","type":"verticalcontainer","caption":"Form Header Container","name":"FORMHEADER","label":"Form Header","children":[{"id":"field-sender-entity","type":"textbox","caption":"Entity Name","label":"Entity Name","name":"ENTITYNAME","value":"Sender","container":false},{"id":"field-sender-formver","type":"number","caption":"Form Version","label":"Form Version","name":"FORMVERSION","value":"1","container":false}]}]},{"id":"section-sender-data","caption":"Form Data","containers":[{"id":"container-sender-info","type":"verticalcontainer","caption":"Sender Information","name":"SENDERINFO","label":"Sender Information","children":[{"id":"field-sender-code","type":"textbox","caption":"Sender Code","label":"Sender Code","name":"SENDERCODE","required":"yes","container":false},{"id":"field-sender-name","type":"textbox","caption":"Sender Name","label":"Sender Name","name":"SENDERNAME","required":"yes","container":false},{"id":"field-sender-company","type":"textbox","caption":"Company Name","label":"Company Name","name":"COMPANYNAME","container":false},{"id":"field-sender-abn","type":"textbox","caption":"ABN","label":"ABN","name":"ABN","container":false},{"id":"field-sender-email","type":"textbox","caption":"Email","label":"Email","name":"EMAIL","required":"yes","container":false},{"id":"field-sender-phone","type":"textbox","caption":"Phone","label":"Phone","name":"PHONE","required":"yes","container":false},{"id":"field-sender-mobile","type":"textbox","caption":"Mobile","label":"Mobile","name":"MOBILE","container":false},{"id":"field-sender-enabled","type":"checkbox","caption":"Is Enabled?","label":"Is Enabled?","name":"ISENABLED","value":"yes","container":false}]}]},{"id":"section-sender-address","caption":"Sender Address","containers":[{"id":"container-sender-address","type":"verticalcontainer","caption":"Address Details","name":"SENDERADDRESS","label":"Address","children":[{"id":"field-sender-addr1","type":"textbox","caption":"Address Line 1","label":"Address Line 1","name":"ADDRESSLINE1","required":"yes","container":false},{"id":"field-sender-addr2","type":"textbox","caption":"Address Line 2","label":"Address Line 2","name":"ADDRESSLINE2","container":false},{"id":"field-sender-suburb","type":"textbox","caption":"Suburb","label":"Suburb","name":"SUBURB","required":"yes","container":false},{"id":"field-sender-state","type":"list","caption":"State","label":"State","name":"STATE","required":"yes","options":[{"value":"NSW","code":"NSW","description":"New South Wales"},{"value":"VIC","code":"VIC","description":"Victoria"},{"value":"QLD","code":"QLD","description":"Queensland"},{"value":"SA","code":"SA","description":"South Australia"},{"value":"WA","code":"WA","description":"Western Australia"},{"value":"TAS","code":"TAS","description":"Tasmania"},{"value":"NT","code":"NT","description":"Northern Territory"},{"value":"ACT","code":"ACT","description":"Australian Capital Territory"}],"container":false},{"id":"field-sender-postcode","type":"textbox","caption":"Postcode","label":"Postcode","name":"POSTCODE","length":"4","required":"yes","container":false},{"id":"field-sender-country","type":"textbox","caption":"Country","label":"Country","name":"COUNTRY","value":"Australia","container":false}]}]}];
		var objFormReceiver = [{"id":"section-receiver-header","caption":"Form Header","containers":[{"id":"container-receiver-header","type":"verticalcontainer","caption":"Form Header Container","name":"FORMHEADER","label":"Form Header","children":[{"id":"field-receiver-entity","type":"textbox","caption":"Entity Name","label":"Entity Name","name":"ENTITYNAME","value":"Receiver","container":false},{"id":"field-receiver-formver","type":"number","caption":"Form Version","label":"Form Version","name":"FORMVERSION","value":"1","container":false}]}]},{"id":"section-receiver-data","caption":"Form Data","containers":[{"id":"container-receiver-info","type":"verticalcontainer","caption":"Receiver Information","name":"RECEIVERINFO","label":"Receiver Information","children":[{"id":"field-receiver-code","type":"textbox","caption":"Receiver Code","label":"Receiver Code","name":"RECEIVERCODE","required":"yes","container":false},{"id":"field-receiver-name","type":"textbox","caption":"Receiver Name","label":"Receiver Name","name":"RECEIVERNAME","required":"yes","container":false},{"id":"field-receiver-company","type":"textbox","caption":"Company Name","label":"Company Name","name":"COMPANYNAME","container":false},{"id":"field-receiver-abn","type":"textbox","caption":"ABN","label":"ABN","name":"ABN","container":false},{"id":"field-receiver-email","type":"textbox","caption":"Email","label":"Email","name":"EMAIL","required":"yes","container":false},{"id":"field-receiver-phone","type":"textbox","caption":"Phone","label":"Phone","name":"PHONE","required":"yes","container":false},{"id":"field-receiver-mobile","type":"textbox","caption":"Mobile","label":"Mobile","name":"MOBILE","container":false},{"id":"field-receiver-enabled","type":"checkbox","caption":"Is Enabled?","label":"Is Enabled?","name":"ISENABLED","value":"yes","container":false}]}]},{"id":"section-receiver-address","caption":"Receiver Address","containers":[{"id":"container-receiver-address","type":"verticalcontainer","caption":"Address Details","name":"RECEIVERADDRESS","label":"Address","children":[{"id":"field-receiver-addr1","type":"textbox","caption":"Address Line 1","label":"Address Line 1","name":"ADDRESSLINE1","required":"yes","container":false},{"id":"field-receiver-addr2","type":"textbox","caption":"Address Line 2","label":"Address Line 2","name":"ADDRESSLINE2","container":false},{"id":"field-receiver-suburb","type":"textbox","caption":"Suburb","label":"Suburb","name":"SUBURB","required":"yes","container":false},{"id":"field-receiver-state","type":"list","caption":"State","label":"State","name":"STATE","required":"yes","options":[{"value":"NSW","code":"NSW","description":"New South Wales"},{"value":"VIC","code":"VIC","description":"Victoria"},{"value":"QLD","code":"QLD","description":"Queensland"},{"value":"SA","code":"SA","description":"South Australia"},{"value":"WA","code":"WA","description":"Western Australia"},{"value":"TAS","code":"TAS","description":"Tasmania"},{"value":"NT","code":"NT","description":"Northern Territory"},{"value":"ACT","code":"ACT","description":"Australian Capital Territory"}],"container":false},{"id":"field-receiver-postcode","type":"textbox","caption":"Postcode","label":"Postcode","name":"POSTCODE","length":"4","required":"yes","container":false},{"id":"field-receiver-country","type":"textbox","caption":"Country","label":"Country","name":"COUNTRY","value":"Australia","container":false},{"id":"field-receiver-instructions","type":"multilinetextbox","caption":"Delivery Instructions","label":"Delivery Instructions","name":"DELIVERYINSTRUCTIONS","container":false}]}]}];
		var objFormThirdParty = [{"id":"section-thirdparty-header","caption":"Form Header","containers":[{"id":"container-thirdparty-header","type":"verticalcontainer","caption":"Form Header Container","name":"FORMHEADER","label":"Form Header","children":[{"id":"field-thirdparty-entity","type":"textbox","caption":"Entity Name","label":"Entity Name","name":"ENTITYNAME","value":"ThirdPartyPayer","container":false},{"id":"field-thirdparty-formver","type":"number","caption":"Form Version","label":"Form Version","name":"FORMVERSION","value":"1","container":false}]}]},{"id":"section-thirdparty-data","caption":"Form Data","containers":[{"id":"container-thirdparty-info","type":"verticalcontainer","caption":"Third Party Payer Information","name":"THIRDPARTYINFO","label":"Payer Information","children":[{"id":"field-thirdparty-code","type":"textbox","caption":"Payer Code","label":"Payer Code","name":"PAYERCODE","required":"yes","container":false},{"id":"field-thirdparty-name","type":"textbox","caption":"Payer Name","label":"Payer Name","name":"PAYERNAME","required":"yes","container":false},{"id":"field-thirdparty-company","type":"textbox","caption":"Company Name","label":"Company Name","name":"COMPANYNAME","container":false},{"id":"field-thirdparty-abn","type":"textbox","caption":"ABN","label":"ABN","name":"ABN","container":false},{"id":"field-thirdparty-acn","type":"textbox","caption":"ACN","label":"ACN","name":"ACN","container":false},{"id":"field-thirdparty-email","type":"textbox","caption":"Email","label":"Email","name":"EMAIL","required":"yes","container":false},{"id":"field-thirdparty-phone","type":"textbox","caption":"Phone","label":"Phone","name":"PHONE","required":"yes","container":false},{"id":"field-thirdparty-accountnum","type":"textbox","caption":"Account Number","label":"Account Number","name":"ACCOUNTNUMBER","container":false},{"id":"field-thirdparty-creditlimit","type":"number","caption":"Credit Limit","label":"Credit Limit","name":"CREDITLIMIT","container":false},{"id":"field-thirdparty-enabled","type":"checkbox","caption":"Is Enabled?","label":"Is Enabled?","name":"ISENABLED","value":"yes","container":false}]}]},{"id":"section-thirdparty-address","caption":"Billing Address","containers":[{"id":"container-thirdparty-address","type":"verticalcontainer","caption":"Address Details","name":"PAYERADDRESS","label":"Billing Address","children":[{"id":"field-thirdparty-addr1","type":"textbox","caption":"Address Line 1","label":"Address Line 1","name":"ADDRESSLINE1","required":"yes","container":false},{"id":"field-thirdparty-addr2","type":"textbox","caption":"Address Line 2","label":"Address Line 2","name":"ADDRESSLINE2","container":false},{"id":"field-thirdparty-suburb","type":"textbox","caption":"Suburb","label":"Suburb","name":"SUBURB","required":"yes","container":false},{"id":"field-thirdparty-state","type":"list","caption":"State","label":"State","name":"STATE","required":"yes","options":[{"value":"NSW","code":"NSW","description":"New South Wales"},{"value":"VIC","code":"VIC","description":"Victoria"},{"value":"QLD","code":"QLD","description":"Queensland"},{"value":"SA","code":"SA","description":"South Australia"},{"value":"WA","code":"WA","description":"Western Australia"},{"value":"TAS","code":"TAS","description":"Tasmania"},{"value":"NT","code":"NT","description":"Northern Territory"},{"value":"ACT","code":"ACT","description":"Australian Capital Territory"}],"container":false},{"id":"field-thirdparty-postcode","type":"textbox","caption":"Postcode","label":"Postcode","name":"POSTCODE","length":"4","required":"yes","container":false},{"id":"field-thirdparty-country","type":"textbox","caption":"Country","label":"Country","name":"COUNTRY","value":"Australia","container":false}]}]}];
		var objFormConnote = [{"id":"section-connote-header","caption":"Form Header","containers":[{"id":"container-connote-header","type":"verticalcontainer","caption":"Form Header Container","name":"FORMHEADER","label":"Form Header","children":[{"id":"field-connote-entity","type":"textbox","caption":"Entity Name","label":"Entity Name","name":"ENTITYNAME","value":"Connote","container":false},{"id":"field-connote-formver","type":"number","caption":"Form Version","label":"Form Version","name":"FORMVERSION","value":"1","container":false}]}]},{"id":"section-connote-basic","caption":"Connote Details","containers":[{"id":"container-connote-basic","type":"verticalcontainer","caption":"Basic Information","name":"CONNOTEBASIC","label":"Connote Information","children":[{"id":"field-connote-number","type":"textbox","caption":"Connote Number","label":"Connote Number","name":"CONNOTENUMBER","required":"yes","readonly":"yes","container":false},{"id":"field-connote-date","type":"date","caption":"Connote Date","label":"Connote Date","name":"CONNOTEDATE","required":"yes","container":false},{"id":"field-connote-customerref","type":"textbox","caption":"Customer Reference","label":"Customer Reference","name":"CUSTOMERREFERENCE","container":false},{"id":"field-connote-carrier","type":"list","caption":"Carrier","label":"Carrier","name":"CARRIERCODE","required":"yes","datasource":"Carriers","datafilter":"ISENABLED=yes","container":false},{"id":"field-connote-service","type":"list","caption":"Service","label":"Service","name":"SERVICECODE","required":"yes","datasource":"Services","datafilter":"CARRIERCODE={CARRIERCODE} AND ISENABLED=yes","container":false}]}]},{"id":"section-connote-parties","caption":"Parties","containers":[{"id":"container-connote-parties","type":"horizontalcontainer","caption":"Sender and Receiver","name":"CONNOTEPARTIES","children":[{"id":"container-connote-sender","type":"verticalcontainer","caption":"Sender","name":"CONNOTESENDER","children":[{"id":"field-connote-sendercode","type":"list","caption":"Sender","label":"Sender","name":"SENDERCODE","required":"yes","datasource":"Senders","datafilter":"ISENABLED=yes","container":false}]},{"id":"container-connote-receiver","type":"verticalcontainer","caption":"Receiver","name":"CONNOTERECEIVER","children":[{"id":"field-connote-receivercode","type":"list","caption":"Receiver","label":"Receiver","name":"RECEIVERCODE","required":"yes","datasource":"Receivers","datafilter":"ISENABLED=yes","container":false}]}]}]},{"id":"section-connote-payment","caption":"Payment Details","containers":[{"id":"container-connote-payment","type":"verticalcontainer","caption":"Payment Information","name":"CONNOTEPAYMENT","label":"Payment","children":[{"id":"field-connote-paymenttype","type":"list","caption":"Payment Type","label":"Payment Type","name":"PAYMENTTYPE","required":"yes","options":[{"value":"SENDER","code":"SENDER","description":"Sender Pays"},{"value":"RECEIVER","code":"RECEIVER","description":"Receiver Pays"},{"value":"THIRDPARTY","code":"THIRDPARTY","description":"Third Party Pays"}],"container":false},{"id":"field-connote-thirdparty","type":"list","caption":"Third Party Payer","label":"Third Party Payer","name":"THIRDPARTYCODE","datasource":"ThirdPartyPayers","datafilter":"ISENABLED=yes","container":false},{"id":"field-connote-freightcharge","type":"number","caption":"Freight Charge","label":"Freight Charge","name":"FREIGHTCHARGE","container":false},{"id":"field-connote-fuellevy","type":"number","caption":"Fuel Levy","label":"Fuel Levy","name":"FUELLEVY","container":false},{"id":"field-connote-totalcharge","type":"number","caption":"Total Charge","label":"Total Charge","name":"TOTALCHARGE","readonly":"yes","container":false}]}]},{"id":"section-connote-items","caption":"Items","containers":[{"id":"container-connote-items","type":"verticalcontainer","caption":"Item Details","name":"CONNOTEITEMS","label":"Items","children":[{"id":"field-connote-pieces","type":"number","caption":"Number of Pieces","label":"Number of Pieces","name":"NUMBEROFPIECES","required":"yes","container":false},{"id":"field-connote-weight","type":"number","caption":"Total Weight (kg)","label":"Total Weight (kg)","name":"TOTALWEIGHT","required":"yes","container":false},{"id":"field-connote-volume","type":"number","caption":"Total Volume (m³)","label":"Total Volume (m³)","name":"TOTALVOLUME","container":false},{"id":"field-connote-description","type":"multilinetextbox","caption":"Item Description","label":"Item Description","name":"ITEMDESCRIPTION","required":"yes","container":false},{"id":"field-connote-dangerous","type":"checkbox","caption":"Dangerous Goods?","label":"Dangerous Goods?","name":"ISDANGEROUS","container":false},{"id":"field-connote-specialinst","type":"multilinetextbox","caption":"Special Instructions","label":"Special Instructions","name":"SPECIALINSTRUCTIONS","container":false}]}]},{"id":"section-connote-status","caption":"Status","containers":[{"id":"container-connote-status","type":"verticalcontainer","caption":"Status Information","name":"CONNOTESTATUS","label":"Status","children":[{"id":"field-connote-status","type":"list","caption":"Status","label":"Status","name":"STATUS","required":"yes","value":"CREATED","options":[{"value":"CREATED","code":"CREATED","description":"Created"},{"value":"BOOKED","code":"BOOKED","description":"Booked"},{"id":"PICKEDUP","code":"PICKEDUP","description":"Picked Up"},{"value":"INTRANSIT","code":"INTRANSIT","description":"In Transit"},{"value":"DELIVERED","code":"DELIVERED","description":"Delivered"},{"value":"CANCELLED","code":"CANCELLED","description":"Cancelled"}],"container":false}]}]}];
		var objFormTracking = [{"id":"section-tracking-header","caption":"Form Header","containers":[{"id":"container-tracking-header","type":"verticalcontainer","caption":"Form Header Container","name":"FORMHEADER","label":"Form Header","children":[{"id":"field-tracking-entity","type":"textbox","caption":"Entity Name","label":"Entity Name","name":"ENTITYNAME","value":"Tracking","container":false},{"id":"field-tracking-formver","type":"number","caption":"Form Version","label":"Form Version","name":"FORMVERSION","value":"1","container":false}]}]},{"id":"section-tracking-data","caption":"Tracking Information","containers":[{"id":"container-tracking-basic","type":"verticalcontainer","caption":"Basic Information","name":"TRACKINGBASIC","label":"Tracking Details","children":[{"id":"field-tracking-id","type":"textbox","caption":"Tracking ID","label":"Tracking ID","name":"TRACKINGID","required":"yes","readonly":"yes","container":false},{"id":"field-tracking-connote","type":"textbox","caption":"Connote Number","label":"Connote Number","name":"CONNOTENUMBER","required":"yes","container":false},{"id":"field-tracking-datetime","type":"date","caption":"Date/Time","label":"Date/Time","name":"TRACKINGDATETIME","required":"yes","container":false},{"id":"field-tracking-status","type":"list","caption":"Status","label":"Status","name":"TRACKINGSTATUS","required":"yes","options":[{"value":"BOOKED","code":"BOOKED","description":"Booked"},{"value":"PICKEDUP","code":"PICKEDUP","description":"Picked Up"},{"value":"DEPOT_ARRIVAL","code":"DEPOT_ARRIVAL","description":"Depot Arrival"},{"value":"DEPOT_DEPARTURE","code":"DEPOT_DEPARTURE","description":"Depot Departure"},{"value":"IN_TRANSIT","code":"IN_TRANSIT","description":"In Transit"},{"value":"OUT_FOR_DELIVERY","code":"OUT_FOR_DELIVERY","description":"Out for Delivery"},{"value":"DELIVERED","code":"DELIVERED","description":"Delivered"},{"value":"ATTEMPTED","code":"ATTEMPTED","description":"Delivery Attempted"},{"value":"EXCEPTION","code":"EXCEPTION","description":"Exception"},{"value":"RETURNED","code":"RETURNED","description":"Returned to Sender"}],"container":false},{"id":"field-tracking-location","type":"textbox","caption":"Location","label":"Location","name":"LOCATION","container":false},{"id":"field-tracking-facility","type":"textbox","caption":"Facility","label":"Facility","name":"FACILITY","container":false},{"id":"field-tracking-notes","type":"multilinetextbox","caption":"Notes","label":"Notes","name":"TRACKINGNOTES","container":false},{"id":"field-tracking-signature","type":"textbox","caption":"Signature Name","label":"Signature Name","name":"SIGNATURENAME","container":false},{"id":"field-tracking-gps","type":"gps","caption":"GPS Coordinates","label":"GPS Coordinates","name":"GPSCOORDINATES","container":false}]}]}];
		var objFormBooking = [{"id":"section-form-header","caption":"Form Header","containers":[{"id":"container-form-header","type":"verticalcontainer","caption":"Form Header Container","name":"FORMHEADER","label":"Form Header","children":[{"id":"field-entity-name","type":"textbox","caption":"Entity Name","label":"Entity Name","name":"ENTITYNAME","value":"Software Agency","container":false},{"id":"field-form-version","type":"number","caption":"Form Version","label":"Form Version","name":"FORMVERSION","value":"1","container":false}]}]},{"id":"section-agency-info","caption":"Agency Information","containers":[{"id":"container-agency-info","type":"verticalcontainer","caption":"Agency Information Container","name":"AGENCYINFO","label":"Agency Information","children":[{"id":"field-agency-name","type":"textbox","caption":"Agency Name","label":"Agency Name","name":"AGENCYNAME","required":"yes","container":false},{"id":"field-agency-abn","type":"textbox","caption":"ABN","label":"ABN","name":"ABN","container":false},{"id":"field-agency-acn","type":"textbox","caption":"ACN","label":"ACN","name":"ACN","container":false},{"id":"field-agency-email","type":"textbox","caption":"Email","label":"Email","name":"EMAIL","container":false},{"id":"field-agency-phone","type":"textbox","caption":"Phone","label":"Phone","name":"PHONE","container":false},{"id":"field-agency-mobile","type":"textbox","caption":"Mobile","label":"Mobile","name":"MOBILE","container":false},{"id":"field-agency-website","type":"url","caption":"Website","label":"Website","name":"WEBSITE","container":false}]}]},{"id":"section-project-details","caption":"Project Details","containers":[{"id":"container-project-details","type":"verticalcontainer","caption":"Project Details Container","name":"PROJECTDETAILS","label":"Project Details","children":[{"id":"field-project-name","type":"textbox","caption":"Project Name","label":"Project Name","name":"PROJECTNAME","required":"yes","container":false},{"id":"field-project-description","type":"multilinetextbox","caption":"Project Description","label":"Project Description","name":"PROJECTDESCRIPTION","container":false},{"id":"field-start-date","type":"date","caption":"Start Date","label":"Start Date","name":"STARTDATE","container":false},{"id":"field-end-date","type":"date","caption":"End Date","label":"End Date","name":"ENDDATE","container":false},{"id":"field-project-manager","type":"textbox","caption":"Project Manager","label":"Project Manager","name":"PROJECTMANAGER","container":false}]}]},{"id":"section-client-info","caption":"Client Information","containers":[{"id":"container-client-info","type":"verticalcontainer","caption":"Client Information Container","name":"CLIENTINFO","label":"Client Information","children":[{"id":"field-client-name","type":"textbox","caption":"Client Name","label":"Client Name","name":"CLIENTNAME","required":"yes","container":false},{"id":"field-client-email","type":"textbox","caption":"Client Email","label":"Client Email","name":"CLIENTEMAIL","container":false},{"id":"field-client-phone","type":"textbox","caption":"Client Phone","label":"Client Phone","name":"CLIENTPHONE","container":false}]}]},{"id":"section-additional-details","caption":"Additional Details","containers":[{"id":"container-additional-details","type":"verticalcontainer","caption":"Additional Details Container","name":"ADDITIONALDETAILS","label":"Additional Details","children":[{"id":"field-additional-requirements","type":"multilinetextbox","caption":"Additional Requirements","label":"Additional Requirements","name":"ADDITIONALREQUIREMENTS","container":false}]}]},{"id":"section-form-actions","caption":"Form Actions","containers":[{"id":"container-form-actions","type":"horizontalcontainer","caption":"Form Actions Container","name":"FORMACTIONS","label":"Form Actions","children":[{"id":"field-submit","type":"button","caption":"Submit","label":"Submit","name":"SUBMIT","container":false}]}]}];

		// OTHER FORMS:
		// Depot/Warehouse Form - To track facilities, their locations, operating hours, and capacity
		// Vehicle Form - For managing delivery vehicles, drivers, registration, capacity
		// Driver Form - Driver details, licenses, contact information
		// Route Form - Pre-defined routes between locations with estimated times
		// Manifest Form - Consolidation of multiple connotes for a single run/vehicle
		// POD (Proof of Delivery) Form - Capture signature, photo, delivery time
		// Invoice Form - Billing details linked to connotes
		// Rate Card Form - Pricing rules based on weight, distance, service type
		// Customer Account Form - Customer master data with credit terms
		// Dangerous Goods Declaration Form - Specific fields for hazardous materials
		// Pickup Request Form - Schedule pickup from sender
		// Claims Form - For damaged/lost goods claims
		// Returns/Reverse Logistics Form - For handling returns
		// Zone/Postcode Mapping Form - Geographic service area definitions
		// Holiday/Blackout Dates Form - Non-service dates
		
		
		var objForm = objFormBooking;
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
