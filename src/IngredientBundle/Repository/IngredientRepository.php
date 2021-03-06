<?php

namespace IngredientBundle\Repository;

/**
 * IngredientRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class IngredientRepository extends \Doctrine\ORM\EntityRepository
{
    //TODO: System to ordonate the results in function of matching
    public function searchByString($string) {
        $stringFormatted = str_replace(' ', '', $string);
        $query = $this->getEntityManager()->createQueryBuilder();
        $query->select('i')
              ->from('IngredientBundle\Entity\Ingredient', 'i')
              ->where("i.origgpfr LIKE :string")//category
              ->orWhere("i.origfdnm LIKE :string")//name
              ->setParameters(["string" => "%{$string}%"]);

              
        return $query->getQuery()->getResult();
    }
}
