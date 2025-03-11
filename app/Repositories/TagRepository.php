<?php

namespace App\Repositories;

use App\Models\Tag;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class TagRepository
{

    /**
     * @return Collection
     */
    public function getTagsWithRelations(): Collection
    {
        return Tag::with('users')->get();
    }

    /**
     * @param array $requestData
     * @return bool
     */
    public function createTag(array $requestData): bool
    {
        try {
            Tag::create([
                'name' => $requestData['name'],
            ]);

            return true;
        } catch (Exception $e) {
            Log::error('Error creating permission: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * @param int $id
     * @return Tag|null
     */
    public function getTagById(int $id): ?Tag
    {
        return Tag::with('users')->find($id);
    }

    /**
     * @param array $requestData
     * @param int $id
     * @return null
     */
    public function updateTag(array $requestData, int $id)
    {
        try {
            $tag = Tag::find($id);
            if (!$tag) {
                return null;
            }

            $tag->name = $requestData['name'];
            $tag->save();

            return $tag;
        } catch (Exception $e) {
            Log::error("Database error updating tag: " . $e->getMessage());
            return null;
        }
    }

    /**
     * @param int $id
     * @return bool
     */
    public function deleteTag(int $id): bool
    {
        DB::beginTransaction();

        try {
            $tag = Tag::find($id);
            if (!$tag) {
                return false;
            }

            $tag->users()->detach();
            $tag->delete();

            return true;
        } catch (Exception $e) {
            Log::error("Database error deleting role: " . $e->getMessage());
            return false;
        }
    }

    /**
     * @param string $name
     * @return Tag|null
     * @throws Exception
     */
    public function getOrCreateTag(string $name): ?Tag
    {
        try {
            return Tag::firstOrCreate(
                ['name' => $name],
            );
        } catch (QueryException $e) {
            DB::rollBack();
            Log::error("Database error creating tag: " . $e->getMessage());
            return null;
        } catch (Exception $e) {
            DB::rollBack();
            Log::error("Error creating tag: " . $e->getMessage());
            throw $e;
        }
    }
}
