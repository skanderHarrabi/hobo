<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserRequest;
use App\Rules\MatchOldPassword;
use App\Rules\OldPasswordRequired;
use App\Rules\PasswordRequired;
use App\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class UserController extends Controller
{
  public $avatar = null;

  public function index()
  {
    $users = User::paginate(8);
    // we might add pagination here
    return response()->json($users);
  }

  public function store(Request $request)
  {
    $authController = new AuthController();
    $result = $authController->signup($request);
    return response()->json($result);
  }

  public function show($id)
  {
    $user = User::find($id);
    if ($user === null)
      return response()->json([
        'message' => 'User with this id is unavailable'
      ], 400);
    return response()->json($user, 200);
  }

  public function update(UpdateUserRequest $request, $id)
  {

    $user = User::where('id', $id)->first();
    if (empty($user))
      return response()->json([
        'message' => 'User with this id is unavailable'
      ], 400);

    $updates = $request->all();
    if ($request->hasFile('avatar')) {
      $this->validate($request, ['avatar' => 'image|mimes:jpeg,png,jpg,gif,svg|max:5000',]);
      $file = $request->file('avatar');
      $this->avatar = sha1(Carbon::now()->timestamp) . '.' . $file->getClientOriginalExtension();
      $request->file('avatar')->move("storage", $this->avatar);
      $updates['avatar'] = $this->avatar;
    }
    if (!empty($updates['password'])) {
      $validator = Validator::make($updates, [
        'old_password' => [new MatchOldPassword($user->password)],
        'password' => [new PasswordRequired]
      ]);
      if ($validator->fails()) {
        $response = new \stdClass();
        $response->errors = $validator->errors();
        return response()->json($response, 422);
      }
      $updates['password'] = bcrypt($updates['password']);
    }
    $user->update($updates);
    $user_with_residence = User::where("id", $user->id)->with("residence")->first();
    return response()->json($user_with_residence
      , 201);
  }

  public function destroy($id)
  {
    $user = User::find($id);
    if (empty($user))
      return response()->json([
        'message' => 'User with this id is unavailable'
      ], 400);
    $user->delete();
    //$user->delete();
    return response()->json([
      'message' => 'User was deleted'
    ], 200);
  }

}
