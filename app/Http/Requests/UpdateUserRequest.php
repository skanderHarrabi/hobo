<?php

namespace App\Http\Requests;

use App\User;
use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   *
   * @return bool
   */
  public function authorize()
  {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array
   */
  public function rules()
  {
    $user_id = User::where('email', $this->email)->first()->id;
    return [
      'name' => 'string',
      'email' => 'string|email|unique:users,email,' . $user_id,
      'password' => 'string|confirmed|min:4',
      'residence' => 'string',
      'phone' => 'min:8',
    ];
  }

  public function messages()
  {
    return [
      'name.string' => 'Veuillez saisir un vrai nom & prénom.',
      'email.email' => "Votre e-mail n'est pas valide.",
      'email.unique' => "Votre e-mail adress est déjà utilisé.",
      'password.confirmed' => "Votre mot de passe ne correspond pas à la confirmation.",
      'password.min' => "Votre mot de passe doit contenir au moins 4 charactères.",
      'phone.min' => "Votre numéro de tel doit au moins 8 chiffres.",
    ];
  }
}
