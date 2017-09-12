<?php

namespace IngredientBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * Classified
 *
 * @ORM\Table(name="ingredient", indexes={@ORM\Index(name="text_search", columns={"origgpfr", "origfdnm"}, flags={"fulltext"})})
 * @ORM\Entity(repositoryClass="IngredientBundle\Repository\IngredientRepository")
 */
 class Ingredient
 {
    /**
    * @var int
    *
    * @ORM\Column(name="id", type="integer")
    * @ORM\Id
    * @ORM\GeneratedValue(strategy="AUTO")
    */
    private $id;
     
    /**
    * @var string
    *
    * @ORM\Column(name="origgpfr", type="string")
    */
    private $origgpfr; //type, aliment category

    /**
    * @var string
    *
    * @ORM\Column(name="origfdnm", type="string")
    */
    private $origfdnm; //aliment name
    
    /**
    * @var datetime
    *
    * @ORM\Column(name="created_at", type="datetime")
    */
    private $createdAt;

    /**
    * @var datetime
    *
    * @ORM\Column(name="updated_at", type="datetime")
    */
    private $updatedAt;

    /**
    * @var datetime
    *
    * @ORM\Column(name="deleted_at", type="datetime", nullable=true)
    */
    private $deletedAt;

    /**
    * @var array
    *
    * @ORM\column(type="array")
    */
    private $composition;

    /**
    * Constructor
    */
    public function __construct() {
        $this->createdAt = $this->updatedAt = new \DateTime();
        $this->deletedAt = null;
        $this->composition = array();
    }

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set origgpfr
     *
     * @param string $origgpfr
     *
     * @return Ingredient
     */
    public function setOriggpfr($origgpfr)
    {
        $this->origgpfr = $origgpfr;

        return $this;
    }

    /**
     * Get origgpfr
     *
     * @return string
     */
    public function getOriggpfr()
    {
        return $this->origgpfr;
    }

    /**
     * Set origfdnm
     *
     * @param string $origfdnm
     *
     * @return Ingredient
     */
    public function setOrigfdnm($origfdnm)
    {
        $this->origfdnm = $origfdnm;

        return $this;
    }

    /**
     * Get origfdnm
     *
     * @return string
     */
    public function getOrigfdnm()
    {
        return $this->origfdnm;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     *
     * @return Ingredient
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * Get createdAt
     *
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Set updatedAt
     *
     * @param \DateTime $updatedAt
     *
     * @return Ingredient
     */
    public function setUpdatedAt($updatedAt)
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    /**
     * Get updatedAt
     *
     * @return \DateTime
     */
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }

    /**
     * Set deletedAt
     *
     * @param \DateTime $deletedAt
     *
     * @return Ingredient
     */
    public function setDeletedAt($deletedAt)
    {
        $this->deletedAt = $deletedAt;

        return $this;
    }

    /**
     * Get deletedAt
     *
     * @return \DateTime
     */
    public function getDeletedAt()
    {
        return $this->deletedAt;
    }

    /**
     * Set composition
     *
     * @param array $composition
     *
     * @return Ingredient
     */
    public function setComposition($composition)
    {
        $this->composition = $composition;

        return $this;
    }

    /**
     * Get composition
     *
     * @return array
     */
    public function getComposition()
    {
        return $this->composition;
    }
}
