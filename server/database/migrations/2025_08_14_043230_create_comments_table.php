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
        Schema::create('comments', function (Blueprint $table) {
            $table->integer('id', true);
            $table->integer('postId')->index('idx_comments_post');
            $table->integer('parentId')->nullable()->index('idx_comments_parent');
            $table->string('author', 100);
            $table->string('email');
            $table->text('content');
            $table->enum('status', ['pending', 'approved', 'spam', 'flagged'])->nullable()->default('pending')->index('idx_comments_status');
            $table->string('ipAddress', 45)->nullable();
            $table->text('userAgent')->nullable();
            $table->timestamp('created_at')->nullable()->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->nullable()->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};
