<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReponseValidation extends FormRequest
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
            'yes_or_no' => 'required',
            'question_id' => 'required'
        ];
    }
    public function messages()
    {
      return [
        'yes_or_no.required' => 'you have to answer with yes or no',
        'question_id.required' => 'question_id is required'
      ];
    }
}
