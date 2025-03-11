<?php

namespace App\Repositories;

use App\Models\GameMode;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class GameModeRepository
{
    /**
     * @return Builder
     */
    public function getGameModesWithRelations(): Builder
    {
        return GameMode::with('users');
    }


    /**
     * @param array $requestData
     * @return bool
     */
    public function storeGameMode(array $requestData): bool
    {
        try {
            $gameMode = new GameMode();

            $gameMode->user_id = Auth::id();
            $gameMode->title = $requestData['title'];
            $gameMode->description = $requestData['description'];

            if (isset($validatedData['image']) && $validatedData['image'] instanceof UploadedFile) {
                $gameMode->image = $requestData['image']->store('images/gameModes', 'public');
            } else {
                $gameMode->image = "no-image";
            }

            $gameMode->save();

            return true;
        } catch (Exception $e) {
            Log::error("Database error creating game mode: " . $e->getMessage());
            return false;
        }
    }

    /**
     * @param int $id
     * @return GameMode|null
     */
    public function showGameMode(int $id): ?GameMode
    {
        return GameMode::with('users')->find($id);
    }

    /**
     * @param array $requestData
     * @param int $id
     * @return bool
     */
    public function updateGameMode(array $requestData, int $id): bool
    {
        try {
            $gameMode = GameMode::find($id);
            if (!$gameMode) {
                return false;
            }

            $gameMode->title = $requestData['title'];
            $gameMode->description = $requestData['description'];
            $gameMode->user_id = Auth::id();

            $gameMode->save();

            return true;
        } catch (Exception $e) {
            Log::error("Database error updating game mode: " . $e->getMessage());
            return false;
        }
    }

    public function deleteGameMode(int $id)
    {
        DB::beginTransaction();

        try {
            $gameMode = GameMode::find($id);
            if (!$gameMode) {
                Log::warning("Game mode Not Found");
                return false;
            }

            if ($gameMode->image != 'no-image') {
                Storage::disk('public')->delete($gameMode->image);
            }

            $gameMode->delete();

            DB::commit();
            return true;
        } catch (Exception $e) {
            Log::error('Error while deleting game mode: ' . $e->getMessage());
            DB::rollBack();
            return false;
        }
    }
}
