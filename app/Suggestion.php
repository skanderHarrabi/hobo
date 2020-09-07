<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Suggestion extends Model
{
  public function question()
  {
    return $this->belongsTo(Question::class);
  }

  public function next_question()
  {
    return $this->belongsTo(Question::class,'next_question_id');
  }

  public function answers()
  {
    return $this->hasMany(Answer::class);
  }

  public function picks()
  {
    return $this->belongsToMany(Pick::class,'pick_suggestion');
  }

}
