<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\MediaStoreRequest;
use App\Http\Requests\MediaUpdateRequest;
use App\Services\MediaService;
use Illuminate\Http\JsonResponse;

class MediaController extends Controller
{
    protected MediaService $mediaService;

    public function __construct(MediaService $mediaService)
    {
        $this->mediaService = $mediaService;
    }

    /**
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        return $this->mediaService->getMediaList();
    }

    /**
     * @param MediaStoreRequest $request
     * @return JsonResponse
     */
    public function store(MediaStoreRequest $request): JsonResponse
    {
        return $this->mediaService->storeMedia($request);
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        return $this->mediaService->showMedia($id);
    }

    /**
     * @param MediaUpdateRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(MediaUpdateRequest $request, int $id): JsonResponse
    {
        return $this->mediaService->updateMedia($request, $id);
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        return $this->mediaService->destroyMedia($id);
    }
}
