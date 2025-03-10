<?php

namespace App\Services;

use App\Http\Requests\ReportBugRequest;
use App\Http\Requests\ReportBugUpdateRequest;
use App\Http\Resources\ReportBugResource;
use App\Repositories\ReportBugRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Symfony\Component\HttpFoundation\Response;

class ReportBugService
{
    protected ReportBugRepository $reportBugRepository;

    public function __construct(ReportBugRepository $reportBugRepository)
    {
        $this->reportBugRepository = $reportBugRepository;
    }

    /**
     * @return AnonymousResourceCollection
     */
    public function getReportBugsWithRelations(): AnonymousResourceCollection
    {
        return ReportBugResource::collection($this->reportBugRepository->getReportBugsWithRelations());
    }

    /**
     * @param int $id
     * @return ReportBugResource|JsonResponse
     */
    public function showReportBug(int $id): ReportBugResource|JsonResponse
    {
        $reportBug = $this->reportBugRepository->getReportBugWithRelations($id);
        if (!$reportBug) {
            return response()->json(['message' => 'Report bug not found.'], Response::HTTP_NOT_FOUND);
        }

        return new ReportBugResource($reportBug);
    }

    /**
     * @param ReportBugUpdateRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function updateReportBug(ReportBugUpdateRequest $request, int $id): JsonResponse
    {
        $tryToUpdateReportBug = $this->reportBugRepository->updateReportBug($request->validated(), $id);
        if (!$tryToUpdateReportBug) {
            return response()->json(['message' => 'Failed to update report bug.'], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        return response()->json(['message' => 'Report bug updated successfully.'], Response::HTTP_OK);
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function destroyReportBug(int $id): JsonResponse
    {
        $tryToDeleteReportBug = $this->reportBugRepository->deleteReportBug($id);
        if (!$tryToDeleteReportBug) {
            return response()->json(['message' => 'Failed to delete report bug.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        return response()->json(['message' => 'Report bug deleted successfully.'], Response::HTTP_OK);
    }

    /**
     * @param ReportBugRequest $request
     * @return JsonResponse
     */
    public function storeReportBug(ReportBugRequest $request): JsonResponse
    {
        $tryToSaveReportBug = $this->reportBugRepository->createReportBug($request->validated());
        if (!$tryToSaveReportBug) {
            return response()->json(['message' => 'Failed to create report bug.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json(['message' => 'Report bug created successfully.'], Response::HTTP_OK);
    }
}
