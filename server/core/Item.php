<?php

class Item {
    
    var $id;
    var $name;
    var $nr_steps;
    
    public function __construct($id = 0, $name = '', $nr_steps = 0) {
        $this->id = $id;
        $this->name = $name;
        $this->nr_steps = $nr_steps;
    }
    
    public function insert_into_database() {
        global $database;
        $database->query("INSERT INTO items (name, nr_steps) VALUES (:name, :nr_steps)");
        $database->bind('name', $this->name);
        $database->bind('nr_steps', $this->nr_steps);
        $res = $database->execute();
        if($res===false) return false;
        else return true;
    }
    
    public function delete_from_database() {
        global $database;
        $database->query("DELETE FROM items WHERE id=:id");
        $database->bind('id', $this->id);
        $database->execute();
    }
}