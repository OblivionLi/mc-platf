<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ShowCaseRequest;
use App\Http\Resources\ShowCaseResource;
use App\Models\ShowCase;
use Illuminate\Http\Request;

class ShowCaseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $showCases = ShowCase::paginate(2);
        return ShowCaseResource::collection($showCases);
    }

    public function adminIndex()
    {
        $showCases = ShowCase::all();
        return ShowCaseResource::collection($showCases);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ShowCaseRequest $request)
    {
        $showCase = new ShowCase();
        
        $showCase->name = $request->name;
        $showCase->video_url = $request->video_url;

        $showCase->save();

        $response = [
            'message' => 'Show Case created successfully'
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
        $showCase = ShowCase::find($id);

        if ($showCase) {
            return response()->json($showCase);
        } else {
            return response()->json(["message" => "Show Case can't be found"]);
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
        $showCase = ShowCase::find($id);

        if ($showCase) {
            $showCase->name = $request->name;
            $showCase->video_url = $request->video_url;

            $showCase->save();
        } else {
            $response = ['message' => 'Show Case edit failed', $showCase];
            return response()->json($response, 200);
        }

        $response = ['message' => 'Show Case edit successfully'];
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
        $showCase = ShowCase::find($id);

        if ($showCase) {
            $showCase->delete();
        }

        $response = ['message' => 'Show Case deleted successfully'];
        return response()->json($response, 200);
    }
}
