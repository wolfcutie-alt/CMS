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
        Schema::create('post_seo', function (Blueprint $table) {
            $table->integer('id', true);
            $table->integer('postId')->unique('idx_post_seo_post');
            $table->string('metaTitle')->nullable();
            $table->text('metaDescription')->nullable();
            $table->json('keywords')->nullable();
            $table->timestamp('created_at')->nullable()->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->nullable()->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('post_seo');
    }
};
