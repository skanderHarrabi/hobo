<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PickSuggestion extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('pick_suggestion', function (Blueprint $table) {
      // relations
      $table->unsignedBigInteger('suggestion_id');
      $table->foreign('suggestion_id')->references('id')->on('suggestions')->onDelete("cascade");;
      $table->unsignedBigInteger('pick_id');
      $table->foreign('pick_id')->references('id')->on('picks')->onDelete("cascade");;
      // end relations
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('pick_suggestion');
  }
}
