<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
  public function suggestion()
  {
    return $this->belongsTo(Suggestion::class);
  }
}
