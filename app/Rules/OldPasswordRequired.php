<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class OldPasswordRequired implements Rule
{
  /**
   * Create a new rule instance.
   *
   * @return void
   */
  public function __construct()
  {
    //
  }

  /**
   * Determine if the validation rule passes.
   *
   * @param string $attribute
   * @param mixed $value
   * @return bool
   */
  public function passes($attribute, $value)
  {
    return $value==="ok";
  }

  /**
   * Get the validation error message.
   *
   * @return string
   */
  public function message()
  {
    return 'Votre ancien mot de passe est obligatoire.';
  }
}
