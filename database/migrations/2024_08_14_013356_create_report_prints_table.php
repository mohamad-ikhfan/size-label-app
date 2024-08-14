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
        Schema::create('report_prints', function (Blueprint $table) {
            $table->id();
            $table->date('printed_at');
            $table->integer('line');
            $table->date('release');
            $table->bigInteger('po_number')->nullable();
            $table->string('style_number');
            $table->string('model_name')->nullable();
            $table->float('qty');
            $table->string('special')->nullable();
            $table->string('remark')->nullable();
            $table->foreignId('printed_by')->constrained('users')->onDelete('cascade')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('report_prints');
    }
};