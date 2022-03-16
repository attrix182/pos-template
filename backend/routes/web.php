<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return response("Hello World!");
});


//List products
$router->get('/products', 'ProductController@listAll');
$router->get('/products/{id}', 'ProductController@listOne');

//Create products
$router->post('/products', 'ProductController@create');

//Update products
$router->put('/products/{id}', 'ProductController@update');

//Delete products
$router->delete('/products/{id}', 'ProductController@delete');

//Users
$router->post('/users/register', 'UserController@register');
$router->post('/users/login', 'UserController@login');
