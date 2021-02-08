<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReportBugRequest;
use App\Http\Resources\ReportBugResource;
use App\Models\ReportBug;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ReportBugController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $reportBugs = ReportBug::info()->get();
        return ReportBugResource::collection($reportBugs);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ReportBugRequest $request)
    {
        $user_id = Auth::id();

        $reportBug = new ReportBug();
        
        $reportBug->user_id = $user_id;
        $reportBug->title = $request->title;
        $reportBug->description = $request->description;

        if ($request->hasFile('image')) {
            $reportBug->image = $request->file('image')->store('images/reportedBugs', 'public');
        } else {
            $reportBug->image = "no-image";
        }

        $reportBug->save();

        $response = [
            'message' => 'Bug reported successfully',
            'reportBug' => $reportBug
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
        $reportBug = ReportBug::info()->find($id);

        if ($reportBug) {
            return response()->json($reportBug);
        } else {
            return response()->json(["message" => "Reported bug can't be found"]);
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
        $reportBug = ReportBug::find($id);

        if ($reportBug) {
            $reportBug->status = $request->status;
            $reportBug->save();
        } else {
            $response = ['message' => 'Reported bug update failed'];
            return response()->json($response, 200);
        }

        $response = ['message' => 'Reported bug updated successfully'];
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
        $reportBug = ReportBug::find($id);

        if ($reportBug) {
            if ($reportBug->image != 'no-image') {
                Storage::disk('public')->delete($reportBug->image);
            }
            $reportBug->delete();
        }

        $response = ['message' => 'Report bug deleted successfully'];
        return response()->json($response, 200);
    }
}
