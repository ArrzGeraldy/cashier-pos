<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   
    public function up(): void
    {
        Schema::create('sale_details', function (Blueprint $table) {
            $table->id();
            $table->uuid("sale_id")->constrained()->onDelete('cascade');
            $table->string('discount_name')->nullable();
            $table->unsignedInteger('discount_min_unit')->nullable();
            $table->unsignedInteger('discount_value')->nullable();
            $table->unsignedInteger('discount_percentage')->nullable();
            $table->string("product_name");
            $table->string("product_cost");
            $table->unsignedInteger("product_price");
            $table->unsignedInteger("final_price");
            $table->unsignedInteger("quantity");
            $table->unsignedInteger("amount");
            $table->timestamps();
            $table->foreign('sale_id')->references('id')->on('sales')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sale_details');
    }
};
