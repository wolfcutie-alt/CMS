<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('comment', function (Blueprint $table) {
            $table->id('id');
            $table->string('author');
            $table->string('email');
            $table->string('avatar');
            $table->string('content');
            $table->foreignId('post_id')->constrained()->onDelete('cascade');
            $table->string('status');
            $table->integer('replies');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comment');
    }
};
