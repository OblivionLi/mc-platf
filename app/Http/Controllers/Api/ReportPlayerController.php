<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReportPlayerRequest;
use App\Http\Requests\ReportPlayerUpdateRequest;
use App\Http\Resources\ReportPlayerResource;
use App\Services\ReportPlayerService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ReportPlayerController extends Controller
{
    protected ReportPlayerService $reportPlayerService;

    public function __construct(ReportPlayerService $reportPlayerService)
    {
        $this->reportPlayerService = $reportPlayerService;
    }

    /**
     * @return AnonymousResourceCollection
     */
    public function index(): AnonymousResourceCollection
    {
        return $this->reportPlayerService->getReportPlayersWithRelations();
    }

    /**
     * @param ReportPlayerRequest $request
     * @return JsonResponse
     */
    public function store(ReportPlayerRequest $request): JsonResponse
    {
        return $this->reportPlayerService->storeReportPlayer($request);
    }

    /**
     * @param int $id
     * @return ReportPlayerResource|JsonResponse
     */
    public function show(int $id): ReportPlayerResource|JsonResponse
    {
        return $this->reportPlayerService->showReportPlayer($id);
    }

    /**
     * @param ReportPlayerUpdateRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(ReportPlayerUpdateRequest $request, int $id): JsonResponse
    {
        return $this->reportPlayerService->updateReportPlayer($request, $id);
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        return $this->reportPlayerService->destroyReportPlayer($id);
    }
}
