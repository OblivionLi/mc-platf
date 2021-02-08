<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateRequest;
use App\Http\Resources\UpdateResource;
use App\Models\Update;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class UpdateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $updates = Update::info()->paginate(6);
        return UpdateResource::collection($updates);
    }

    public function adminIndex()
    {
        $updates = Update::info()->get();
        return UpdateResource::collection($updates);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(UpdateRequest $request)
    {
        $user_id = Auth::id();

        $update = new Update();

        $update->user_id = $user_id;
        $update->name = $request->name;
        $update->version = $request->version;
        $update->brief_description = $request->brief_description;
        $update->full_description = $request->full_description;

        if ($request->hasFile('image')) {
            $update->image = $request->file('image')->store('images/updates', 'public');
        } else {
            $update->image = "no-image";
        }

        $update->save();

        $response = [
            'message' => 'Update created successfully'
        ];

        return response()->json($response, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $update = Update::info()->find($id);

        return response()->json($update, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $update = Update::find($id);

        if ($update) {
            $user_id = Auth::id();

            $update->user_id = $user_id;
            $update->name = $request->name;
            $update->version = $request->version;
            $update->brief_description = $request->brief_description;
            $update->full_description = $request->full_description;

            $update->save();
        } else {
            $response = ['message' => 'Update edit failed', $update];
            return response()->json($response, 200);
        }

        $response = ['message' => 'Update edit successfully'];
        return response()->json($response, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $update = Update::find($id);

        if ($update) {
            if ($update->image != 'no-image') {
                Storage::disk('public')->delete($update->image);
            }
            $update->delete();
        }

        $response = ['message' => 'Update deleted successfully'];
        return response()->json($response, 200);
    }
}
