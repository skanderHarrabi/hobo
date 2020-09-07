<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ValidateAccountRequest extends FormRequest
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
      'phone' => 'required',
      'name' => 'required',
      'birth_date' => 'required',
      'email' => 'required',
    ];
  }

  public function messages()
  {
    return [
      'phone.required' => 'يرجى إدخال رقم الهاتف',
      'name.required' => 'يرجى إدخال الإسم ',
      'birth_date.required' => 'يرجى إدخال تاريخ الولادة',
      'email.required' => 'يرجى إدخال البريد ',
    ];
  }
}
