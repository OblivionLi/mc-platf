<?php

namespace App\Repositories;

use App\Models\ShowCase;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Log;

class ShowCaseRepository
{

    /**
     * @return LengthAwarePaginator
     */
    public function getShowCasesWithPagination(): LengthAwarePaginator
    {
        return ShowCase::paginate(2);
    }

    /**
     * @return Collection
     */
    public function getShowCases(): Collection
    {
        return ShowCase::all();
    }

    /**
     * @param array $requestData
     * @return ShowCase|null
     */
    public function storeShowCase(array $requestData): ?ShowCase
    {
        try {
            return ShowCase::create([
                'name' => $requestData['name'],
                'video_url' => $requestData['video_url'],
            ]);
        } catch (Exception $e) {
            Log::error('Error while creating showcase: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * @param int $id
     * @return ShowCase|null
     */
    public function showShowCase(int $id): ?ShowCase
    {
        return ShowCase::find($id);
    }

    /**
     * @param array $requestData
     * @param int $id
     * @return bool
     */
    public function updateShowCase(array $requestData, int $id): bool
    {
        try {
            $showCase = ShowCase::find($id);
            if (!$showCase) {
                return false;
            }

            $showCase->name = $requestData['name'];
            $showCase->video_url = $requestData['video_url'];

            $showCase->save();

            return true;
        } catch (Exception $e) {
            Log::error('Error while updating showcase: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * @param int $id
     * @return bool
     */
    public function destroyShowCase(int $id): bool
    {
        try {
            ShowCase::destroy($id);

            return true;
        } catch (Exception $e) {
            Log::error('Error while deleting showcase: ' . $e->getMessage());
            return false;
        }
    }
}
