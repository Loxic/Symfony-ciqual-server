<?php
namespace ImportBundle\Services;

class CsvToArray {
    public function __construct() {
    }

    public function convert($filename, $delimiter = ';') {
        if(!file_exists($filename)) {
            return FALSE;
        }
        $header = NULL;
        $data = array();
        $handle = fopen($filename, 'r');
        if($handle !== FALSE) {
            while(($row = fgetcsv($handle,0,$delimiter)) !== FALSE) {
                //csv is iso88591 contrary to dbal which is UTF8 so conversion is needed
                $row = array_map("utf8_encode", $row);
                if($header) {
                    $data[] = array_combine($header, $row);
                }
                else  {
                    $header = $row;
                }
            }
        fclose($handle);            
        }
        return $data;
    }

}