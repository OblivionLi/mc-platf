<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\TagRequest;
use App\Http\Requests\TagUpdateRequest;
use App\Http\Resources\TagResource;
use App\Services\TagService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class TagController extends Controller
{
    protected TagService $tagService;

    public function __construct(TagService $tagService)
    {
        $this->tagService = $tagService;
    }

    /**
     * @return AnonymousResourceCollection
     */
    public function index(): AnonymousResourceCollection
    {
        return $this->tagService->getTags();
    }

    /**
     * @param TagRequest $request
     * @return JsonResponse
     */
    public function store(TagRequest $request): JsonResponse
    {
        return $this->tagService->storeTag($request);
    }

    /**
     * @param int $id
     * @return TagResource|JsonResponse
     */
    public function show(int $id): TagResource|JsonResponse
    {
        return $this->tagService->showTag($id);
    }

    /**
     * @param TagUpdateRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(TagUpdateRequest $request, int $id): JsonResponse
    {
        return $this->tagService->updateTag($request, $id);
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        return $this->tagService->destroyTag($id);
    }
}
