<?php

namespace App\Model;

use App\Model\BaseModel;
use App\Model\AttributeSet;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\Table;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\JoinColumn;
use Doctrine\ORM\Mapping\ManyToOne;
use Doctrine\ORM\Mapping\GeneratedValue;

#[Entity]
#[Table(name: 'Attribute')]
class Attribute extends BaseModel
{
    #[Id]
    #[Column(name: 'id'), GeneratedValue]
    protected $autoId;

    #[Column(name: 'attribute_id')]
    private string $id;

    #[Column(name: 'display_value')]
    private string $displayValue;

    #[Column]
    private string $value;

    #[ManyToOne(targetEntity: AttributeSet::class, inversedBy: 'items')]
    #[JoinColumn(name: 'attribute_set_id', referencedColumnName: 'id')]
    private AttributeSet $attributeSet;

    public function getId(): string
    {
        return $this->id;
    }

    public function getDisplayValue(): string
    {
        return $this->displayValue;
    }

    public function getValue(): string
    {
        return $this->value;
    }

    public function getAttributeSet(): AttributeSet
    {
        return $this->attributeSet;
    }
}
