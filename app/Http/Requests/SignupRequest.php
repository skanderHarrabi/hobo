<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SignupRequest extends FormRequest
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
      'name' => 'required|string',
      'email' => 'required|string|email|unique:users',
      'password' => 'required|string|confirmed|min:4',
      'residence' => 'required',
      'phone' => 'required|min:8',
    ];
  }

  public function messages()
  {
    return [
      'name.required' => 'Veuillez saisir votre nom & prénom.',
      'name.string' => 'Veuillez saisir un vrai nom & prénom.',
      'email.required' => 'Le champ E-mail est obligatoire.',
      'email.email' => "Votre e-mail n'est pas valide.",
      'email.unique' => "Votre e-mail adress est déjà utilisé.",
      'password.required' => "Veuillez saisir votre mot de passe.",
      'password.confirmed' => "Votre mot de passe ne correspond pas à la confirmation.",
      'password.min' => "Votre mot de passe doit contenir au moins 4 charactères.",
      'residence.required' => "Veuillez choisir votre résidence.",
      'phone.required' => "Veuillez saisir votre numéro de tél.",
      'phone.min' => "Votre numéro de tel doit au moins 8 chiffres.",
    ];
  }
}
