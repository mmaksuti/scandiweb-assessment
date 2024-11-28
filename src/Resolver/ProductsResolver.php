<?php

namespace App\Resolver;

use GraphQL\Type\Definition\ResolveInfo;

use App\Model\Product;
use App\Resolver\IResolver;

class ProductsResolver implements IResolver {
    public function resolve($rootValue, array $args, $context, ResolveInfo $info) {
        $entityManager = $context;
        return $entityManager->getRepository(Product::class)->findAll();
    }
}

?>