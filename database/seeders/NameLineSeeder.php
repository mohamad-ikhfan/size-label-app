<?php

namespace Database\Seeders;

use App\Models\NameLine;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NameLineSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $datas = [
            [
                'old_name' => '1',
                'new_name' => 'JXB-01',
            ],
            [
                'old_name' => '2',
                'new_name' => 'JXB-02',
            ],
            [
                'old_name' => '3',
                'new_name' => 'JXB-03',
            ],
            [
                'old_name' => '4',
                'new_name' => 'JXB-04',
            ],
            [
                'old_name' => '5',
                'new_name' => 'JXB-05',
            ],
            [
                'old_name' => '6',
                'new_name' => 'JXB-06',
            ],
            [
                'old_name' => '7',
                'new_name' => 'JXB-07',
            ],
            [
                'old_name' => '8',
                'new_name' => 'JXB-08',
            ],

            [
                'old_name' => '11',
                'new_name' => 'JXD-03',
            ],
            [
                'old_name' => '12',
                'new_name' => 'JXD-04',
            ],
            [
                'old_name' => '13',
                'new_name' => 'JXD-05',
            ],
            [
                'old_name' => '14',
                'new_name' => 'JXD-06',
            ],
            [
                'old_name' => '15',
                'new_name' => 'JXD-07',
            ],
            [
                'old_name' => '16',
                'new_name' => 'JXD-08',
            ],

            [
                'old_name' => '17',
                'new_name' => 'JXG-01',
            ],
            [
                'old_name' => '18',
                'new_name' => 'JXG-02',
            ],
            [
                'old_name' => '19',
                'new_name' => 'JXG-03',
            ],
            [
                'old_name' => '20',
                'new_name' => 'JXG-04',
            ],
            [
                'old_name' => '21',
                'new_name' => 'JXG-05',
            ],
            [
                'old_name' => '22',
                'new_name' => 'JXG-06',
            ],
            [
                'old_name' => '23',
                'new_name' => 'JXG-07',
            ],
            [
                'old_name' => '24',
                'new_name' => 'JXG-08',
            ],

            [
                'old_name' => '25',
                'new_name' => 'JXH-01',
            ],
            [
                'old_name' => '26',
                'new_name' => 'JXH-02',
            ],
            [
                'old_name' => '27',
                'new_name' => 'JXH-03',
            ],
            [
                'old_name' => '28',
                'new_name' => 'JXH-04',
            ],
            [
                'old_name' => '29',
                'new_name' => 'JXH-05',
            ],
            [
                'old_name' => '30',
                'new_name' => 'JXH-06',
            ],
            [
                'old_name' => '31',
                'new_name' => 'JXH-07',
            ],
            [
                'old_name' => '32',
                'new_name' => 'JXH-08',
            ],
        ];

        for ($i = 0; $i < count($datas); $i++) {
            $nameLine = NameLine::where('old_name', $datas[$i]['old_name'])->first();
            if (!$nameLine) {
                $nameLine = NameLine::create($datas[$i]);
            }
        }
    }
}