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
        Schema::table('post_media', function (Blueprint $table) {
            $table->foreign(['postId'], 'post_media_ibfk_1')->references(['id'])->on('posts')->onUpdate('no action')->onDelete('cascade');
            $table->foreign(['mediaId'], 'post_media_ibfk_2')->references(['id'])->on('media')->onUpdate('no action')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('post_media', function (Blueprint $table) {
            $table->dropForeign('post_media_ibfk_1');
            $table->dropForeign('post_media_ibfk_2');
        });
    }
};
