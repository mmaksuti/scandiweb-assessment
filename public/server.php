<?php

require_once __DIR__ . '/../vendor/autoload.php';

use Doctrine\ORM\EntityManager;
use Doctrine\DBAL\DriverManager;
use Doctrine\ORM\ORMSetup;

use App\Controller\GraphQL;

// Load environment variables
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

// Database
$params = [
    'host' => $_ENV['DB_HOST'],
    'user' => $_ENV['DB_USER'],
    'password' => $_ENV['DB_PASS'],
    'dbname' => $_ENV['DB_NAME'],
    'driver' => 'pdo_mysql'
];

$config = ORMSetup::createAttributeMetadataConfiguration([
    __DIR__ . '/../src/Model',
]);
$config->setAutoGenerateProxyClasses(true);

$entityManager = new EntityManager(
    DriverManager::getConnection($params),
    $config
);

// Router
$dispatcher = FastRoute\simpleDispatcher(function(FastRoute\RouteCollector $r) use ($entityManager) {
    $r->post('/graphql', function () use ($entityManager) {
        return GraphQL::handle($entityManager);
    });
});

$routeInfo = $dispatcher->dispatch(
    $_SERVER['REQUEST_METHOD'],
    $_SERVER['REQUEST_URI']
);

switch ($routeInfo[0]) {
    case FastRoute\Dispatcher::NOT_FOUND:
        // ... 404 Not Found
        break;
    case FastRoute\Dispatcher::METHOD_NOT_ALLOWED:
        $allowedMethods = $routeInfo[1];
        // ... 405 Method Not Allowed
        break;
    case FastRoute\Dispatcher::FOUND:
        $handler = $routeInfo[1];
        $vars = $routeInfo[2];
        echo $handler($vars);
        break;
}