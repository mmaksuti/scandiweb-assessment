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
use Doctrine\ORM\Mapping\OneToMany;
use Doctrine\ORM\Mapping\JoinColumn;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;

#[Entity]
#[Table(name: 'OrderTable')]
class Order extends BaseModel {
    #[Id]
    #[Column(name: 'id'), GeneratedValue]
    protected $autoId;

    #[Column(name: 'order_time', type: 'datetime')]
    private \DateTime $orderTime;

    #[ManyToOne(targetEntity: Currency::class)]
    #[JoinColumn(name: 'currency_id', referencedColumnName: 'id')]
    private Currency $currency;

    #[OneToMany(targetEntity: OrderItem::class, mappedBy: 'order', cascade: ['persist', 'remove'])]
    private Collection $orderItems;

    function __construct() {
        $this->orderItems = new ArrayCollection();
    }

    function getOrderTime(): int {
        return $this->orderTime->getTimestamp();
    }

    function getCurrency(): Currency {
        return $this->currency;
    }

    function getOrderItems(): Collection {
        return $this->orderItems;
    }

    function setOrderTime(int $orderTime): Order {
        $this->orderTime = new \DateTime();
        $this->orderTime->setTimestamp($orderTime);

        return $this;
    }

    function setCurrency(Currency $currency): Order {
        $this->currency = $currency;

        return $this;
    }

    function addOrderItem(OrderItem $orderItem): Order {
        $this->orderItems->add($orderItem);

        return $this;
    }
}
?>