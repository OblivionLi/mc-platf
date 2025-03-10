<?php

namespace App\Services;

use App\Http\Requests\ReportPlayerRequest;
use App\Http\Requests\ReportPlayerUpdateRequest;
use App\Http\Resources\ReportPlayerResource;
use App\Repositories\ReportPlayerRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Symfony\Component\HttpFoundation\Response;

class ReportPlayerService
{
    protected ReportPlayerRepository $reportPlayerRepository;

    public function __construct(ReportPlayerRepository $reportPlayerRepository)
    {
        $this->reportPlayerRepository = $reportPlayerRepository;
    }

    /**
     * @return AnonymousResourceCollection
     */
    public function getReportPlayersWithRelations(): AnonymousResourceCollection
    {
        return ReportPlayerResource::collection($this->reportPlayerRepository->getReportPlayersWithRelations());
    }

    /**
     * @param ReportPlayerRequest $request
     * @return JsonResponse
     */
    public function storeReportPlayer(ReportPlayerRequest $request): JsonResponse
    {
        $tryToCreateReportPlayer = $this->reportPlayerRepository->createReportPlayer($request->validated());
        if (!$tryToCreateReportPlayer) {
            return response()->json(['message' => 'Failed to create report player.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json(['message' => 'Report player created successfully.'], Response::HTTP_CREATED);
    }

    /**
     * @param int $id
     * @return ReportPlayerResource|JsonResponse
     */
    public function showReportPlayer(int $id): ReportPlayerResource|JsonResponse
    {
        $reportPlayer = $this->reportPlayerRepository->getReportPlayerWithRelations($id)->get();
        if (!$reportPlayer) {
            return response()->json(['message' => 'Report player not found.'], Response::HTTP_NOT_FOUND);
        }

        return new ReportPlayerResource($reportPlayer);
    }

    /**
     * @param ReportPlayerUpdateRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function updateReportPlayer(ReportPlayerUpdateRequest $request, int $id): JsonResponse
    {
        $tryToUpdateReportPlayer = $this->reportPlayerRepository->updateReportPlayer($request->validated(), $id);
        if (!$tryToUpdateReportPlayer) {
            return response()->json(['message' => 'Failed to update report player.'], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        return response()->json(['message' => 'Report player updated successfully.'], Response::HTTP_OK);
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function destroyReportPlayer(int $id): JsonResponse
    {
        $tryToDeleteReportPlayer = $this->reportPlayerRepository->deleteReportPlayer($id);
        if (!$tryToDeleteReportPlayer) {
            return response()->json(['message' => 'Failed to delete report player.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        return response()->json(['message' => 'Report player deleted successfully.'], Response::HTTP_OK);
    }
}
