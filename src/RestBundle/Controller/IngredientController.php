<?php

namespace RestBundle\Controller;


use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use IngredientBundle\Entity\Ingredient;
/*use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\View\ViewHandler;
use FOS\RestBundle\View\View;*/

class IngredientController extends Controller
{
   //Only for testing purpose to comment out
   /**
    * @Route("/ingredients", name="ingredients_list")
    * @Method({"GET"})
    */
    public function getIngredientsAction(Request $request) {
        $ingredients = $this->get('doctrine.orm.entity_manager')
        ->getRepository('IngredientBundle:Ingredient')
        ->findAll();

        $formatted = array();
        foreach($ingredients as $ingredient) {
            $formatted[] = $ingredient->getData(); 
        }
        //Seems ok, but lot of space character in json response for numerical data
        return new JsonResponse($formatted);
    }

   /**
    * @Route("/find-ingredients", name="find_ingredients")
    * @Method({"GET"})
    */
    public function findIngredientAction(Request $request) {
        //check if query param is here
        $search = "";
        if(!isset($request->query->all()['s']) || ($request->query->all()['s'] == null)) {
            return new JsonResponse(null);
        }

        //Search 
        $search = $request->query->all()['s'];
        print_r($search);
        $ingredients = $this->get('doctrine.orm.entity_manager')
            ->getRepository('IngredientBundle:Ingredient')
            ->searchByString($search);

        //formate data
        $formatted = array();
        foreach($ingredients as $ingredient) {
            $formatted[] = $ingredient->getData();
        }
        return new JsonResponse($formatted);
    }

}