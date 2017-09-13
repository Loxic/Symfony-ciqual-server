<?php

namespace RestBundle\Controller;


use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use IngredientBundle\Entity\Ingredient;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\View\ViewHandler;
use FOS\RestBundle\View\View;

class IngredientController extends Controller
{
   //Only for testing purpose to comment out
   /**
    * @Rest\View()
    * @Rest\Get("/ingredients")
    */
    public function getIngredientsAction(Request $request) {
        $ingredients = $this->get('doctrine.orm.entity_manager')
        ->getRepository('IngredientBundle:Ingredient')
        ->findAll();

        //TODO: automatise this part
        $formatted = array();
        foreach($ingredients as $ingredient) {
            $formatted[] = $ingredient->getData(); 
        }

        $view = View::create($formatted);
        //Seems ok, but lot of space character in json response for numerical data
        return $view;
    }


   /**
    * @Rest\View()
    * @Rest\Get("/ingredients/{search}")
    */
    //TODO: Cache & Asynchrone
    public function findIngredientsAction(Request $request) {
        //check if query param is here
        $search = $request->get('search');
        if($search === null) {
            return new JsonResponse(['message' => 'Query needed', Response::HTTP_NOT_FOUND]);
        }

        $ingredients = $this->get('doctrine.orm.entity_manager')
            ->getRepository('IngredientBundle:Ingredient')
            ->searchByString($search);

        if(empty($ingredients))
            return new JsonResponse(['message' => 'No result', Response::HTTP_NOT_FOUND]);
        
        //formate data
        $formatted = array();
        foreach($ingredients as $ingredient) {
            $formatted[] = $ingredient->getData();
        }

        $view = View::create($formatted);
        //Seems ok, but lot of space character in json response for numerical data
        return $view;
    }

}