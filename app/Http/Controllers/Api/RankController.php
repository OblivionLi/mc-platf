<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\RankResource;
use App\Models\Rank;
use Illuminate\Http\Request;

class RankController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $vips = Rank::where('type', 'vip')->get();
        $admins = Rank::where('type', 'admin')->get();

        $staff = collect($vips)->merge($admins);

        return RankResource::collection($staff);
    }

    public function adminIndex()
    {
        $vips = Rank::where('type', 'vip')->get();
        $admins = Rank::where('type', 'admin')->get();

        $staff = collect($vips)->merge($admins);
        return RankResource::collection($staff);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $rank = new Rank();

        $rank->type = $request->type;
        $rank->name = $request->name;
        $rank->price = $request->price;
        $rank->discount = $request->has('discount') ? $request->discount : 0;
        $rank->kit = $request->kit;
        $rank->money = $request->money;
        $rank->protection_blocks = $request->protection_blocks;
        
        isset($request->full_access['full_access']) ? $rank->full_access = 1 : $rank->full_access = 0;
        isset($request->server_config['server_config']) ? $rank->server_config = 1 : $rank->server_config = 0;
        isset($request->bypass_uri['bypass_uri']) ? $rank->bypass_uri = 1 : $rank->bypass_uri = 0;
        isset($request->essentials['essentials']) ? $rank->essentials = 1 : $rank->essentials = 0;
        isset($request->mute['mute']) ? $rank->mute = 1 : $rank->mute = 0;
        isset($request->kick['kick']) ? $rank->kick = 1 : $rank->kick = 0;
        isset($request->temp_ban['temp_ban']) ? $rank->temp_ban = 1 : $rank->temp_ban = 0;
        isset($request->fly['fly']) ? $rank->fly = 1 : $rank->fly = 0;
        isset($request->clear_chat['clear_chat']) ? $rank->clear_chat = 1 : $rank->clear_chat = 0;
        isset($request->keep_inv['keep_inv']) ? $rank->keep_inv = 1 : $rank->keep_inv = 0;
        isset($request->keep_exp['keep_exp']) ? $rank->keep_exp = 1 : $rank->keep_exp = 0;
        isset($request->jail['jail']) ? $rank->jail = 1 : $rank->jail = 0;
        isset($request->nickname['nickname']) ? $rank->nickname = 1 : $rank->nickname = 0;
        isset($request->world_edit['world_edit']) ? $rank->world_edit = 1 : $rank->world_edit = 0;
        isset($request->enderchat['enderchat']) ? $rank->enderchat = 1 : $rank->enderchat = 0;
        isset($request->gamemode['gamemode']) ? $rank->gamemode = 1 : $rank->gamemode = 0;
        isset($request->color_nickname['color_nickname']) ? $rank->color_nickname = 1 : $rank->color_nickname = 0;
        isset($request->tp['tp']) ? $rank->tp = 1 : $rank->tp = 0;
        
        $rank->save();

        $response = [
            'message' => 'Rank created successfully'
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
        $rank = Rank::find($id);

        if ($rank) {
            return response()->json($rank);
        } else {
            return response()->json(["message" => "Rank can't be found"]);
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
        $rank = Rank::find($id);

        if ($rank) {

            $rank->type = $request->type;
            $rank->name = $request->name;
            $rank->price = $request->price;
            $rank->discount = $request->discount;
            $rank->kit = $request->kit;
            $rank->money = $request->money;
            $rank->protection_blocks = $request->protection_blocks;
            $rank->full_access = $request->full_access;
            $rank->bypass_uri = $request->bypass_uri;
            $rank->essentials = $request->essentials;
            $rank->mute = $request->mute;
            $rank->kick = $request->kick;
            $rank->temp_ban = $request->temp_ban;
            $rank->fly = $request->fly;
            $rank->clear_chat = $request->clearchat;
            $rank->keep_inv = $request->keep_inv;
            $rank->keep_exp = $request->keep_exp;
            $rank->jail = $request->jail;
            $rank->nickname = $request->nickname;
            $rank->world_edit = $request->world_edit;
            $rank->enderchat = $request->enderchest;
            $rank->gamemode = $request->gamemode;
            $rank->color_nickname = $request->color_nickname;
            $rank->tp = $request->tp;

            $rank->save();
        } else {
            $response = ['message' => 'Rank edit failed', $rank];
            return response()->json($response, 200);
        }

        $response = ['message' => 'Rank edit successfully'];
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
        $rank = Rank::find($id);

        if ($rank) {
            $rank->orders()->detach();
            $rank->delete();
        }

        $response = ['message' => 'Rank deleted successfully'];
        return response()->json($response, 200);
    }
}
