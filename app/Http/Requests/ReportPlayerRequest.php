<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReportPlayerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'user_reported' => 'required',
            'title' => 'required',
            'status' => 'string',
            'description' => 'required',
            'image' => 'image|mimes:jpg,png,jpeg|max:5000',
        ];
    }
}
