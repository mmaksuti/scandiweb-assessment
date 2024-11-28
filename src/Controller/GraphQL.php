<?php

namespace App\Controller;

use GraphQL\GraphQL as GraphQLBase;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Schema;
use GraphQL\Type\SchemaConfig;
use GraphQL\Utils\BuildSchema;
use GraphQL\Error\DebugFlag;
use RuntimeException;
use Throwable;

use App\Resolver\RootResolver;
use App\Resolver\CategoryResolver;
use App\Resolver\ProductsResolver;
use App\Resolver\ProductResolver;
use App\Resolver\CreateOrderResolver;

class GraphQL {
    static public function handle($entityManager) {
        try {
            $contents = file_get_contents(__DIR__ . '/../schema.graphql');
            $schema = BuildSchema::build($contents);

            $rawInput = file_get_contents('php://input');
            if ($rawInput === false) {
                throw new RuntimeException('Failed to get php://input');
            }
        
            $input = json_decode($rawInput, true);
            $query = $input['query'];
            $variableValues = $input['variables'] ?? null;
            
            $rootValue = [
                'categories' => fn($rootValue, $args, $context, $info) => (new CategoryResolver())->resolve($rootValue, $args, $context, $info),
                'products' => fn($rootValue, $args, $context, $info) => (new ProductsResolver())->resolve($rootValue, $args, $context, $info),
                'product' => fn($rootValue, $args, $context, $info) => (new ProductResolver())->resolve($rootValue, $args, $context, $info),
                'createOrder' => fn($rootValue, $args, $context, $info) => (new CreateOrderResolver())->resolve($rootValue, $args, $context, $info)
            ];
            $result = GraphQLBase::executeQuery($schema, $query, $rootValue, $entityManager, $variableValues, null, function ($objectValue, $args, $contextValue, $info) {
                return (new RootResolver())->resolve($objectValue, $args, $contextValue, $info);
            });

            $output = null;
            if ($_ENV['DEBUG'] === 'true') {
                $output = $result->toArray(DebugFlag::INCLUDE_DEBUG_MESSAGE | DebugFlag::INCLUDE_TRACE);
            }
            else {
                $output = $result->toArray();
            }
        } catch (Throwable $e) {
            $output = [
                'error' => [
                    'message' => $e->getMessage(),
                ],
            ];
        }

        header('Content-Type: application/json; charset=UTF-8');
        return json_encode($output);
    }
}