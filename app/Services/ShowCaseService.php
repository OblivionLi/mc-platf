<?php

namespace App\Services;

use App\Http\Requests\ShowCaseRequest;
use App\Http\Requests\ShowCaseUpdateRequest;
use App\Http\Resources\ShowCaseResource;
use App\Repositories\ShowCaseRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Symfony\Component\HttpFoundation\Response;

class ShowCaseService
{
    protected ShowCaseRepository $showCaseRepository;

    public function __construct(ShowCaseRepository $showCaseRepository)
    {
        $this->showCaseRepository = $showCaseRepository;
    }

    /**
     * @return AnonymousResourceCollection
     */
    public function getShowCases(): AnonymousResourceCollection
    {
        return ShowCaseResource::collection($this->showCaseRepository->getShowCasesWithPagination());
    }

    /**
     * @return AnonymousResourceCollection
     */
    public function getShowCasesList(): AnonymousResourceCollection
    {
        return ShowCaseResource::collection($this->showCaseRepository->getShowCases());
    }

    /**
     * @param ShowCaseRequest $request
     * @return JsonResponse
     */
    public function storeShowCase(ShowCaseRequest $request): JsonResponse
    {
        $tryToStoreShowCase = $this->showCaseRepository->storeShowCase($request->validated());
        if (!$tryToStoreShowCase) {
            return response()->json(['message' => 'Showcase failed to create.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json(['message' => 'Showcase created successfully.'], Response::HTTP_CREATED);
    }

    /**
     * @param int $id
     * @return ShowCaseResource|JsonResponse
     */
    public function showShowCase(int $id): ShowCaseResource|JsonResponse
    {
        $tryToShowShowCase = $this->showCaseRepository->showShowCase($id);
        if (!$tryToShowShowCase) {
            return response()->json(['message' => 'Showcase failed to show.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return new ShowCaseResource($tryToShowShowCase);
    }

    /**
     * @param ShowCaseUpdateRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function updateShowCase(ShowCaseUpdateRequest $request, int $id): JsonResponse
    {
        $tryToUpdateShowCase = $this->showCaseRepository->updateShowCase($request->validated(), $id);
        if (!$tryToUpdateShowCase) {
            return response()->json(['message' => 'Showcase failed to update.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json(['message' => 'Showcase updated successfully.'], Response::HTTP_OK);
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function destroyShowCase(int $id): JsonResponse
    {
        $tryToDestroyShowCase = $this->showCaseRepository->destroyShowCase($id);
        if (!$tryToDestroyShowCase) {
            return response()->json(['message' => 'Showcase failed to destroy.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json(['message' => 'Showcase destroyed successfully.'], Response::HTTP_OK);
    }
}
