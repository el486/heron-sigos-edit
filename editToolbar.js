function borrarGeom(capa,nomCodigo){
	Ext.Msg.prompt(nomCodigo, 'Ingrese '+nomCodigo+': ', function(btn, text){
	if (btn == 'ok'){
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
					