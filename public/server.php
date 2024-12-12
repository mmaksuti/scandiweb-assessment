<?php

require_once __DIR__ . '/../vendor/autoload.php';

use Doctrine\ORM\EntityManager;
use Doctrine\DBAL\DriverManager;
use Doctrine\ORM\ORMSetup;

use App\Controller\GraphQL;

// Load environment variables
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

$debug = $_ENV['DEBUG'] === 'true';

header("Content-Type: application/json");

// CORS
if ($debug) {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
}

// Error handling
error_reporting(E_ALL);

set_error_handler(function ($errno, $errstr, $errfile, $errline) use ($debug) {
    http_response_code(500);
    $response = [
        'error' => true,
        'message' => $debug ? $errstr : 'An unexpected error occurred.',
    ];
    if ($debug) {
        $response['details'] = [
            'type' => 'Error',
            'file' => $errfile,
            'line' => $errline,
        ];
    }
    echo json_encode($response);
    exit;
});

// Define the exception handler
set_exception_handler(function ($exception) use ($debug) {
    http_response_code(500);
    $response = [
        'error' => true,
        'message' => $debug ? $exception->getMessage() : 'An unexpected error occurred.',
    ];

    if ($debug) {
        $response['details'] = [
            'type' => 'Exception',
            'file' => $exception->getFile(),
            'line' => $exception->getLine(),
        ];
    }
    echo json_encode($response);
    exit;
});

register_shutdown_function(function () use ($debug) {
    $error = error_get_last();
    if ($error && in_array($error['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR])) {
        http_response_code(500);
        $response = [
            'error' => true,
            'message' => $debug ? $error['message'] : 'A fatal error occurred.',
        ];
        if ($debug) {
            $response['details'] = [
                'type' => 'Fatal Error',
                'file' => $error['file'],
                'line' => $error['line'],
            ];
        }
        echo json_encode($response);
    }
});

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
$dispatcher = FastRoute\simpleDispatcher(function (FastRoute\RouteCollector $r) use ($entityManager) {
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
