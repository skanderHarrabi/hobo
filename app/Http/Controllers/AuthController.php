<?php

namespace App\Http\Controllers;

use App\Http\Requests\SigninRequest;
use App\Http\Requests\SignupRequest;
use App\Http\Requests\ValidateAccountRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\User;
use Illuminate\Validation\Rule;

class AuthController extends Controller
{
  public $avatar = null;

  public function signup(SignupRequest $request)
  {
    // validation is done
    if ($request->hasFile('avatar')) {
      $this->validate($request, ['avatar' => 'image|mimes:jpeg,png,jpg,gif,svg|max:5000',]);
      $file = $request->file('avatar');
      $this->avatar = sha1(Carbon::now()->timestamp) . '.' . $file->getClientOriginalExtension();
      $request->file('avatar')->move("storage", $this->avatar);
    }
    $user = new User([
      'name' => $request->name,
      'email' => $request->email,
      'avatar' => empty($this->avatar) ? "/img/placeholder.jpg" : $this->avatar,
      'password' => bcrypt($request->password),
      'residence_id' => $request->residence,
      'apartment_number' => $request->apartment_number,
      'phone' => $request->phone,
    ]);

    $user->save();
    $tokenResult = $user->createToken('Personal Access Token');
    $token = $tokenResult->token;
    $token->save();
    $user_with_info = User::where("id", $user->id)->with("residence")->first();
    return response()->json([
      'user' => $user_with_info,
      'access_token' => $tokenResult->accessToken,
      'token_type' => 'Bearer',
      'expires_at' => Carbon::parse(
        $tokenResult->token->expires_at
      )->toDateTimeString()
    ]);
  }

  public function signin(SigninRequest $request)
  {
    $credentials = request(['email', 'password']);

    if (!Auth::attempt($credentials))
      return response()->json([
        'message' => 'Unauthorized'
      ], 401);

    $user = $request->user();

    $tokenResult = $user->createToken('Personal Access Token');

    $token = $tokenResult->token;

    if ($request->remember_me)
      $token->expires_at = Carbon::now()->addWeeks(1);
    $token->save();
    $user_with_info = User::where("id", $user->id)->with("residence")->first();
    return response()->json([
      'user' => $user_with_info,
      'access_token' => $tokenResult->accessToken,
      'token_type' => 'Bearer',
      'expires_at' => Carbon::parse(
        $tokenResult->token->expires_at
      )->toDateTimeString()
    ]);
  }

  public function user(Request $request)
  {
    $user_id = $request->user()->id;
    $user = User::where('id', $user_id)->with("residence")
      ->first();
    return response()->json($user);
  }

  public function logout(Request $request)
  {
    Auth::logout();
  }

  public function isAuth()
  {
    $user = Auth::user();
    if (!empty($user)){
      $pick = $user->pick()->get();
      if(count($pick->toarray()) > 0){
        $user["picked"] = true;
        return response()->json($user);
      }else{
        $user["picked"] = false;
        return response()->json($user);
      }
    }

    return response()->json("Unauthenticated", 403);
  }

  public function validateAccount(ValidateAccountRequest $request)
  {
    $user = Auth::user();
    $user->update($request->all());
    return response()->json($user);
  }

}
