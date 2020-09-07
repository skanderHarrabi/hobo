<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSuggestionsTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('suggestions', function (Blueprint $table) {
      $table->bigIncrements('id');
      $table->text('suggestion');
      $table->text('code')->nullable();
      // relations
      $table->unsignedBigInteger('question_id');
      $table->foreign('question_id')->references('id')->on('questions');

      $table->unsignedBigInteger('next_question_id')->nullable();
      $table->foreign('next_question_id')->references('id')->on('questions');
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
    Schema::dropIfExists('suggestions');
  }
}
