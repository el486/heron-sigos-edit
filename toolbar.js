var convert=[
			["Pt:",0,3],[" Circ:",3,5],[" Secc:",5,7],
			[" Ch:",7,11],["",11,14],[" Qt:",14,18],["",18,21],
			[" Fr:",21,25],["",25,28],[" Mz:",28,32],["",32,35],
			[" Pc:",35,39],["",39,42]
			];
				
var gridCellRenderers=[
	   {
			   featureType: 'obras_sigos_ref',
			   attrName: 'id_obra',
			   renderer: {
					   fn : function(value, metaData, record, rowIndex, colIndex, store) {
																							
							   return '<a href="javascript:void(0)" onclick="popupObras(\''+value+'\');">' + value + '</a>';
							   
					   },
					   options : {
					   }
			   }
	   },
	   {
			   featureType: 'obras_sigos_total',
			   attrName: 'id_obra',
			   renderer: {
					   fn : function(value, metaData, record, rowIndex, colIndex, store) {
																							
							   return '<a href="javascript:void(0)" onclick="popupObras(\''+value+'\');">' + value + '</a>';
							   
					   },
					   options : {
					   }
			   }
	   },
	   {
			   featureType: 'dipsoh_obras_sigos_total',
			   attrName: 'id_obra',
			   renderer: {
						fn : function(value, metaData, record, rowIndex, colIndex, store) {
																							
							   return '<a href="javascript:void(0)" onclick="popupObras(\''+value+'\');">' + value + '</a>';
							   
					   },
					   options : {
					   }
			   }
	   },
	   {
			   featureType: 'dipsoh_obras_ref',
			   attrName: 'id_obra',
			   renderer: {
						fn : function(value, metaData, record, rowIndex, colIndex, store) {
																							
							   return '<a href="javascript:void(0)" onclick="popupObras(\''+value+'\');">' + value + '</a>';
							   
					   },
					   options : {
					   }
			   }
	   },
	   {
			   featureType: 'vialidad_obras_sigos_total',
			   attrName: 'id_obra',
			   renderer: {
						fn : function(value, metaData, record, rowIndex, colIndex, store) {
																							
							   return '<a href="javascript:void(0)" onclick="popupObras(\''+value+'\');">' + value + '</a>';
							   
					   },
					   options : {
					   }
			   }
	   },
	   {
			   featureType: 'vialidad_obras_ref',
			   attrName: 'id_obra',
			   renderer: {
						fn : function(value, metaData, record, rowIndex, colIndex, store) {
																							
							   return '<a href="javascript:void(0)" onclick="popupObras(\''+value+'\');">' + value + '</a>';
							   
					   },
					   options : {
					   }
			   }
	   },
	   {
			   featureType: 'vivienda_obras_sigos_total',
			   attrName: 'id_obra',
			   renderer: {
						fn : function(value, metaData, record, rowIndex, colIndex, store) {
																							
							   return '<a href="javascript:void(0)" onclick="popupObras(\''+value+'\');">' + value + '</a>';
							   
					   },
					   options : {
					   }
			   }
	   },
	   {
			   featureType: 'vivienda_obras_ref',
			   attrName: 'id_obra',
			   renderer: {
						fn : function(value, metaData, record, rowIndex, colIndex, store) {
																							
							   return '<a href="javascript:void(0)" onclick="popupObras(\''+value+'\');">' + value + '</a>';
							   
					   },
					   options : {
					   }
			   }
	   },
	   {
			   featureType: 'dipac_obras_sigos_total',
			   attrName: 'id_obra',
			   renderer: {
						fn : function(value, metaData, record, rowIndex, colIndex, store) {
																							
							   return '<a href="javascript:void(0)" onclick="popupObras(\''+value+'\');">' + value + '</a>';
							   
					   },
					   options : {
					   }
			   }
	   },
	   {
			   featureType: 'dipac_obras_ref',
			   attrName: 'id_obra',
			   renderer: {
						fn : function(value, metaData, record, rowIndex, colIndex, store) {
																							
							   return '<a href="javascript:void(0)" onclick="popupObras(\''+value+'\');">' + value + '</a>';
							   
					   },
					   options : {
					   }
			   }
	   },
		{
		   featureType: 'parcelas_rt',
		   attrName: 'NOMENCLA',
		   renderer: {
					fn : function(value, metaData, record, rowIndex, colIndex, store) {
						var nomencla='';
						for (var i=0; i<13; i++) {
							var k=convert[i][2];
							for (var j=convert[i][1]; j<k;j++){
								if(value.substring(j,j+1)!='0'){
								nomencla+=convert[i][0]+value.substring(j,k);
								j=k;
								}
							}
						}
						return nomencla
				   },
				   options : {}
		   }
		},
		{
		   featureType: 'parcelas',
		   attrName: 'plano',
		   renderer: {
					fn : function(value, metaData, record, rowIndex, colIndex, store) {
						   return '<a href="http://www.mosp.gba.gov.ar/sistemas/geodesia/ugeodesia/Geodesia/'+value+'(PA).dwf" target="_blank">'+ value +'</a>';
				   },
				   options : {}
		   }
		},
		{
		   featureType: 'parcelas',
		   attrName: 'nomencla',
		   renderer: {
					fn : function(value, metaData, record, rowIndex, colIndex, store) {
						var nomencla='';
						for (var i=0; i<13; i++) {
							var k=convert[i][2];
							for (var j=convert[i][1]; j<k;j++){
								if(value.substring(j,j+1)!='0'){
								nomencla+=convert[i][0]+value.substring(j,k);
								j=k;
								}
							}
						}
					   return nomencla;
				   },
				   options : {}
		   }
		}
];
							
var resultPanel={
					xtype: 'hr_featurepanel',
					id: 'hr-featurepanel',
					header: false,
					border: false,
					autoConfig: true,
					showBottomToolbar:true,
					showTopToolbar:true,
					exportFormats: ['CSV','XLS',
					{
						name: 'Esri Shapefile (WGS84 EPSG:4326)',
						formatter: 'OpenLayersFormatter',
						format: 'OpenLayers.Format.GeoJSON',
						targetFormat: 'ESRI Shapefile',
						targetSrs: 'EPSG:4326',
						fileExt: '.zip',
						mimeType: 'application/zip'
					},
					{
						name: 'DXF (Campo Inchauspe faja 4 - EPSG:22194)',
						formatter: 'OpenLayersFormatter',
						format: 'OpenLayers.Format.GeoJSON',
						targetFormat: 'DXF',
						targetSrs: 'EPSG:22194',
						//sourceSrs: 'EPSG:900913',
						fileExt: '.dxf',
						mimeType: 'application/dxf'
					},
					{
						name: 'DXF (Campo Inchauspe faja 5 - EPSG:22195)',
						formatter: 'OpenLayersFormatter',
						format: 'OpenLayers.Format.GeoJSON',
						targetFormat: 'DXF',
						targetSrs: 'EPSG:22195',
						//sourceSrs: 'EPSG:900913',
						fileExt: '.dxf',
						mimeType: 'application/dxf'
					},
					{
						name: 'DXF (Campo Inchauspe faja 6 - EPSG:22196)',
						formatter: 'OpenLayersFormatter',
						format: 'OpenLayers.Format.GeoJSON',
						targetFormat: 'DXF',
						targetSrs: 'EPSG:22196',
						//sourceSrs: 'EPSG:900913',
						fileExt: '.dxf',
						mimeType: 'application/dxf'
					},
					{
						name: 'KML (Google Earth)',
						formatter: 'OpenLayersFormatter',
						format: 'OpenLayers.Format.GeoJSON',
						targetFormat: 'KML',
						targetSrs: 'EPSG:4326',
						//sourceSrs: 'EPSG:900913',
						fileExt: '.kml',
						mimeType: 'application/kml'
					}
					],
					gridCellRenderers: gridCellRenderers,
					hropts: {
						zoomOnRowDoubleClick: true,
						zoomOnFeatureSelect: false,
						zoomLevelPointSelect: 8,
						zoomToDataExtent: false
					}
				};
							
var toolBarItems=[
		{type: "featureinfo", options: {
        pressed: true,
        popupWindow: {
            width: 320,
            height: 200,
            featureInfoPanel: {
				showTopToolbar: true,
				showBottomToolbar: true,
                //displayPanels: ['Table'],
				displayPanels: ['Table','Detail'],
                //exportFormats: ['CSV', 'XLS', 'GMLv2', 'Shapefile', 'GeoJSON', 'WellKnownText'],
                hideColumns: ['objectid', 'gid'],
                maxFeatures: 10,
                autoConfigMaxSniff: 10,
				gridCellRenderers: gridCellRenderers,
                // In case that the same layer would be requested more than once: discard the styles
                discardStylesForDups: true
				}
			}
		}},
		{type: "-"},
		{type: "scale", options: {width: 110}},
		{type: "-"} ,
		{type: "pan"},
		{type: "zoomin"},
		{type: "zoomout"},
		{type: "zoomvisible"},
		{type: "-"} ,
		{type: "zoomprevious"},
		{type: "zoomnext"},
		{type: "-"},
		{type: "measurelength", options: {geodesic: true}},
		{type: "measurearea", options: {geodesic: true}},
		{type: "-"},
	{
        type: "searchcenter",
        // Options for SearchPanel window
        options: {
            show: false,
				searchWindow: {
					title: __('Multiple Searches'),
					x: 100,
					y: undefined,
					width: 360,
					height: 440,
					items: [
						{
						xtype: 'hr_multisearchcenterpanel',
						height: 600,
						hropts: [
								{
									searchPanel: {
										xtype: 'hr_formsearchpanel',
										name: 'Busqueda de Obras Sigos',
										description: 'Busqueda de Obras Sigos',
										header: false,
										border: false,
										protocol: new OpenLayers.Protocol.WFS({
											version: "1.1.0"
											,srsName: "EPSG:900913"
											,url: serverURL+"/geoserver/SigosGis/wfs"
											,featureType: "obras_sigos_ref"
											,featurePrefix: "SigosGis"
											,featureNS : "http://192.168.1.28/geoserver/SigosGis/SigosGis"
										}),
										downloadFormats: [],
										items: [
											{
												 xtype: "textfield",
												 name: "reparticion__like",
												 fieldLabel: "  Reparticion"
											},
											{
												xtype: "textfield",
												name: "nombre__like",
												//value: '',
												fieldLabel: "  Nombre"
											},
											{	
												xtype:'combo',
												fieldLabel: '  Etapa',
												name: "etapa__like",
												typeAhead: true,
												width: 125,
												triggerAction: 'all',
												lazyRender:true,
												mode: 'local',
												store: new Ext.data.ArrayStore({
													id: 0,
													fields: [
														'myId',
														'displayText'
													],
													data: [[0,''],[1, 'FINALIZACION'], [2, 'LICITACION'], [3, 'PROYECTO'], [4, 'EJECUCION'], [5, 'ADJUDICACION'], [6, 'CONTRATACION']]

												}),
												valueField: 'myId',
												displayField: 'displayText'
											},
											{
												 xtype: "textfield",
												 name: "contratista__like",
												 fieldLabel: "  Contratista"
											},
											{
												xtype: "label",
												id: "helplabel",
												html: 'Escriba algun dato para buscar<br/>',
												style: {
													fontSize: '10px',
													color: '#AAAAAA'
												}
											}
										],
										hropts: {
											onSearchCompleteZoom: 9,
											autoWildCardAttach: true,
											caseInsensitiveMatch: true,
											logicalOperator: OpenLayers.Filter.Logical.AND,
											statusPanelOpts: {
												html: '&nbsp;',
												height: 'auto',
												preventBodyReset: true,
												bodyCfg: {
													style: {
														padding: '6px',
														border: '0px'
													}
												},
												style: {
													marginTop: '2px',
													paddingTop: '2px',
													fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
													fontSize: '11px',
													color: '#0000C0'
												}
											}
										}
									},
									resultPanel: resultPanel
								},
								{
									searchPanel: {
										xtype: 'hr_formsearchpanel',
										name: 'Busqueda parcelas Arba por partido y partida',
										description: 'Busqueda de parcelas Arba por partido y partida inmobiliaria',
										header: false,
										border: false,
										protocol: new OpenLayers.Protocol.WFS({
											version: "1.1.0"
											,srsName: "EPSG:900913"
											,url: serverURL+"/geoserver/dipsoh/wfs"
											,featureType: "parcelas_vista"
											,featurePrefix: "dipsoh"
											,featureNS :  serverURL+"/geoserver/dipsoh_postgis"
										}),
										downloadFormats: [],
										items: [
											{
												xtype: "textfield",
												name: "partido",
												value: '55',
												fieldLabel: "  Partido"//,
												//listeners: { 'change': function(){      alert('you changed the text of this input field');    }  }
											},
											{
												 xtype: "textfield",
												 name: "partida",
												 fieldLabel: "  Partida"
											},
											{
												xtype: "label",
												id: "helplabel",
												html: 'Ingrese partido y partida inmobiliaria.<br/>La busqueda puede tardar 10-20 segundos. <br/>Si demora mas es posible que los datos ingresados sean incorrectos',
												style: {
													fontSize: '10px',
													color: '#AAAAAA'
												}
											}
										],
										hropts: {
											onSearchCompleteZoom: 9,
											autoWildCardAttach: true,
											caseInsensitiveMatch: true,
											logicalOperator: OpenLayers.Filter.Logical.AND,
											statusPanelOpts: {
												html: '&nbsp;',
												height: 'auto',
												preventBodyReset: true,
												bodyCfg: {
													style: {
														padding: '6px',
														border: '0px'
													}
												},
												style: {
													marginTop: '2px',
													paddingTop: '2px',
													fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
													fontSize: '11px',
													color: '#0000C0'
												}
											}
										}
									},
									resultPanel: resultPanel
								},
								{
									searchPanel: {
										xtype: 'hr_formsearchpanel',
										name: 'Busqueda de parcelas Arba por nomenclatura',
										description: 'Busqueda de parcelas Arba por nomenclatura',
										header: false,
										border: false,
										protocol: new OpenLayers.Protocol.WFS({
											version: "1.1.0"
											,srsName: "EPSG:900913"
											,url: serverURL+"/geoserver/dipsoh/wfs"
											,featureType: "parcelas"
											,featurePrefix: "dipsoh"
											,featureNS : serverURL+"/geoserver/dipsoh_postgis"
										}),
										downloadFormats: [],
										items: [
											{
												xtype: "textfield",
												name: "partido",
												value: '55',
												fieldLabel: "  Partido"
											},
											{
												xtype: "textfield",
												name: "nomencla__like",
												value: '',
												fieldLabel: "  Nom. Cat:",
												listeners: { 'change': function(e){ 
														var str=(e.getValue());    
														str=str.split(' ').join('%');
														//console.log(str);
														e.setValue(str);
														}  
													}
											},
											{
												xtype: "label",
												id: "helplabel",
												html: 'Escriba los datos de la nomenclatura en orden, separados por espacios',
												style: {
													fontSize: '10px',
													color: '#AAAAAA'
												}
											}
										],
										hropts: {
											onSearchCompleteZoom: 9,
											autoWildCardAttach: true,
											caseInsensitiveMatch: true,
											logicalOperator: OpenLayers.Filter.Logical.AND,
											statusPanelOpts: {
												html: '&nbsp;',
												height: 'auto',
												preventBodyReset: true,
												bodyCfg: {
													style: {
														padding: '6px',
														border: '0px'
													}
												},
												style: {
													marginTop: '2px',
													paddingTop: '2px',
													fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
													fontSize: '11px',
													color: '#0000C0'
												}
											}
										}
									},
									resultPanel: resultPanel
								},
								{
									searchPanel: {
										xtype: 'hr_searchbydrawpanel',
										name: __('Search by Drawing'),
										header: false
									},
									resultPanel: resultPanel
								},
								{
									searchPanel: {
										xtype: 'hr_searchbyfeaturepanel',
										name: __('Search by Feature Selection'),
										description: 'Seleccione objetos espaciales de una capa y realize una busqueda espacial basada en ellos en otra capa.',
										header: false,
										border: false,
										bodyStyle: 'padding: 6px',
										style: {
											fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
											fontSize: '12px'
										}
									},
									resultPanel: resultPanel
								},
								{
									searchPanel: {
										xtype: 'hr_gxpquerypanel',
										name: __('Build your own searches'),
										description: 'Busqueda por recuadro y por atributos',
										header: false,
										border: false,
										caseInsensitiveMatch: true,
										autoWildCardAttach: true
									},
									resultPanel: resultPanel
								},
								{
									searchPanel: {
										xtype: 'hr_formsearchpanel',
										name: 'Busqueda de Obras Vivienda por codigo',
										description: 'Busqueda de Obras Vivienda por codigo',
										header: false,
										border: false,
										protocol: new OpenLayers.Protocol.WFS({
											version: "1.1.0"
											,srsName: "EPSG:900913"
											,url: serverURL+"/geoserver/SigosGis/wfs"
											,featureType: "vivenda.obras_sigos_poly"
											,featurePrefix: "SigosGis"
											,featureNS : "http://192.168.1.28/geoserver/SigosGis/SigosGis"
										}),
										downloadFormats: [],
										items: [
											{
												xtype: "textfield",
												name: "codigo",
												//value: '',
												fieldLabel: "  Codigo"
											},
											{
												xtype: "label",
												id: "helplabel",
												html: 'Escriba algun dato para buscar<br/>',
												style: {
													fontSize: '10px',
													color: '#AAAAAA'
												}
											}
										],
										hropts: {
											onSearchCompleteZoom: 9,
											autoWildCardAttach: true,
											caseInsensitiveMatch: true,
											logicalOperator: OpenLayers.Filter.Logical.AND,
											statusPanelOpts: {
												html: '&nbsp;',
												height: 'auto',
												preventBodyReset: true,
												bodyCfg: {
													style: {
														padding: '6px',
														border: '0px'
													}
												},
												style: {
													marginTop: '2px',
													paddingTop: '2px',
													fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
													fontSize: '11px',
													color: '#0000C0'
												}
											}
										}
									},
									resultPanel: resultPanel
								}
							]
						}
					]
				}
			}
		},
		{type: "-"},
		{type: "upload", options: {
			upload: {
             layerName: __('My Upload'),
             visibleOnUpload: true,
             url: serverURL+'/cgi-bin/heron.cgi',
             params: {
                 action: 'upload',
                 mime: 'text/html',
                 encoding: 'escape'
             },
             formats: [
                 {name: 'Well-Known-Text (WKT)', fileExt: '.wkt', mimeType: 'text/plain', formatter: 'OpenLayers.Format.WKT'},
                 //{name: 'GeoJSON', fileExt: '.json', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON'},
                 {name: 'Keyhole Markup Language (KML)', fileExt: '.kml', mimeType: 'text/xml', formatter: 'OpenLayers.Format.KML'},
                 {name: 'CSV (with X,Y)', fileExt: '.csv', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON'},
                 {name: 'ESRI Shape (zip, WGS84/EPSG:4326)', fileExt: '.zip', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON'},
				 {name: 'ESRI Shape (zip, EPSG:3857, EPSG:900913 - Google)', fileExt: '.zip', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON', fileProjection: new OpenLayers.Projection('EPSG:900913')},
                 {name: 'ESRI Shape (zip, Campo Inchauspe faja 5 - EPSG:22195)', fileExt: '.zip', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON', fileProjection: new OpenLayers.Projection('EPSG:22195')}
             ],
             // For custom projections use Proj4.js
             fileProjection: new OpenLayers.Projection('EPSG:4326')
			}

		}
		},

		{type: "-"},
		{type: "oleditor", options: {
			pressed: false,
			// Options for OLEditor
			olEditorOptions: {
					activeControls: [/*'UploadFeature', */'DownloadFeature', 'Separator', 'Navigation', 'SnappingSettings', 'CADTools', 'Separator', 'DeleteAllFeatures', 'DeleteFeature', 'DragFeature', 'SelectFeature', 'Separator', 'DrawHole', 'ModifyFeature', 'Separator'],
					featureTypes: ['text', 'regular', 'polygon', 'path', 'point'],
					language: 'en',
					DownloadFeature: {
							url: serverURL+'/cgi-bin/heron.cgi',
							formats: [
									{name: 'Well-Known-Text (WKT)', fileExt: '.wkt', mimeType: 'text/plain', formatter: 'OpenLayers.Format.WKT'},
									//{name: 'GeoJSON', fileExt: '.json', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON'},
									{name: 'Keyhole Markup Language (KML)', fileExt: '.kml', mimeType: 'text/xml', formatter: 'OpenLayers.Format.KML', fileProjection: new OpenLayers.Projection('EPSG:4326')},
									//{name: 'ESRI Shapefile (zipped, WGS84)', fileExt: '.zip', mimeType: 'application/zip', formatter: 'OpenLayers.Format.GeoJSON', targetFormat: 'ESRI Shapefile', fileProjection: new OpenLayers.Projection('EPSG:4326')}
							],
							// For custom projections use Proj4.js
							fileProjection: new OpenLayers.Projection('EPSG:4326')
					}//,
					}
			}
         },
		{type: "-"},
		{type: "help", options: {tooltip: 'Ayuda', contentUrl: 'help.html'}},
		{
			// Instead of an internal "type".
			// provide a create factory function.
			// MapPanel and options (see below) are always passed
			
			create : function(mapPanel, options) {
				// A trivial handler
				options.handler = function() {
					Ext.getCmp('hr-info-west').expand(true);
					};
				// Provide an ExtJS Action object
				// If you use an OpenLayers control, you need to provide a GeoExt Action object.
				return new Ext.Action(options);
			},

			/* Options to be passed to your create function. */
			options : {
				tooltip: 'Editor',
				//iconCls: "icon-printscr",
				text: "Editor",
				enableToggle : false,
				pressed : false,
				id: "editor",
				toggleGroup: "toolGroup",
				msg: 'Editor'
			 }
			
		}
	]