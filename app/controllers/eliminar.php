<?php
    require_once "../models/persona.model.php";
    $arrayName = array('id' => $_POST['id']);
    echo json_encode(Persona::eliminar($arrayName));