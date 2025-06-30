<?php

namespace Database\Factories;
use Illuminate\Support\Str;

use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Payment>
 */
class PaymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'order_id' => Order::factory(),
            'user_id' => User::factory(),
            'method' => fake()->randomElement(['credit_card', 'paypal', 'cash']),
            'amount' => fake()->randomFloat(2, 10, 500),
            'status' => fake()->randomElement(['pending', 'paid', 'failed']),
            'transaction_id' => Str::uuid(),
            'paid_at' => now(),
        ];
    }
}
