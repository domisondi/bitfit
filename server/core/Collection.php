<?php

class Collection {
    
    var $id;
    var $name;
    
    public function __construct($id, $data = null) {
        $this->id = $id;
        
        global $database;
        if(!$data || !is_array($data)){
            $database->query("SELECT * FROM collections WHERE id=:id");
            $database->bind('id', $id);
            $data = $database->get_single();
        }
        
        if($data) {
            foreach($data as $dat_name => $dat){
                if($dat_name == 'id') continue;
                
                $this->$dat_name = $dat;
            }
        }
        else throw new Exception ('Collection not found!');
    }
}