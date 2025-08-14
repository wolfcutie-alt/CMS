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
        Schema::create('users', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('name', 50);
            $table->string('email')->unique('email');
            $table->string('password');
            $table->enum('role', ['admin', 'editor', 'author'])->nullable()->default('author')->index('idx_users_role');
            $table->string('avatar')->nullable();
            $table->enum('status', ['active', 'inactive', 'pending'])->nullable()->default('pending')->index('idx_users_status');
            $table->timestamp('lastLogin')->nullable();
            $table->timestamp('created_at')->nullable()->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->nullable()->useCurrent();

            $table->index(['email'], 'idx_users_email');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
