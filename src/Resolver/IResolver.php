<?php

namespace App\Resolver;

use GraphQL\Type\Definition\ResolveInfo;

interface IResolver {
    public function resolve($objectValue, array $args, $context, ResolveInfo $info);
}

?>