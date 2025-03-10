<?php

namespace App\Repositories;

use App\Models\ReportPlayer;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ReportPlayerRepository
{

    /**
     * @return Collection
     */
    public function getReportPlayersWithRelations(): Collection
    {
        return ReportPlayer::with(['users'])->get();
    }

    /**
     * @param int $id
     * @return Builder
     */
    public function getReportPlayerWithRelations(int $id): Builder
    {
        return ReportPlayer::with(['users'])->where('id', $id);
    }

    public function createReportPlayer(array $requestData): ?ReportPlayer
    {
        DB::beginTransaction();

        try {
            $reportPlayer = new ReportPlayer();
            $reportPlayer->user_id = Auth::id();
            $reportPlayer->user_reported = $requestData['user_reported'];
            $reportPlayer->title = $requestData['title'];
            $reportPlayer->description = $requestData['description'];

            if ($requestData['image']) {
                $reportPlayer->image = $requestData['image']->store('images/reportedPlayers', 'public');
            } else {
                $reportPlayer->image = "no-image";
            }

            $reportPlayer->save();

            DB::commit();
            return $reportPlayer;
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Error while creating report player: ' . $e->getMessage());
            return null;
        }
    }

    public function updateReportPlayer(array $requestData, int $id)
    {
        try {
            $reportPlayer = ReportPlayer::find($id);
            if (!$reportPlayer) {
                return null;
            }

            $reportPlayer->status = $requestData['status'];
            $reportPlayer->admin_name = $requestData['admin_name'];

            $reportPlayer->save();

            return $reportPlayer;
        } catch (Exception $e) {
            Log::error("Database error updating report player: " . $e->getMessage());
            return null;
        }
    }

    public function deleteReportPlayer(int $id)
    {
        DB::beginTransaction();

        try {
            $reportPlayer = ReportPlayer::find($id);
            if (!$reportPlayer) {
                Log::warning("Report player Not Found");
                return false;
            }

            if ($reportPlayer->image != 'no-image') {
                Storage::disk('public')->delete($reportPlayer->image);
            }

            $reportPlayer->delete();

            DB::commit();
            return true;
        } catch (Exception $e) {
            Log::error('Error while deleting report player: ' . $e->getMessage());
            DB::rollBack();
            return false;
        }
    }
}
