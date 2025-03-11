<?php

namespace App\Services;

use App\Http\Requests\GameModeRequest;
use App\Http\Requests\GameModeUpdateRequest;
use App\Http\Resources\GameModeResource;
use App\Repositories\GameModeRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Symfony\Component\HttpFoundation\Response;

class GameModeService
{
    protected GameModeRepository $gameModeRepository;

    public function __construct(GameModeRepository $gameModeRepository)
    {
        $this->gameModeRepository = $gameModeRepository;
    }

    /**
     * @return AnonymousResourceCollection
     */
    public function getGameModes(): AnonymousResourceCollection
    {
        return GameModeResource::collection($this->gameModeRepository->getGameModesWithRelations()->paginate(6));
    }

    /**
     * @return AnonymousResourceCollection
     */
    public function getAdminGameModesList(): AnonymousResourceCollection
    {
        return GameModeResource::collection($this->gameModeRepository->getGameModesWithRelations()->get());
    }

    /**
     * @param GameModeRequest $request
     * @return JsonResponse
     */
    public function storeGameMode(GameModeRequest $request): JsonResponse
    {
        $tryToStoreGameMode = $this->gameModeRepository->storeGameMode($request->validated());
        if (!$tryToStoreGameMode) {
            return response()->json(['message' => 'Failed to create game mode.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json(['message' => 'Game mode created successfully.'], Response::HTTP_OK);
    }

    /**
     * @param int $id
     * @return GameModeResource|JsonResponse
     */
    public function showGameMode(int $id): GameModeResource|JsonResponse
    {
        $gameMode = $this->gameModeRepository->showGameMode($id);
        if (!$gameMode) {
            return response()->json(['message' => 'Game mode not found.'], Response::HTTP_NOT_FOUND);
        }

        return new GameModeResource($gameMode);
    }

    /**
     * @param GameModeUpdateRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function updateGameMode(GameModeUpdateRequest $request, int $id): JsonResponse
    {
        $tryToUpdateGameMode = $this->gameModeRepository->updateGameMode($request->validated(), $id);
        if (!$tryToUpdateGameMode) {
            return response()->json(['message' => 'Failed to update game mode.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json(['message' => 'Game mode updated successfully.'], Response::HTTP_OK);
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function deleteGameMode(int $id): JsonResponse
    {
        $tryToDeleteGameMode = $this->gameModeRepository->deleteGameMode($id);
        if (!$tryToDeleteGameMode) {
            return response()->json(['message' => 'Failed to delete game mode.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json(['message' => 'Game mode deleted successfully.'], Response::HTTP_OK);
    }
}
