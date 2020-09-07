<?php

use App\User;
use Illuminate\Support\Facades\Route;

Route::group([
  'prefix' => 'auth'
], function () {
  Route::post('signin', 'AuthController@signin');
  Route::post('signup', 'AuthController@signup');
  Route::group([
    'middleware' => 'auth:api',
  ], function () {
    Route::get('logout', 'AuthController@logout');
    Route::get('user', 'AuthController@user');
  });
});


Route::resource("users", "UserController");
Route::resource("games", "GameController");
Route::post("storeuser", "Api\UserController@store");
Route::get("all_questions", "Api\QuestionController@index");


