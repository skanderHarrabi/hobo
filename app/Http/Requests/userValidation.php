<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class userValidation extends FormRequest
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
            'phone' => 'required|max:8|min:8',
            'email' => 'required|email|unique:users',
            'datenaiss' =>'required',
            'name' => 'required'
        ];
    }
    public function messages()
    {
      return [
        'phone.required' => 'phone number is required',
        'email.required' => 'email is required',
        'email.email' => 'email format invalid',
        'datenaiss.required' => 'birth day is required',
        'name.required' => 'name is required'
      ];
    }
}
