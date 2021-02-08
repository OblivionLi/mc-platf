<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'prefix' => 'auth'
], function() {
    Route::post('register', 'App\Http\Controllers\Api\AuthController@register');
    Route::post('login', 'App\Http\Controllers\Api\AuthController@login')->name('login');
    Route::get('updates', 'App\Http\Controllers\Api\UpdateController@index');
    Route::get('update/{update}', 'App\Http\Controllers\Api\UpdateController@show');
    Route::get('gamemodes', 'App\Http\Controllers\Api\GameModeController@index');
    Route::get('showcases', 'App\Http\Controllers\Api\ShowCaseController@index');
    Route::get('ranks', 'App\Http\Controllers\Api\RankController@index');
    Route::get('ranks/{rank}/details', 'App\Http\Controllers\Api\RankController@show');
    Route::get('config/paypal', 'App\Http\Controllers\Api\CheckoutController@index');
    Route::post('/forgot-password', 'App\Http\Controllers\Api\AuthController@forgotPassword');
    Route::patch('/reset-password/{user}', 'App\Http\Controllers\Api\AuthController@resetPassword');
    Route::get('/reset-password/{token}', 'App\Http\Controllers\Api\AuthController@getToken');
    Route::get('tags', 'App\Http\Controllers\Api\TagController@index');

    Route::group(['middleware' => 'auth:api'], function () {
        Route::get('logout', 'App\Http\Controllers\Api\AuthController@logout');

        Route::post('report-bugs', 'App\Http\Controllers\Api\ReportBugController@store');
        Route::get('report-bugs', 'App\Http\Controllers\Api\ReportBugController@index')->middleware('isAdmin');
        Route::get('report-bugs/{bug}', 'App\Http\Controllers\Api\ReportBugController@show')->middleware('isAdmin');
        Route::patch('report-bugs/{bug}', 'App\Http\Controllers\Api\ReportBugController@update')->middleware('isAdmin');
        Route::delete('report-bugs/{bug}', 'App\Http\Controllers\Api\ReportBugController@destroy')->middleware('isAdmin');

        Route::post('report-players', 'App\Http\Controllers\Api\ReportPlayerController@store');
        Route::get('report-players', 'App\Http\Controllers\Api\ReportPlayerController@index')->middleware('isAdmin');
        Route::get('report-players/{player}', 'App\Http\Controllers\Api\ReportPlayerController@show')->middleware('isAdmin');
        Route::patch('report-players/{player}', 'App\Http\Controllers\Api\ReportPlayerController@update')->middleware('isAdmin');
        Route::delete('report-players/{player}', 'App\Http\Controllers\Api\ReportPlayerController@destroy')->middleware('isAdmin');

        Route::get('admin/gamemodes', 'App\Http\Controllers\Api\GameModeController@adminIndex')->middleware('isAdmin');
        Route::post('gamemodes', 'App\Http\Controllers\Api\GameModeController@store')->middleware('isAdmin');
        Route::get('gamemodes/{mode}', 'App\Http\Controllers\Api\GameModeController@show');
        Route::patch('gamemodes/{mode}', 'App\Http\Controllers\Api\GameModeController@update')->middleware('isAdmin');
        Route::delete('gamemodes/{mode}', 'App\Http\Controllers\Api\GameModeController@destroy')->middleware('isAdmin');

        Route::get('admin/updates', 'App\Http\Controllers\Api\UpdateController@adminIndex')->middleware('isAdmin');
        Route::post('updates', 'App\Http\Controllers\Api\UpdateController@store')->middleware('isAdmin');
        Route::get('updates/{update}', 'App\Http\Controllers\Api\UpdateController@show');
        Route::patch('updates/{update}', 'App\Http\Controllers\Api\UpdateController@update')->middleware('isAdmin');
        Route::delete('updates/{update}', 'App\Http\Controllers\Api\UpdateController@destroy')->middleware('isAdmin');

        Route::get('roles', 'App\Http\Controllers\Api\RoleController@index');
        Route::post('roles', 'App\Http\Controllers\Api\RoleController@store')->middleware('isAdmin');
        Route::get('roles/{role}', 'App\Http\Controllers\Api\RoleController@show');
        Route::patch('roles/{role}', 'App\Http\Controllers\Api\RoleController@update')->middleware('isAdmin');
        Route::delete('roles/{role}', 'App\Http\Controllers\Api\RoleController@destroy')->middleware('isAdmin');

        Route::get('permissions', 'App\Http\Controllers\Api\PermissionController@index')->middleware('isAdmin');
        Route::post('permissions', 'App\Http\Controllers\Api\PermissionController@store')->middleware('isAdmin');
        Route::get('permissions/{permission}', 'App\Http\Controllers\Api\PermissionController@show')->middleware('isAdmin');
        Route::patch('permissions/{permission}', 'App\Http\Controllers\Api\PermissionController@update')->middleware('isAdmin');
        Route::delete('permissions/{permission}', 'App\Http\Controllers\Api\PermissionController@destroy')->middleware('isAdmin');

        Route::get('users', 'App\Http\Controllers\Api\UserController@index');
        Route::get('users/{user}', 'App\Http\Controllers\Api\UserController@show');
        Route::patch('users/{user}', 'App\Http\Controllers\Api\UserController@update')->middleware('isAdmin');
        Route::delete('users/{user}', 'App\Http\Controllers\Api\UserController@destroy')->middleware('isAdmin');
        Route::get('profile', 'App\Http\Controllers\Api\AuthController@user');
        Route::patch('profile/{profile}', 'App\Http\Controllers\Api\AuthController@updateUser');

        Route::post('tags', 'App\Http\Controllers\Api\TagController@store')->middleware('isAdmin');
        Route::get('tags/{tag}', 'App\Http\Controllers\Api\TagController@show');
        Route::patch('tags/{tag}', 'App\Http\Controllers\Api\TagController@update')->middleware('isAdmin');
        Route::delete('tags/{tag}', 'App\Http\Controllers\Api\TagController@destroy')->middleware('isAdmin');

        Route::get('admin/showcases', 'App\Http\Controllers\Api\ShowCaseController@adminIndex')->middleware('isAdmin');
        Route::post('showcases', 'App\Http\Controllers\Api\ShowCaseController@store')->middleware('isAdmin');
        Route::get('showcases/{showcase}', 'App\Http\Controllers\Api\ShowCaseController@show');
        Route::patch('showcases/{showcase}', 'App\Http\Controllers\Api\ShowCaseController@update')->middleware('isAdmin');
        Route::delete('showcases/{showcase}', 'App\Http\Controllers\Api\ShowCaseController@destroy')->middleware('isAdmin');

        Route::get('admin/ranks', 'App\Http\Controllers\Api\RankController@adminIndex')->middleware('isAdmin');
        Route::post('ranks', 'App\Http\Controllers\Api\RankController@store')->middleware('isAdmin');
        Route::get('ranks/{rank}', 'App\Http\Controllers\Api\RankController@show');
        Route::patch('ranks/{rank}', 'App\Http\Controllers\Api\RankController@update')->middleware('isAdmin');
        Route::delete('ranks/{rank}', 'App\Http\Controllers\Api\RankController@destroy')->middleware('isAdmin');

        Route::get('orders', 'App\Http\Controllers\Api\OrderController@index');
        Route::get('admin/orders', 'App\Http\Controllers\Api\OrderController@index')->middleware('isAdmin');
        Route::post('orders', 'App\Http\Controllers\Api\OrderController@store');
        Route::get('orders/{order}', 'App\Http\Controllers\Api\OrderController@show');
        Route::get('/myorders/{order}', 'App\Http\Controllers\Api\OrderController@getUserOrders');
        Route::patch('orders/{order}/pay', 'App\Http\Controllers\Api\OrderController@updateOrderToPaid')->middleware('isAdmin');
        Route::patch('orders/{order}/delivered', 'App\Http\Controllers\Api\OrderController@updateOrderToDelivered')->middleware('isAdmin');

        // Route::apiResource('users', 'App\Http\Controllers\Api\AuthController');
        // Route::apiResource('admin/roles', 'App\Http\Controllers\Api\RoleController');
    });

});
