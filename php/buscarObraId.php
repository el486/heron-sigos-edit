<?php
/* importa el archivo de configuracion */
$id=$_GET['id']; //php para capturar el parámetro pasado por URL
$id2=explode('-',$id);
include('actualiza_datos_sigos.php');
?>

<script>
var layerTrazas
filters=[
<? foreach ($id2 as $idobra) { ?>
	new OpenLayers.Filter.Comparison({
		type: OpenLayers.Filter.Comparison.EQUAL_TO,
		property: "id_obra",
		value: '<?php echo $idobra ?>'
	}),
<? } ?>
	new OpenLayers.Filter.Comparison({
		type: OpenLayers.Filter.Comparison.EQUAL_TO,
		property: "id_obra",
		value: '99999'
	})
];

layerwfs = new OpenLayers.Layer.Vector("Obras Seleccionadas",{

								strategies: [new OpenLayers.Strategy.Fixed()]
								,projection: new OpenLayers.Projection("EPSG:900913")
								,styleMap:styleIdObras
								,protocol: new OpenLayers.Protocol.WFS({
									version: "1.1.0"
									,srsName: "EPSG:900913"
									,url: "http://192.168.1.28/geoserver/SigosGis/wfs"
									,featureNS :  "http://192.168.1.28/geoserver/SigosGis/SigosGis"
									,featureType: "obras_sigos_ref"
									,featurePrefix: "sigosgis"
									,geometryName: "the_geom"
									,schema: "http://192.168.1.28/geoserver/SigosGis/wfs/DescribeFeatureType?typename=sigosgis.public:obras_sigos_ref"
									,filter: new OpenLayers.Filter.Logical({
										type: OpenLayers.Filter.Logical.OR,
										filters:filters
									})
								})
							});

layerTrazas = new OpenLayers.Layer.Vector("layerTrazas", {
	projection: new OpenLayers.Projection("EPSG:900913"),
	displayInLayerSwitcher:false,
	styleMap: styleIdObras
});

Heron.App.map.addLayer(layerwfs);
Heron.App.map.addLayer(layerTrazas);
		

var selectCtrl = new OpenLayers.Control.SelectFeature(layerwfs);
var popup
    // define "createPopup" function
    function createPopup(feature) {
        popup = new GeoExt.Popup({
            title: 'Informacion',
            location: feature,
            width:300,
			//anchored: true,
			unpinned:true,
			anchorPosition: 'auto',
            html: "<div style='font-size:.9em'>ID Obra: " + feature.attributes.id_obra 
									 +'<a href="javascript:void(0)" onclick="popupObras(\''+feature.attributes.id_obra+'\');">' + '<b> +info</b>' + '</a>'
									 +"<br>Nombre: "+ feature.attributes.nombre
									 +"<br>Etapa: "+ feature.attributes.etapa
									 +"<br>Reparticion: "+ feature.attributes.reparticion
									 +"<br>Geometria: "+ feature.attributes.geom
									 +"</div>",
            maximizable: false,
            collapsible: true
        });
        // unselect feature when the popup
        // is closed
        popup.on({
            close: function() {
                selectCtrl.unselectAll();
            }
        });
        popup.show();
		console.log(popup.location);
    }

    // create popup on "featureselected"
layerwfs.events.on({
	featureselected: function(e) {
		createPopup(e.feature);
// mostrar traza usando gml request
// http://gis.stackexchange.com/questions/73685/add-features-to-vector-layer-from-wfs-query
// 
var url = 'http://192.168.1.28/geoserver/SigosGis/wms';
var postData = '<wfs:GetFeature xmlns:wfs="http://www.opengis.net/wfs" '
+'service="WFS" version="1.1.0" outputFormat="GML2" '
+'xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd" '
+'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">'
+'<wfs:Query typeName="SigosGis:obras_sigos_total" srsName="EPSG:900913">'
+'<ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">'
+'<ogc:PropertyIsEqualTo><ogc:PropertyName>id_obra</ogc:PropertyName><ogc:Literal>'+e.feature.attributes.id_obra+'</ogc:Literal></ogc:PropertyIsEqualTo>'
+'</ogc:Filter>'
+'</wfs:Query>'
+'</wfs:GetFeature>';
var req = new XMLHttpRequest();
req.open("POST", url, true);
req.setRequestHeader('User-Agent', 'XMLHTTP/1.0');
req.setRequestHeader('Content-type', 'application/xml');
req.onreadystatechange = function () {
  if (req.readyState != 4) return;
  if (req.status != 200 && req.status != 304) {
	alert('HTTP error ' + req.status);
	return;
  }
  //alert(req.responseText);
  var gmlReader = new OpenLayers.Format.GML({ extractAttributes: true });
  var features = gmlReader.read(req.responseText);
  layerTrazas.addFeatures(features);
}
if (req.readyState == 4) return;
req.send(postData);

	}
});

layerwfs.events.on({
	featureunselected: function(e) {
		popup.close();
		layerTrazas.removeFeatures(layerTrazas.features);
	}
});

Heron.App.map.addControl(selectCtrl);
selectCtrl.activate();

var layers= Heron.App.map.getLayersByName('Obras Seleccionadas');
layerVector=layers[0];
layerVector.events.register('loadend', layerVector, function(evt){
             Heron.App.map.zoomToExtent(layerVector.getDataExtent());
    		 selectCtrl.select(layerVector.features[0]);
			 //alert(layerVector.getDataExtent());
            }); 
			

</script>
