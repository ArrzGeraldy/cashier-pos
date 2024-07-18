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
        Schema::create('sales', function (Blueprint $table) {
            $table->uuid('id')->primary(); 
            $table->string("customer_name");
            $table->unsignedInteger("total_payment")->default(0);
            $table->unsignedInteger("total_cost")->default(0);
            $table->unsignedInteger("total_price");
            $table->string("payment_type")->nullable();
            $table->string("qris_url")->nullable();
            $table->unsignedInteger("money_changes")->default(0);
            $table->string("status")->default("UNPAID");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales');
    }
};
