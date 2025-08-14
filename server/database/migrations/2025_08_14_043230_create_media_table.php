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
        Schema::create('media', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('name');
            $table->string('originalName');
            $table->enum('type', ['image', 'video', 'audio', 'document', 'archive'])->index('idx_media_type');
            $table->string('mimeType', 100);
            $table->bigInteger('size');
            $table->string('url', 500);
            $table->string('thumbnailUrl', 500)->nullable();
            $table->string('alt')->nullable();
            $table->text('caption')->nullable();
            $table->integer('uploadedBy')->index('idx_media_uploader');
            $table->timestamp('created_at')->nullable()->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->nullable()->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('media');
    }
};
