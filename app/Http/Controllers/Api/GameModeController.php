<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\GameModeRequest;
use App\Http\Requests\GameModeUpdateRequest;
use App\Http\Resources\GameModeResource;
use App\Services\GameModeService;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Symfony\Component\HttpFoundation\JsonResponse;

class GameModeController extends Controller
{
    protected GameModeService $gameModeService;

    public function __construct(GameModeService $gameModeService)
    {
        $this->gameModeService = $gameModeService;
    }

    /**
     * @return AnonymousResourceCollection
     */
    public function index(): AnonymousResourceCollection
    {
        return $this->gameModeService->getGameModes();
    }

    /**
     * @return AnonymousResourceCollection
     */
    public function adminIndex(): AnonymousResourceCollection
    {
        return $this->gameModeService->getAdminGameModesList();
    }

    /**
     * @param GameModeRequest $request
     * @return JsonResponse
     */
    public function store(GameModeRequest $request): JsonResponse
    {
        return $this->gameModeService->storeGameMode($request);
    }

    /**
     * @param int $id
     * @return GameModeResource|JsonResponse
     */
    public function show(int $id): GameModeResource|JsonResponse
    {
        return $this->gameModeService->showGameMode($id);
    }

    /**
     * @param GameModeUpdateRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(GameModeUpdateRequest $request, int $id): JsonResponse
    {
        return $this->gameModeService->updateGameMode($request, $id);
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        return $this->gameModeService->deleteGameMode($id);
    }
}
