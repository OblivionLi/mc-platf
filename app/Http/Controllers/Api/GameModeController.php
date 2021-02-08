<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\GameModeRequest;
use App\Http\Resources\GameModeResource;
use App\Models\GameMode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class GameModeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $gameModes = GameMode::info()->paginate(6);
        return GameModeResource::collection($gameModes);
    }

    public function adminIndex()
    {
        $gameModes = GameMode::info()->get();
        return GameModeResource::collection($gameModes);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(GameModeRequest $request)
    {
        $user_id = Auth::id();

        $gameMode = new GameMode();
        
        $gameMode->user_id = $user_id;
        $gameMode->title = $request->title;
        $gameMode->description = $request->description;

        if ($request->hasFile('image')) {
            $gameMode->image = $request->file('image')->store('images/gameModes', 'public');
        } else {
            $gameMode->image = "no-image";
        }

        $gameMode->save();

        $response = [
            'message' => 'Game Mode created successfully'
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
        $gameMode = GameMode::info()->find($id);

        if ($gameMode) {
            return response()->json($gameMode);
        } else {
            return response()->json(["message" => "Game Mode can't be found"]);
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
        $gameMode = GameMode::find($id);

        if ($gameMode) {
            $user_id = Auth::id();

            $gameMode->user_id = $user_id;
            $gameMode->title = $request->title;
            $gameMode->description = $request->description;

            $gameMode->save();
        } else {
            $response = ['message' => 'Game Mode edit failed', $gameMode];
            return response()->json($response, 200);
        }

        $response = ['message' => 'Game Mode edit successfully'];
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
        $gameMode = GameMode::find($id);

        if ($gameMode) {
            if ($gameMode->image != 'no-image') {
                Storage::disk('public')->delete($gameMode->image);
            }
            $gameMode->delete();
        }

        $response = ['message' => 'Game Mode deleted successfully'];
        return response()->json($response, 200);
    }
}
