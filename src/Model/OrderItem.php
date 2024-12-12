<?php

namespace App\Model;

use App\Model\BaseModel;
use App\Model\ChosenAttribute;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\Table;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\ManyToOne;
use Doctrine\ORM\Mapping\OneToMany;
use Doctrine\ORM\Mapping\JoinColumn;
use Doctrine\DBAL\Types\Types;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;

#[Entity]
#[Table(name: 'OrderItem')]
class OrderItem extends BaseModel
{
    #[Id]
    #[Column(name: 'id'), GeneratedValue]
    protected $autoId;

    #[ManyToOne(targetEntity: Order::class, inversedBy: 'orderItems')]
    #[JoinColumn(name: 'order_id', referencedColumnName: 'id')]
    private Order $order;

    #[ManyToOne(targetEntity: Product::class)]
    #[JoinColumn(name: 'product_id', referencedColumnName: 'id')]
    private Product $product;

    #[Column]
    private int $quantity;

    #[Column(type: Types::DECIMAL, precision: 10, scale: 2)]
    private float $total;

    #[OneToMany(targetEntity: ChosenAttribute::class, mappedBy: 'orderItem', cascade: ['persist', 'remove'])]
    private Collection $chosenAttributes;

    public function __construct()
    {
        $this->chosenAttributes = new ArrayCollection();
    }

    public function getOrder(): Order
    {
        return $this->order;
    }

    public function getProduct(): Product
    {
        return $this->product;
    }

    public function getQuantity(): int
    {
        return $this->quantity;
    }

    public function getTotal(): float
    {
        return $this->total;
    }

    public function getChosenAttributes(): Collection
    {
        return $this->chosenAttributes;
    }

    public function setOrder(Order $order): OrderItem
    {
        $this->order = $order;

        return $this;
    }

    public function setProduct(Product $product): OrderItem
    {
        $this->product = $product;

        return $this;
    }

    public function setQuantity(int $quantity): OrderItem
    {
        $this->quantity = $quantity;

        return $this;
    }

    public function setTotal(float $total): OrderItem
    {
        $this->total = $total;

        return $this;
    }

    public function addChosenAttribute(ChosenAttribute $chosenAttribute): OrderItem
    {
        $this->chosenAttributes->add($chosenAttribute);

        return $this;
    }
}
