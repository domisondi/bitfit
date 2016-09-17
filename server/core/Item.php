<?php

class Item {
    
    var $id;
    var $coll_id;
    var $name;
    var $nr_steps;
    
    public function __construct($id, $coll_id, $name, $nr_steps) {
        $this->id = $id;
        $this->coll_id = $coll_id;
        $this->name = $name;
        $this->nr_steps = $nr_steps;
    }
    
    public function insert_into_database() {
        global $database;
        $database->query("INSERT INTO items (id, coll_id, name, nr_steps) VALUES (:id, _coll_id, :name, :nr_steps)");
        $database->bind('id', $this->id);
        $database->bind('coll_id', $this->coll_id);
        $database->bind('name', $this->name);
        $database->bind('nr_steps', $this->nr_steps);
        $res = $database->execute();
        if($res===false) return false;
        else return true;
    }
    
    public function delete_from_database() {
        global $database;
        $database->query("DELETE FROM items WHERE id=:id AND coll_id=:coll_id");
        $database->bind('id', $this->id);
        $database->bind('coll_id', $this->coll_id);
        $database->execute();
    }
}