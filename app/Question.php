<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
  protected $fillable = [
    'question', 'code'
  ];

  public function suggestions()
  {
    return $this->hasMany(Suggestion::class);
  }

  public function answers()
  {
    return $this->hasManyThrough(Answer::class, Suggestion::class);
  }


}
