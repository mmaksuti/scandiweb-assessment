<?php

namespace App\Model;

use App\Model\BaseModel;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\Table;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\GeneratedValue;

#[Entity]
#[Table(name: 'Category')]
class Category extends BaseModel
{
    #[Id]
    #[Column(name: 'id'), GeneratedValue]
    protected $autoId;

    #[Column]
    private string $name;

    public function getName(): string
    {
        return $this->name;
    }
}
