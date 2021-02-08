<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRanksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ranks', function (Blueprint $table) {
            $table->id();
            $table->string('type');
            $table->string('name');
            $table->decimal('price', 8, 2);
            $table->integer('discount')->nullable();
            $table->string('kit');
            $table->string('money');
            $table->string('protection_blocks');
            $table->boolean('full_access')->default(0);
            $table->boolean('server_config')->default(0);
            $table->boolean('bypass_uri')->default(0);
            $table->boolean('essentials')->default(0);
            $table->boolean('mute')->default(0);
            $table->boolean('kick')->default(0);
            $table->boolean('temp_ban')->default(0);
            $table->boolean('fly')->default(0);
            $table->boolean('clear_chat')->default(0);
            $table->boolean('keep_inv')->default(0);
            $table->boolean('keep_exp')->default(0);
            $table->boolean('jail')->default(0);
            $table->boolean('nickname')->default(0);
            $table->boolean('world_edit')->default(0);
            $table->boolean('enderchat')->default(0);
            $table->boolean('gamemode')->default(0);
            $table->boolean('color_nickname')->default(0);
            $table->boolean('tp')->default(0);
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
        Schema::dropIfExists('ranks');
    }
}
