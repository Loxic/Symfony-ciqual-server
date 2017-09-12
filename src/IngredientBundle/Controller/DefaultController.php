<?php

namespace IngredientBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('IngredientBundle:Default:index.html.twig');
    }
}
