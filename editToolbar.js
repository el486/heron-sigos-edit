function borrarGeom(capa,nomCodigo){
	Ext.Msg.prompt(nomCodigo, 'Ingrese '+nomCodigo+': ', function(btn, text){
	if (btn == 'ok'){
			
			var layerDelete = new OpenLayers.Layer.Vector("layerDelete", {
				projection: new OpenLayers.Projection("EPSG:900913"),
				displayInLayerSwitcher:true,
				styleMap: styleIdObras
				});
			Heron.App.map.addLayer(layerDelete);
			
			var url = 'http://192.168.1.28/geoserver/SigosGis/wms';
			var postData = '<wfs:GetFeature xmlns:wfs="http://www.opengis.net/wfs" '
			+'service="WFS" version="1.1.0" outputFormat="GML2" '
			+'xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd" '
			+'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">'
			+'<wfs:Query typeName="SigosGis:obras_sigos_total" srsName="EPSG:900913">'
			+'<ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">'
			+'<ogc:PropertyIsEqualTo><ogc:PropertyName>codigo</ogc:PropertyName><ogc:Literal>'+text+'</ogc:Literal></ogc:PropertyIsEqualTo>'
			+'</ogc:Filter>'
			+'</wfs:Query>'
			+'</wfs:GetFeature>';
			var req = new XMLHttpRequest();
			req.open("POST", url, true);
			//req.setRequestHeader('User-Agent', 'XMLHTTP/1.0');
			req.setRequestHeader('Content-type', 'application/xml');
			req.onreadystatechange = function () {
			  if (req.readyState != 4) return;
			  if (req.status != 200 && req.status != 304) {
				alert('HTTP error ' + req.status);
				return;
			  }
			  alert(req.responseText);
			var gmlReader = new OpenLayers.Format.GML({ extractAttributes: true });
			var features = gmlReader.read(req.responseText);
			layerDelete.removeFeatures(layerDelete.features);
			layerDelete.addFeatures(features);
			Heron.App.map.zoomToExtent(layerDelete.getDataExtent());
			}
			if (req.readyState == 4) return;
			req.send(postData);
			
			Ext.Msg.confirm('Alerta', 'Va a eliminar TODAS las geometrias con el '+nomCodigo+':'+text+'. Esta seguro? ', function(btn){
			if (btn == 'yes'){	
				Ext.Ajax.request({
				url: 'php/editarCapa.php',
				method: 'POST',          
				params: {
					id: text,
					geom :'',
					action:'delete',
					capa:capa,
					indice:nomCodigo					
				},
				success: function( r, o ){
					Ext.Msg.alert('Informacion','Se eliminaron '+ r.responseText +' elementos.' );
				},
				failure: function( r, o ) {
					Ext.Msg.alert( "Error: " + r.responseText );
				}
				});
			}	
			});
		}
		});
	};
	
function agregarGeom(capa,nomCodigo,geomChk){
Ext.Msg.prompt(nomCodigo, 'Ingrese '+nomCodigo+':', function(btn, text){
 if (btn == 'ok'){
	var layers = Heron.App.map.getLayersByName("Capa Agregada");
	var features = layers[0].features;
	var mensaje;
	if (features.length==0){
	Ext.Msg.alert('Error','No hay geometrias que agregar. Agregue una con la herramienta de carga.');
	}else{
		for (var feat in features) {
			if(typeof features[feat].geometry!='undefined'){
				featGeom=features[feat].geometry;
				if(featGeom.CLASS_NAME=='OpenLayers.Geometry.Collection'){
					for (var feat2 in featGeom.components){
					if(featGeom.components[feat2].CLASS_NAME=='OpenLayers.Geometry.'+geomChk){	
						var vector=new OpenLayers.Feature.Vector(featGeom.components[feat2],null,null);
						var geom= new OpenLayers.Format.WKT().write(vector);
						geom=geom.replace("POLYGON((","MULTIPOLYGON(((");
						geom=geom.replace("))",")))");
						console.log(geom);
							Ext.Ajax.request({
								url: 'php/editarCapa.php',
								method: 'POST',          
								params: {
									id: text,
									geom :geom,
									action:'add',
									capa:capa,
									indice:nomCodigo,
									tipogeom:geomChk
								},
								success: function( r, o ){
									var cadena=r.responseText;
									Ext.Msg.alert ('Informacion','Comunicacion exitosa.<br> Mensaje del servidor: '+cadena);
									console.log(+ r.responseText);
								},
								failure: function( r, o ) {
									Ext.Msg.alert( "Fallo la conexion: " + r.responseText );
								}
							});
						}
					}
				}else{
					var geom= new OpenLayers.Format.WKT().write(features[feat]);
					geom=geom.replace("POLYGON((","MULTIPOLYGON(((");
					geom=geom.replace("))",")))");
					console.log(geom);
					Ext.Ajax.request({
						url: 'php/editarCapa.php',
						method: 'POST',          
						params: {
							id: text,
							geom :geom,
							action:'add',
							capa:capa,
							indice:nomCodigo,
							tipogeom:geomChk
						},
						success: function( r, o ){
							var cadena=r.responseText;
							Ext.Msg.alert ('Informacion','Comunicacion exitosa.<br> Mensaje del servidor: '+cadena);
							console.log(+ r.responseText);
						},
						failure: function( r, o ) {
							Ext.Msg.alert( "Fallo la conexion: " + r.responseText );
						}
					});
				}								
			}
		}																
	}
  }
 });
};

var editToolbar=[{
	xtype:'fieldset',
	title: 'Capa Arquitectura (poligonos)',
	autoHeight:true,
	items :[{
		xtype:'toolbar',
		buttonAlign:'center',
		items:[{
				text: 'Agregar',
				handler: function(){
					agregarGeom('arquitectura.obras_sigos_poly3','expediente','Polygon');
					}
			},{
				text:'Borrar',
				handler: function(){
					borrarGeom('arquitectura.obras_sigos_poly3','expediente');											
					}
			}]
		}]
},
{
	xtype:'fieldset',
	title: 'Capa Vivienda (poligonos)',
	autoHeight:true,
	items :[{
		xtype:'toolbar',
		buttonAlign:'center',
		items:[{
				text: 'Agregar',
				handler: function(){
					agregarGeom('vivienda.obras_sigos_poly','cod_obra','Polygon');
					}
			},{
				text:'Borrar',
				handler: function(){
					borrarGeom('vivienda.obras_sigos_poly','cod_obra');											
					}
			}]
		}]
},
{
	xtype:'fieldset',
	title: 'Capa Dipac Agua (poligonos)',
	autoHeight:true,
	items :[{
		xtype:'toolbar',
		buttonAlign:'center',
		items:[{
				text: 'Agregar',
				handler: function(){
					agregarGeom('dipac.obras_sigos_poly_a','cod_sigos','Polygon');
					}
			},{
				text:'Borrar',
				handler: function(){
					borrarGeom('dipac.obras_sigos_poly_a','cod_sigos');											
					}
			}]
		}]
},
{
	xtype:'fieldset',
	title: 'Capa Dipac Cloacas (poligonos)',
	autoHeight:true,
	items :[{
		xtype:'toolbar',
		buttonAlign:'center',
		items:[{
				text: 'Agregar',
				handler: function(){
					agregarGeom('dipac.obras_sigos_poly_c','cod_sigos','Polygon');
					}
			},{
				text:'Borrar',
				handler: function(){
					borrarGeom('dipac.obras_sigos_poly_c','cod_sigos');											
					}
			}]
		}]
}];
					