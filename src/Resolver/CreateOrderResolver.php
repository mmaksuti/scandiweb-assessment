<?php

namespace App\Resolver;

use GraphQL\Type\Definition\ResolveInfo;

use App\Resolver\IResolver;

use App\Model\Order;
use App\Model\Currency;
use App\Model\Product;
use App\Model\OrderItem;

class CreateOrderResolver implements IResolver {
    public function resolve($rootValue, array $args, $context, ResolveInfo $info) {
        $entityMananger = $context;

        $order = new Order();
        $now = new \DateTime();
        $nowTimestamp = $now->getTimestamp();
        $order->setOrderTime($nowTimestamp);

        $createOrderInput = $args['createOrderInput'];

        $currency = $entityMananger->getRepository(Currency::class)
            ->findOneBy(['label' => $createOrderInput['currency']]);
        
        if ($currency == null) {
            throw new \Exception('Currency not found: ' . $createOrderInput['currency']);
        }

        $order->setCurrency($currency);

        $productInputs = $createOrderInput['products'];

        for ($i = 0; $i < count($productInputs); $i++) {
            $product = $entityMananger->getRepository(Product::class)
                ->findOneBy(['id' => $productInputs[$i]['productId']]);

            if ($product == null) {
                throw new \Exception('Product not found: ' . $productInputs[$i]['productId']);
            }

            $prices = $product->getPrices();
            $price = $prices->filter(function($price) use ($currency) {
                return $price->getCurrency()->getLabel() == $currency->getLabel();
            })->first()->getAmount();
            
            $quantity = $productInputs[$i]['quantity'];

            $orderItem = new OrderItem();
            $orderItem->setProduct($product)
                ->setQuantity($quantity)
                ->setOrder($order)
                ->setTotal($price * $quantity);

            $order->addOrderItem($orderItem);
        }

        $entityMananger->persist($order);
        $entityMananger->flush();
        
        return $order;
    }
}

?>