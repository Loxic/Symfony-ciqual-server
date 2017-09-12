<?php

namespace ImportBundle\Command;

use Symfony\Component\HttpKernel\Bundle\BundleInterface;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

use IngredientBundle\Entity\Ingredient;

Class ImportCiqualCommand extends ContainerAwareCommand {
    
    protected function configure() {
        $this->setName('import:ciqual:csv');
        $this->setDescription('Import ingredients form CSV file');
    }

    protected function execute(InputInterface $input, OutputInterface $output) {
        $now = new \DateTime();
        $logger = $this->getContainer()->get('logger');
        $this->import($input, $output);
        $logger->info("Ingredients imported");
    }

    protected function import(InputInterface $input, OutputInterface $output) {
        //get data from csv
        $data = $this->get($input, $output);

        $em = $this->getContainer()->get('doctrine')->getManager();
        
        $nb = 0;
        //TODO: Implement queue here
        $queue_size = 30;
        //Right now just add if doesn't exist
        foreach($data as $row) {
            //maybe it can be improved by using csv column ORIGFDCD (unique id ?)
            $ingredient = $em->getRepository('IngredientBundle:Ingredient')
                            ->findOneBy(array('origfdnm' => $row['ORIGFDNM']));
            //Ingredient is not in the base

            if(!is_object($ingredient)) {
                //print_r($nb."\n");
                $ingredient = new Ingredient();
                $ingredient->setOrigfdnm($row['ORIGFDNM']);
                $ingredient->setOriggpfr($row['ORIGGPFR']);
            }
            $ingredient->setData($row);
            $em->persist($ingredient);
            if(($nb % $queue_size) === 0) {
                $em->flush();
                $em->clear();
            }
            $nb++;
        }
        $em->flush();
        $em->clear();
    }       

    //open csv & return array
    protected function get(InputInterface $input, OutputInterface $output) {
        $filename =  'web/assets/data/Table_Ciqual_2016.csv';
        $converter = $this->getContainer()->get('converter.csvtoarray');
        return $converter->convert($filename);
    }
}

