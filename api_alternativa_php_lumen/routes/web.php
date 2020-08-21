<?php

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
    return $router->app->version();
});


$router->post('/auth', 'AuthController@authenticateUser');

$router->group(['prefix' => 'user'], function () use ($router) {
    $router->get('/list', ['middleware' => 'auth', 'uses' => 'UserController@index']);
    $router->delete('/delete', ['middleware' => 'auth', 'uses' => 'UserController@deleteUser']);
});

$router->group(['prefix' => 'employee'], function () use ($router) {
    $router->post('/', ['middleware' => 'auth', 'uses' => 'EmployeeController@createEmployee']);
});

$router->group(['prefix' => 'resident'], function () use ($router) {
    $router->post('/', ['middleware' => 'auth', 'uses' => 'ResidentController@createResident']);
});

$router->group(['prefix' => 'lost-and-found'], function () use ($router) {
    $router->post('/create', ['middleware' => 'auth', 'uses' => 'LostAndFoundController@createItem']);
    $router->get('/list', ['middleware' => 'auth', 'uses' => 'LostAndFoundController@index']);
});

$router->group(['prefix' => 'salon'], function () use ($router) {
    $router->post('/', ['middleware' => 'auth', 'uses' => 'SalonController@reserveSalon']);
    $router->get('/list', ['middleware' => 'auth', 'uses' => 'SalonController@index']);
});

$router->group(['prefix' => 'occurrence'], function () use ($router) {
    $router->post('/', ['middleware' => 'auth', 'uses' => 'OccurrenceController@registerOccurrence']);
    $router->get('/list', ['middleware' => 'auth', 'uses' => 'OccurrenceController@index']);
});
