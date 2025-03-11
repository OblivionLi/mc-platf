<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrderStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'payment_method' => 'string|required',
            'total_price' => 'numeric|required',
            'cartItems' => 'required|array',
            'cartItems.*.rank' => 'required|numeric|exists:ranks,id',
        ];
    }
}
