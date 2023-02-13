<?php
require_once "../config/connection.php";
class Persona extends Connection
{
    public static function mostrarDatos()
    {
        try {
            $sql = "SELECT * FROM persona";
            $stmt = Connection::getConnection()->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchAll();
            return $result;
        } catch (PDOException $th) {
            echo $th->getMessage();
        }
    }
    public static function obtenerDatoId($id)
    {
        try {
            $sql = "SELECT * FROM persona WHERE id = :id";
            $stmt = Connection::getConnection()->prepare($sql);
            $stmt->bindParam(':id',$id);
            $stmt->execute();
            $result = $stmt->fetch();
            return $result;
        } catch(PDOException $th) {
            echo $th->getMessage();
        }
    }
    public static function guardarDato($data)
    {
      try {
        $sql = "INSERT INTO persona (nombres, email, edad) VALUES (:nombres, :email, :edad)";
        $stmt = Connection::getConnection()->prepare($sql);
        $stmt->bindParam(':nombres', $data['nombres']);
        $stmt->bindParam(':email', $data['email']);
        $stmt->bindParam(':edad', $data['edad']);
        $stmt->execute();
        return true;
      } catch (PDOException $th) {
        echo $th->getMessage();
      }
    }
    public static function actualizar($data)
    {
        try {
            $sql = "UPDATE persona SET nombres =:nombres, email =:email, edad =:edad WHERE id=:id";
            $stmt = Connection::getConnection()->prepare($sql);
            $stmt->bindParam(':nombres', $data['nombres']);
            $stmt->bindParam(':email', $data['email']);
            $stmt->bindParam(':edad', $data['edad']);
            $stmt->bindParam(':id', $data['id']);
            $stmt->execute();
            return true;
        } catch(PDOException $th) {
            echo $th->getMessage();
        }
    }
    public static function eliminar($data)
    {
        try {
            $sql = "DELETE FROM persona WHERE id =:id";
            $stmt = Connection::getConnection()->prepare($sql);
            $stmt->bindParam(':id', $data['id']);
            $stmt->execute();
            return true;
        } catch(PDOException $th) {
            echo $th->getMessage();
        }
    }
}