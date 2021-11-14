<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\MediaStoreRequest;
use App\Models\Media;
use Illuminate\Http\Request;

class MediaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $media = Media::all();
        return response()->json($media);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(MediaStoreRequest $request)
    {
        $media = new Media();
        
        $media->name = $request->name;
        $media->href = $request->href;

        $media->save();

        $response = [
            'message' => 'Media created successfully'
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
        $media = Media::find($id);

        if ($media) {
            return response()->json($media);
        } else {
            return response()->json(["message" => "Media can't be found"]);
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
        $media = Media::find($id);

        if ($media) {
            $media->name = $request->name;
            $media->href = $request->href;

            $media->save();
        } else {
            $response = ['message' => 'Media edit failed', $media];
            return response()->json($response, 200);
        }

        $response = ['message' => 'Media edit successfully'];
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
        $media = Media::find($id);

        if ($media) {
            $media->delete();
        }

        $response = ['message' => 'Media deleted successfully'];
        return response()->json($response, 200);
    }
}
