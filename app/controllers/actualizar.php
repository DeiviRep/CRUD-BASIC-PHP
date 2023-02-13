<?php
require_once "../models/persona.model.php";
 $arrayName = array('nombres' => $_POST['nombres'] ,
 'email' => $_POST['email'] ,
 'edad' => $_POST['edad'],
 'id' => $_POST['id']  );

 echo json_encode(Persona::actualizar($arrayName));