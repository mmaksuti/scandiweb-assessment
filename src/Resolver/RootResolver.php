<?php

namespace App\Resolver;

use GraphQL\Type\Definition\ResolveInfo;

use App\Resolver\IResolver;

class RootResolver implements IResolver {
    public function resolve($objectValue, array $args, $context, ResolveInfo $info) {
        $fieldName = $info->fieldName;
        $property = null;
        if (is_array($objectValue) || $objectValue instanceof ArrayAccess) {
            if (isset($objectValue[$fieldName])) {
                $property = $objectValue[$fieldName];
            }
        } elseif (is_object($objectValue)) {
            if (isset($objectValue->{$fieldName})) {
                $property = $objectValue->{$fieldName};
            }
            else {
                $getter = 'get' . ucfirst($fieldName);
                if (method_exists($objectValue, $getter)) {
                    $property = $objectValue->{$getter}();
                }
            }
        }

        return $property instanceof \Closure
            ? $property($objectValue, $args, $context, $info)
            : $property;
    }
}

?>