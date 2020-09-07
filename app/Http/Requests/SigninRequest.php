<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SigninRequest extends FormRequest
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
    return [
      'email' => 'required|email',
      'password' => 'required',
    ];
  }

  public function messages()
  {
    return [
      'email.required' => 'Le champ E-mail est obligatoire.',
      'email.email' => "Votre e-mail n'est pas valide.",
      'password.required' => "Veuillez saisir votre mot de passe.",
    ];
  }


}
