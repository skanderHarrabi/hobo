<?php

namespace App\Http\Controllers;

use Laravel\Socialite\Facades\Socialite;
use App\User;

class SocialController extends Controller
{
  public function redirect($provider)
  {
    return Socialite::driver('facebook')->redirect();
  }

  public function callback($provider)
  {
    $getInfo = Socialite::driver('facebook')->user();
    $user = $this->createUser($getInfo, $provider);
    auth()->login($user);
    if ($user->phone)
      return redirect("/chat");
    return redirect("/signup");

  }

  function createUser($getInfo, $provider)
  {
    $user = User::where('provider_id', $getInfo->id)->first();
    if (!$user) {
      $user = User::create([
        'name' => $getInfo->name,
        'email' => $getInfo->email,
        'provider' => $provider,
        'provider_id' => $getInfo->id
      ]);
    }
    return $user;
  }
}