<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ShowCaseRequest;
use App\Http\Requests\ShowCaseUpdateRequest;
use App\Http\Resources\ShowCaseResource;
use App\Services\ShowCaseService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ShowCaseController extends Controller
{
    protected ShowCaseService $showCaseService;

    public function __construct(ShowCaseService $showCaseService)
    {
        $this->showCaseService = $showCaseService;
    }

    /**
     * @return AnonymousResourceCollection
     */
    public function index(): AnonymousResourceCollection
    {
        return $this->showCaseService->getShowCases();
    }

    /**
     * @return AnonymousResourceCollection
     */
    public function adminIndex(): AnonymousResourceCollection
    {
        return $this->showCaseService->getShowCasesList();
    }

    /**
     * @param ShowCaseRequest $request
     * @return JsonResponse
     */
    public function store(ShowCaseRequest $request): JsonResponse
    {
        return $this->showCaseService->storeShowCase($request);
    }

    /**
     * @param int $id
     * @return ShowCaseResource|JsonResponse
     */
    public function show(int $id): ShowCaseResource|JsonResponse
    {
        return $this->showCaseService->showShowCase($id);
    }

    /**
     * @param ShowCaseUpdateRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(ShowCaseUpdateRequest $request, int $id): JsonResponse
    {
        return $this->showCaseService->updateShowCase($request, $id);
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        return $this->showCaseService->destroyShowCase($id);
    }
}
