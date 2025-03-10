<?php

namespace App\Repositories;

use App\Models\Media;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Log;

class MediaRepository
{

    /**
     * @return Collection
     */
    public function getMediaList(): Collection
    {
        return Media::all();
    }

    /**
     * @param array $requestData
     * @return Media|null
     */
    public function createMedia(array $requestData): ?Media
    {
        try {
            return Media::create([
                'name' => $requestData['name'],
                'href' => $requestData['href'],
            ]);
        } catch (Exception $e) {
            Log::error('Error while creating media: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * @param int $id
     * @return Media|null
     */
    public function showMedia(int $id): ?Media
    {
        return Media::find($id);
    }

    /**
     * @param array $requestData
     * @param int $id
     * @return bool
     */
    public function updateMedia(array $requestData, int $id): bool
    {
        try {
            $media = $this->showMedia($id);
            if (!$media) {
                return false;
            }

            $media->update([
                'name' => $requestData['name'],
                'href' => $requestData['href'],
            ]);

            return true;
        } catch (Exception $e) {
            Log::error('Error while updating media: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * @param int $id
     * @return bool
     */
    public function destroyMedia(int $id): bool
    {
        try {
            $media = $this->showMedia($id);
            if (!$media) {
                return false;
            }

            $media->delete();

            return true;
        } catch (Exception $e) {
            Log::error('Error while deleting media: ' . $e->getMessage());
            return false;
        }
    }
}
