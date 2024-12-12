<?php

namespace App\Resolver;

use GraphQL\Type\Definition\ResolveInfo;
use App\Model\Category;
use App\Resolver\IResolver;

class CategoryResolver implements IResolver
{
    public function resolve($rootValue, array $args, $context, ResolveInfo $info)
    {
        $entityManager = $context;
        return $entityManager->getRepository(Category::class)->findAll();
    }
}
