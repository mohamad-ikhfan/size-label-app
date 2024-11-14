<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $data = [
            [
                'full_name' => 'Mohamad Ikhfan',
                'name' => '20535',
                'email' => 'label.ppic@pai.pratama.net',
                'password' => bcrypt('20535')
            ],
            [
                'full_name' => 'N Tri Dayanti',
                'name' => '43682',
                'email' => 'tri.ppic@pai.pratama.net',
                'password' => bcrypt('43682')
            ],
        ];

        for ($i = 0; $i < count($data); $i++) {
            $user = User::where('name', $data[$i]['name'])->first();
            if (!$user) {
                if ($data[$i]['name'] == '20535') {
                    $user = User::create($data[$i]);
                } else {
                    User::create($data[$i]);
                }
            }
        }

        $this->call(NameLineSeeder::class);

        // User::factory(100)->create();
    }
}