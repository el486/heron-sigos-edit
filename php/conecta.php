<?
function ejecutarQuery($qry,$retorna){
        $resultado = false;
   	    // ---------------------------------->   desarrollo
		$host = '192.168.1.19:1433';
		$login = 'usigos';
    	$password = 'usigos';
 	
		if($cd =  mssql_connect($host,$login,$password)){
				mssql_select_db("MIVSP_SIGOS");
						
			   if($rs = mssql_query($qry,$cd))
			   	 if($retorna){
				   $i = 0;
				   while($aux = mssql_fetch_array($rs,MSSQL_ASSOC)){
					 $resultado[$i] = $aux;
					 $i++;
				   }
				   mssql_free_result($rs);
				 }
				 else
				   $resultado = true;	  
	   			mssql_close($cd);
	 	}
	 
    	return $resultado;
 } 
?>
