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
        Schema::create('posts', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('title');
            $table->string('slug')->index('idx_posts_slug');
            $table->text('excerpt')->nullable();
            $table->longText('content');
            $table->enum('status', ['draft', 'published', 'archived'])->nullable()->default('draft')->index('idx_posts_status');
            $table->integer('authorId')->index('idx_posts_author');
            $table->integer('categoryId')->nullable()->index('idx_posts_category');
            $table->string('featuredImage')->nullable();
            $table->integer('views')->nullable()->default(0);
            $table->integer('likes')->nullable()->default(0);
            $table->integer('shares')->nullable()->default(0);
            $table->timestamp('publishedAt')->nullable()->index('idx_posts_published');
            $table->timestamp('created_at')->nullable()->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->nullable()->useCurrent();

            $table->unique(['slug'], 'slug');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
