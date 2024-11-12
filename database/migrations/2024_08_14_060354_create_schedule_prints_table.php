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
        Schema::create('schedule_prints', function (Blueprint $table) {
            $table->id();
            $table->string('line');
            $table->date('schedule')->nullable();
            $table->date('release');
            $table->string('style_number');
            $table->string('model_name');
            $table->float('qty');
            $table->unsignedBigInteger('model_for_material_id')->nullable();
            $table->foreign('model_for_material_id')->references('id')->on('model_for_materials')->onDelete('cascade');
            $table->enum('status', ['printing', 'printed'])->nullable();
            $table->unsignedBigInteger('status_updated_by')->nullable();
            $table->foreign('status_updated_by')->references('id')->on('users')->onDelete('cascade');
            $table->date('status_updated_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schedule_prints');
    }
};