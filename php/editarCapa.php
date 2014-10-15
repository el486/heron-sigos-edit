<?php
/* importa el archivo de configuracion */

require_once("include/config2.php");

$link = pg_connect(PG_CONNECTION_STRING);

$id = $_POST['id'];
$geom = $_POST['geom'];
$action = $_POST['action'];
$capa = $_POST['capa'];
$indice = $_POST['indice'];
$tipogeom = $_POST['tipogeom'];

if ($action=='add'){
	$sql = "select * from $capa
			where $indice= '$id' 
			and the_geom= st_transform(ST_GeomFromText('$geom', 900913),4326);
			";
	$res = pg_query($link, $sql);

	if (pg_num_rows($res)>=1){echo 'El registro ya existe';}
	else{
		$sql = "
			INSERT INTO $capa($indice, the_geom)
			VALUES('$id', st_transform(ST_GeomFromText('$geom', 900913),4326));
			";
			
			$res = pg_query($link, $sql);
			if (substr (pg_last_error($link),-26,-2)=='enforce_geotype_the_geom'){echo 'Geometria incorrecta! Se esperaba: '.$tipogeom ;} else {echo 'Sin errores '.pg_last_error($link);}
		}
	}
	
if ($action=='delete'){
$sql = "
    DELETE FROM $capa
	WHERE $indice='$id'
	";
	
	$res = pg_query($link, $sql);
	echo pg_affected_rows($res);
	}

//echo $sql;
	
	
?>
