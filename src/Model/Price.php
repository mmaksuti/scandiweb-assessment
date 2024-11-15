<?php

namespace App\Model;

use App\Model\BaseModel;
use App\Model\Currency;

use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\Table;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\ManyToOne;
use Doctrine\ORM\Mapping\JoinColumn;
use Doctrine\DBAL\Types\Types;

#[Entity]
#[Table(name: 'Price')]
class Price extends BaseModel {
    #[Id]
    #[Column(name: 'id'), GeneratedValue]
    protected $autoId;

    #[Column(type: Types::DECIMAL, precision: 10, scale: 2)]
    private float $amount;

    #[ManyToOne(targetEntity: Currency::class)]
    #[JoinColumn(name: 'currency_id', referencedColumnName: 'id')]
    private Currency $currency;

    function getAmount(): float {
        return $this->amount;
    }

    function getCurrency(): Currency {
        return $this->currency;
    }
}

?>