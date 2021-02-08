<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\TagRequest;
use App\Http\Resources\TagResource;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Http\Request;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tags = Tag::info()->get();
        return TagResource::collection($tags);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(TagRequest $request)
    {
        $tag = new Tag();

        $tag->name = $request->name;

        $tag->save();

        $response = [
            'message' => 'Tag created successfully',
            'tag' => $tag
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
        $tag = Tag::info()->find($id);

        if ($tag) {
            return response()->json($tag);
        } else {
            return response()->json(["message" => "Tag can't be found"]);
        }
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
        $tag = Tag::find($id);

        if ($tag) {
            $tag->name = $request->name;
            $tag->save();
        } else {
            $response = ['message' => 'Tag update failed'];
            return response()->json($response, 200);
        }

        $response = ['message' => 'Tag updated successfully'];
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
        $tag = Tag::find($id);

        if ($tag) {
            $tag->users()->detach();
            $tag->delete();
        }

        $response = ['message' => 'Tag deleted successfully'];
        return response()->json($response, 200);
    }
}
