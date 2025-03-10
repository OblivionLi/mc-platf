<?php

namespace App\Repositories;

use App\Models\Rank;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Log;

class RankRepository
{

    /**
     * @return Collection
     */
    public function getRanksByVipsAndAdmins(): Collection
    {
        return Rank::whereIn('type', ['vip', 'admin'])->get();
    }

    /**
     * @param array $requestData
     * @return Rank|null
     */
    public function createRank(array $requestData): ?Rank
    {
        try {
            $rank = new Rank([
                'type' => $requestData['type'],
                'name' => $requestData['name'],
                'price' => $requestData['price'],
                'discount' => $requestData['discount'] ?? 0,
                'kit' => $requestData['kit'],
                'money' => $requestData['money'],
                'protection_blocks' => $requestData['protection_blocks'],
            ]);

            $booleanAttributes = [
                'full_access', 'server_config', 'bypass_uri', 'essentials', 'mute',
                'kick', 'temp_ban', 'fly', 'clear_chat', 'keep_inv', 'keep_exp',
                'jail', 'nickname', 'world_edit', 'enderchat', 'gamemode',
                'color_nickname', 'tp'
            ];
            foreach ($booleanAttributes as $attribute) {
                $rank->$attribute = isset($validated[$attribute]) ? 1 : 0;
            }

            $rank->save();

            return $rank;
        } catch (Exception $e) {
            Log::error('Error while creating rank: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * @param int $id
     * @return Rank|null
     */
    public function getRank(int $id): ?Rank
    {
        return Rank::find($id);
    }

    /**
     * @param int $id
     * @return bool
     */
    public function destroyRank(int $id): bool
    {
        try {
            Rank::destroy($id);
            return true;
        } catch (Exception $e) {
            Log::error('Error deleting rank: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * @param array $requestData
     * @param int $id
     * @return bool
     */
    public function updateRank(array $requestData, int $id): bool
    {
        try {
            $rank = $this->getRank($id);
            if (!$rank) {
                return false;
            }

            $rank->type = $requestData['type'];
            $rank->name = $requestData['name'];
            $rank->price = $requestData['price'];
            $rank->discount = $requestData['discount'];
            $rank->kit = $requestData['kit'];
            $rank->money = $requestData['money'];
            $rank->protection_blocks = $requestData['protection_blocks'];
            $rank->full_access = $requestData['full_access'];
            $rank->bypass_uri = $requestData['bypass_uri'];
            $rank->essentials = $requestData['essentials'];
            $rank->mute = $requestData['mute'];
            $rank->kick = $requestData['kick'];
            $rank->temp_ban = $requestData['temp_ban'];
            $rank->fly = $requestData['fly'];
            $rank->clear_chat = $requestData['clearchat'];
            $rank->keep_inv = $requestData['keep_inv'];
            $rank->keep_exp = $requestData['keep_exp'];
            $rank->jail = $requestData['jail'];
            $rank->nickname = $requestData['nickname'];
            $rank->world_edit = $requestData['world_edit'];
            $rank->enderchat = $requestData['enderchest'];
            $rank->gamemode = $requestData['gamemode'];
            $rank->color_nickname = $requestData['color_nickname'];
            $rank->tp = $requestData['tp'];

            $rank->save();

            return true;
        } catch (Exception $e) {
            Log::error('Error while updating rank: ' . $e->getMessage());
            return false;
        }
    }
}
