<?php

namespace App\Model;

use App\Model\BaseModel;
use App\Model\OrderItem;
use App\Model\AttributeSet;
use App\Model\Attribute;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\Table;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\ManyToOne;
use Doctrine\ORM\Mapping\OneToMany;
use Doctrine\ORM\Mapping\JoinColumn;

#[Entity]
#[Table(name: 'ChosenAttribute')]
class ChosenAttribute
{
    #[Id]
    #[ManyToOne(targetEntity: AttributeSet::class)]
    #[JoinColumn(name: 'attribute_set_id', referencedColumnName: 'id')]
    private AttributeSet $attributeSet;

    #[Id]
    #[ManyToOne(targetEntity: Attribute::class)]
    #[JoinColumn(name: 'attribute_id', referencedColumnName: 'id')]
    private Attribute $attribute;

    #[Id]
    #[ManyToOne(targetEntity: OrderItem::class, inversedBy: 'chosenAttributes')]
    #[JoinColumn(name: 'order_item_id', referencedColumnName: 'id')]
    private OrderItem $orderItem;

    public function getAttributeSet(): AttributeSet
    {
        return $this->attributeSet;
    }

    public function getAttribute(): Attribute
    {
        return $this->attribute;
    }

    public function getOrderItem(): OrderItem
    {
        return $this->orderItem;
    }

    public function setAttributeSet(AttributeSet $attributeSet): ChosenAttribute
    {
        $this->attributeSet = $attributeSet;

        return $this;
    }

    public function setAttribute(Attribute $attribute): ChosenAttribute
    {
        $this->attribute = $attribute;

        return $this;
    }

    public function setOrderItem(OrderItem $orderItem): ChosenAttribute
    {
        $this->orderItem = $orderItem;

        return $this;
    }
}
