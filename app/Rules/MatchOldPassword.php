<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Hash;

class MatchOldPassword implements Rule
{
  public $old_password;

  /**
   * Create a new rule instance.
   *
   * @param $old_password
   */
  public function __construct( $old_password)
  {
    $this->old_password = $old_password;
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
    return Hash::check($value, $this->old_password);
  }

  /**
   * Get the validation error message.
   *
   * @return string
   */
  public function message()
  {
    return "Votre ancien mot de passe est n'est pas valide";
  }
}
