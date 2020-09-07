<?php


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::group(['prefix' => env("BACKEND_PREFIX")], function () {
  Route::get('/redirect/{provider}', 'SocialController@redirect');
  Route::get('/callback/{provider}', 'SocialController@callback');

  Route::get('/is-auth', 'AuthController@isAuth');
  Route::post('/validate-account', 'AuthController@validateAccount');
  Route::get('/logout', 'AuthController@logout');
  Route::get('/question/{code}', 'Api\QuestionController@getQuestionByCode');
  Route::get('/response/{code}', 'Api\QuestionController@getPartitionsByResponse');

  Route::get('get-question', 'Api\QuestionController@getQuestion');
  Route::get('next-question/{id}', 'Api\QuestionController@getNextQuestion');
  Route::get('question/{question_id}/suggestion/{suggestion_id}/answers', 'Api\QuestionController@getQuestionAnswersBySuggestion');

  Route::post('save-picks', 'PickController@saveUserPicks');
  Route::post('get-voucher', 'Api\QuestionController@getVoucher');
});

Route::get('/x', function(){
  $pick = \App\User::first()->pick()->get();
  if(count($pick->toarray())){

  }
  dd(count($pick->toarray()));
});

Route::get('/{any}', function () {
  return view("welcome");
})->where('any', '^(?!nova).*$');



/*Route::get('/{path?}', function () {
  return view("welcome");
});*/




