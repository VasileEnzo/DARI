<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
   public function up(): void {
    Schema::create('posts', function (Blueprint $table) {
        $table->id();
        $table->enum('type', ['environment','incident']);
        $table->string('title');
        $table->text('description')->nullable();
        $table->foreignId('category_id')->constrained()->cascadeOnDelete();
        $table->foreignId('state_id')->constrained('states');
        $table->unsignedTinyInteger('level')->nullable(); // severidad (1-3) para incident
        $table->boolean('anonymous')->default(false);
        $table->decimal('lat', 10, 7)->nullable();
        $table->decimal('lng', 10, 7)->nullable();
        $table->string('address')->nullable();
        $table->foreignId('created_by')->constrained('users')->cascadeOnDelete();
        $table->timestamps();
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
