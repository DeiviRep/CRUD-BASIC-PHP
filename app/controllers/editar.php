<?php
    require_once "../models/persona.model.php";
    echo json_encode(Persona::obtenerDatoId($_POST['id']));