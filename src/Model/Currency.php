<?php

namespace App\Model;

use App\Model\BaseModel;

use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\Table;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\GeneratedValue;

#[Entity]
#[Table(name: 'Currency')]
class Currency extends BaseModel {
    #[Id]
    #[Column(name: 'id'), GeneratedValue]
    protected $autoId;

    #[Column]
    private string $label;

    #[Column]
    private string $symbol;

    function getLabel(): string {
        return $this->label;
    }

    function getSymbol(): string {
        return $this->symbol;
    }
}

?>