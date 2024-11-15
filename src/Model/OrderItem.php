<?php

namespace App\Model;

use App\Model\BaseModel;
use App\Model\OrderItem;
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
#[Table(name: 'OrderItem')]
class OrderItem extends BaseModel {
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

    function getOrder(): Order {
        return $this->order;
    }

    function getProduct(): Product {
        return $this->product;
    }

    function getQuantity(): int {
        return $this->quantity;
    }

    function getTotal(): float {
        return $this->total;
    }

    function setOrder(Order $order): OrderItem {
        $this->order = $order;

        return $this;
    }

    function setProduct(Product $product): OrderItem {
        $this->product = $product;

        return $this;
    }

    function setQuantity(int $quantity): OrderItem {
        $this->quantity = $quantity;

        return $this;
    }

    function setTotal(float $total): OrderItem {
        $this->total = $total;

        return $this;
    }
}

?>