<?php

namespace App\Services;

use App\Http\Resources\RankResource;
use App\Repositories\RankRepository;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Symfony\Component\HttpFoundation\Response;

class RankService
{
    protected RankRepository $rankRepository;

    public function __construct(RankRepository $rankRepository)
    {
        $this->rankRepository = $rankRepository;
    }

    /**
     * @return AnonymousResourceCollection
     */
    public function getRanks(): AnonymousResourceCollection
    {
        return RankResource::collection($this->rankRepository->getRanksByVipsAndAdmins());
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function storeRank(Request $request): JsonResponse
    {
        $tryToStoreRank = $this->rankRepository->createRank($request->validated());
        if (!$tryToStoreRank) {
            return response()->json(['message' => 'Failed to create rank.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json(['message' => 'Rank created successfully'], Response::HTTP_OK);
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function showRank(int $id): JsonResponse
    {
        $rank = $this->rankRepository->getRank($id);
        if (!$rank) {
            return response()->json(['message' => 'Report bug not found.'], Response::HTTP_NOT_FOUND);
        }

        return response()->json($rank, Response::HTTP_OK);
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function destroyRank(int $id): JsonResponse
    {
        $tryToDestroyRank = $this->rankRepository->destroyRank($id);
        if (!$tryToDestroyRank) {
            return response()->json(['message' => 'Failed to destroy rank.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json(['message' => 'Rank destroyed successfully'], Response::HTTP_OK);
    }

    /**
     * @param $request
     * @param int $id
     * @return JsonResponse
     */
    public function updateRank($request, int $id): JsonResponse
    {
        $tryToUpdateRank = $this->rankRepository->updateRank($request->validated(), $id);
        if (!$tryToUpdateRank) {
            return response()->json(['message' => 'Failed to update rank.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json(['message' => 'Rank updated successfully'], Response::HTTP_OK);
    }
}
