<?php

namespace App\Repositories;

use App\Models\ReportBug;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ReportBugRepository
{

    /**
     * @return Collection
     */
    public function getReportBugsWithRelations(): Collection
    {
        return ReportBug::with(['users'])->get();
    }

    /**
     * @param int $id
     * @return ReportBug|null
     */
    public function getReportBugWithRelations(int $id): ?ReportBug
    {
        return ReportBug::with(['users'])->find($id);
    }

    /**
     * @param array $requestData
     * @param int $id
     * @return ReportBug|null
     */
    public function updateReportBug(array $requestData, int $id): ?ReportBug
    {
        try {
            $reportBug = ReportBug::find($id);
            if (!$reportBug) {
                return null;
            }

            $reportBug->status = $requestData['status'];

            $reportBug->save();

            return $reportBug;
        } catch (Exception $e) {
            Log::error("Database error updating role: " . $e->getMessage());
            return null;
        }
    }

    /**
     * @param int $id
     * @return bool
     */
    public function deleteReportBug(int $id): bool
    {
        DB::beginTransaction();

        try {
            $reportBug = ReportBug::find($id);
            if (!$reportBug) {
                Log::warning("ReportBug Not Found");
                return false;
            }

            if ($reportBug->image != 'no-image') {
                Storage::disk('public')->delete($reportBug->image);
            }

            $reportBug->delete();

            DB::commit();
            return true;
        } catch (Exception $e) {
            Log::error('Error while deleting report bug: ' . $e->getMessage());
            DB::rollBack();
            return false;
        }
    }

    /**
     * @param array $requestData
     * @return ReportBug|null
     */
    public function createReportBug(array $requestData): ?ReportBug
    {
        DB::beginTransaction();

        try {
            $reportBug = new ReportBug();
            $reportBug->user_id = Auth::id();
            $reportBug->title = $requestData['title'];
            $reportBug->description = $requestData['description'];

            if ($requestData['image']) {
                $reportBug->image = $requestData['image']->store('images/reportedBugs', 'public');
            } else {
                $reportBug->image = "no-image";
            }

            $reportBug->save();

            DB::commit();
            return $reportBug;
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Error while creating product: ' . $e->getMessage());
            return null;
        }
    }
}
