<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pick extends Model
{

  public function suggestions()
  {
    return $this->belongsToMany(Suggestion::class, 'pick_suggestion');
  }

  public function user()
  {
    return $this->belongsTo(User::class);
  }
}
