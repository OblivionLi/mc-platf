<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReportBugRequest;
use App\Http\Requests\ReportBugUpdateRequest;
use App\Http\Resources\ReportBugResource;
use App\Services\ReportBugService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ReportBugController extends Controller
{
    protected ReportBugService $reportBugService;

    public function __construct(ReportBugService $reportBugService)
    {
        $this->reportBugService = $reportBugService;
    }

    /**
     * @return AnonymousResourceCollection
     */
    public function index(): AnonymousResourceCollection
    {
        return $this->reportBugService->getReportBugsWithRelations();
    }

    /**
     * @param ReportBugRequest $request
     * @return JsonResponse
     */
    public function store(ReportBugRequest $request): JsonResponse
    {
        return $this->reportBugService->storeReportBug($request);
    }

    /**
     * @param int $id
     * @return ReportBugResource|JsonResponse
     */
    public function show(int $id): ReportBugResource|JsonResponse
    {
        return $this->reportBugService->showReportBug($id);
    }

    /**
     * @param ReportBugUpdateRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(ReportBugUpdateRequest $request, int $id): JsonResponse
    {
        return $this->reportBugService->updateReportBug($request, $id);
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        return $this->reportBugService->destroyReportBug($id);
    }
}
