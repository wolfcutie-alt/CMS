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
        Schema::create('analytics', function (Blueprint $table) {
            $table->integer('id', true);
            $table->enum('type', ['view', 'comment', 'share', 'download', 'login'])->index('idx_analytics_type');
            $table->enum('entityType', ['post', 'media', 'user', 'page']);
            $table->integer('entityId');
            $table->integer('userId')->nullable()->index('idx_analytics_user');
            $table->string('ipAddress', 45)->nullable();
            $table->text('userAgent')->nullable();
            $table->json('metadata')->nullable();
            $table->timestamp('created_at')->nullable()->useCurrent()->index('idx_analytics_date');

            $table->index(['entityType', 'entityId'], 'idx_analytics_entity');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('analytics');
    }
};
