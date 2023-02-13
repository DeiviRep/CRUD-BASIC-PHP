<?php
require_once "../models/persona.model.php";
 $arrayName = array('nombres' => $_POST['nombres'] ,
 'email' => $_POST['email'] ,
 'edad' => $_POST['edad']  );

 echo json_encode(Persona::guardarDato($arrayName));