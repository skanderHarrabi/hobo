<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCodesTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('codes', function (Blueprint $table) {
      $table->bigIncrements('id');
      $table->timestamps();
    });
    DB::update("ALTER TABLE codes AUTO_INCREMENT = 1111;");

  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('codes');
  }
}
