<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAnswersTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('answers', function (Blueprint $table) {
      $table->bigIncrements('id');
      $table->text('answer')->nullable();
      $table->boolean('is_image')->nullable();
      $table->text('image')->nullable();
      $table->integer('order')->nullable();
      $table->string('code')->nullable();
      // relations
      $table->unsignedBigInteger('suggestion_id');
      $table->foreign('suggestion_id')->references('id')->on('suggestions');
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
    Schema::dropIfExists('answers');
  }
}
