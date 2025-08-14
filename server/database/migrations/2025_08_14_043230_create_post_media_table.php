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
        Schema::create('post_media', function (Blueprint $table) {
            $table->integer('id', true);
            $table->integer('postId');
            $table->integer('mediaId')->index('mediaid');
            $table->timestamp('created_at')->nullable()->useCurrent();

            $table->unique(['postId', 'mediaId'], 'idx_post_media_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('post_media');
    }
};
