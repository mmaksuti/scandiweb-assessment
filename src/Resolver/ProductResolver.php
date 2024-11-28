<?php

namespace App\Resolver;

use GraphQL\Type\Definition\ResolveInfo;

use App\Model\Product;
use App\Resolver\IResolver;

class ProductResolver implements IResolver {
    public function resolve($rootValue, array $args, $context, ResolveInfo $info) {
        $entityManager = $context;
        $id = $args['id'];
        $product = $entityManager->getRepository(Product::class)->findOneBy(['id' => $id]);
        if ($product == null) {
            throw new \Exception('Product not found: ' . $id);
        }

        return $product;
    }
}

?>