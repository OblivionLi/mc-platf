<?php

namespace App\Services;

use App\Http\Requests\TagRequest;
use App\Http\Requests\TagUpdateRequest;
use App\Http\Resources\TagResource;
use App\Repositories\TagRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Symfony\Component\HttpFoundation\Response;

class TagService
{
    protected TagRepository $tagRepository;

    public function __construct(TagRepository $tagRepository)
    {
        $this->tagRepository = $tagRepository;
    }

    /**
     * @return AnonymousResourceCollection
     */
    public function getTags(): AnonymousResourceCollection
    {
        return TagResource::collection($this->tagRepository->getTagsWithRelations());
    }

    /**
     * @param TagRequest $request
     * @return JsonResponse
     */
    public function storeTag(TagRequest $request): JsonResponse
    {
        $tryToCreateTag = $this->tagRepository->createTag($request->validated());
        if (!$tryToCreateTag) {
            return response()->json(['message' => 'Failed to create tag.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json(['message' => 'Tag created successfully.'], Response::HTTP_CREATED);
    }

    /**
     * @param int $id
     * @return TagResource|JsonResponse
     */
    public function showTag(int $id): TagResource|JsonResponse
    {
        $tag = $this->tagRepository->getTagById($id);
        if (!$tag) {
            return response()->json(['message' => 'Tag not found.'], Response::HTTP_NOT_FOUND);
        }

        return new TagResource($tag);
    }

    /**
     * @param TagUpdateRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function updateTag(TagUpdateRequest $request, int $id): JsonResponse
    {
        $tryToUpdateTag = $this->tagRepository->updateTag($request->validated(), $id);
        if (!$tryToUpdateTag) {
            return response()->json(['message' => 'Failed to update role.'], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        return response()->json(['message' => 'Tag updated successfully.'], Response::HTTP_OK);
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function destroyTag(int $id): JsonResponse
    {
        $tryToDeleteTag = $this->tagRepository->deleteTag($id);
        if (!$tryToDeleteTag) {
            return response()->json(['message' => 'Failed to delete role.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        return response()->json(['message' => 'Tag deleted successfully.'], Response::HTTP_OK);
    }
}
