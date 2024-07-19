<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Category;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'Super Admin',
            'role' => 'super admin',
            'email' => 'super@gmail.com',
        ]);
        \App\Models\Category::factory()->create([
            'category_name' => "Makanan"
        ]);
        \App\Models\Category::factory()->create([
            'category_name' => "Minuman"
        ]);
        \App\Models\Category::factory()->create([
            'category_name' => "Ice Cream"
        ]);

        \App\Models\Product::factory()->create([
            'name' => "Nasi",
            'cost' => 2000,
            'price' => 5000,
            'category_id' => 1,
            'image' => "uploads/dummy/dummy-product.png",
            'stock' => 99999
        ]);

        \App\Models\Product::factory()->create([
            'name' => "Magnum",
            'cost' => 1000,
            'price' => 4000,
            'category_id' => 2,
            'image' => "uploads/dummy/dummy-product.png",
            'stock' => 99999
        ]);
    }
}
