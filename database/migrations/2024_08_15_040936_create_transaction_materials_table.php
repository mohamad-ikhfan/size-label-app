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
        Schema::create('transaction_materials', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->enum('type', ['taking', 'comming', 'stock_opname']);
            $table->foreignId('material_id')->constrained('materials')->onDelete('cascade');
            $table->float('qty');
            $table->unsignedBigInteger('first_stock_id')->nullable();
            $table->foreign('first_stock_id')->references('id')->on('stock_materials')->onDelete('cascade');
            $table->unsignedBigInteger('last_stock_id')->nullable();
            $table->foreign('last_stock_id')->references('id')->on('stock_materials')->onDelete('cascade');
            $table->foreignId('transaction_by')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaction_materials');
    }
};