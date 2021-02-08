<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReportPlayerRequest;
use App\Http\Resources\ReportPlayerResource;
use App\Models\ReportPlayer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ReportPlayerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $reportPlayers = ReportPlayer::info()->get();
        return ReportPlayerResource::collection($reportPlayers);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ReportPlayerRequest $request)
    {
        $user_id = Auth::id();
        
        $reportPlayer = new ReportPlayer();
        
        $reportPlayer->user_id = $user_id;
        $reportPlayer->user_reported = $request->user_reported;
        $reportPlayer->title = $request->title;
        $reportPlayer->description = $request->description;

        if ($request->hasFile('image')) {
            $reportPlayer->image = $request->file('image')->store('images/reportedPlayers', 'public');
        } else {
            $reportPlayer->image = "no-image";
        }

        $reportPlayer->save();

        $response = [
            'message' => 'Player reported successfully',
            'reportPlayer' => $reportPlayer
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
        $reportPlayer = ReportPlayer::info()->find($id);

        if ($reportPlayer) {
            return response()->json($reportPlayer);
        } else {
            return response()->json(["message" => "Reported player can't be found"]);
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
        $reportPlayer = ReportPlayer::find($id);

        $user_id = Auth::id();
        $user = User::find($user_id);

        if ($reportPlayer) {
            $reportPlayer->status = $request->status;
            $reportPlayer->admin_name = $user->name;

            $reportPlayer->save();
        } else {
            $response = ['message' => 'Reported player update failed'];
            return response()->json($response, 200);
        }

        $response = ['message' => 'Reported player updated successfully'];
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
        $reportPlayer = ReportPlayer::find($id);

        if ($reportPlayer) {
            if ($reportPlayer->image != 'no-image') {
                Storage::disk('public')->delete($reportPlayer->image);
            }
            $reportPlayer->delete();
        }

        $response = ['message' => 'Report player deleted successfully'];
        return response()->json($response, 200);
    }
}
