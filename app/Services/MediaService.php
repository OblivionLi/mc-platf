<?php

namespace App\Services;

use App\Http\Requests\MediaStoreRequest;
use App\Http\Requests\MediaUpdateRequest;
use App\Repositories\MediaRepository;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class MediaService
{
    protected MediaRepository $mediaRepository;

    public function __construct(MediaRepository $mediaRepository)
    {
        $this->mediaRepository = $mediaRepository;
    }

    /**
     * @return JsonResponse
     */
    public function getMediaList(): JsonResponse
    {
        return response()->json($this->mediaRepository->getMediaList());
    }

    /**
     * @param MediaStoreRequest $request
     * @return JsonResponse
     */
    public function storeMedia(MediaStoreRequest $request): JsonResponse
    {
        $tryToStoreMedia = $this->mediaRepository->createMedia($request->validated());
        if (!$tryToStoreMedia) {
            return response()->json(['message' => 'Failed to create media.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json(['message' => 'Media created successfully.'], Response::HTTP_CREATED);
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function showMedia(int $id): JsonResponse
    {
        $media = $this->mediaRepository->showMedia($id);
        if (!$media) {
            return response()->json(['message' => 'Media not found.'], Response::HTTP_NOT_FOUND);
        }

        return response()->json($media);
    }

    /**
     * @param MediaUpdateRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function updateMedia(MediaUpdateRequest $request, int $id): JsonResponse
    {
        $tryToUpdateMedia = $this->mediaRepository->updateMedia($request->validated(), $id);
        if (!$tryToUpdateMedia) {
            return response()->json(['message' => 'Failed to update media.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json(['message' => 'Media updated successfully.'], Response::HTTP_OK);
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function destroyMedia(int $id): JsonResponse
    {
        $tryToDestroyMedia = $this->mediaRepository->destroyMedia($id);
        if (!$tryToDestroyMedia) {
            return response()->json(['message' => 'Media not found.'], Response::HTTP_NOT_FOUND);
        }

        return response()->json(['message' => 'Media deleted successfully.'], Response::HTTP_OK);
    }
}
