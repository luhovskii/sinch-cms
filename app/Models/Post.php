<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'content',
        'published_at',
    ];

    protected $casts = [
        'published_at' => 'datetime',
    ];

    /**
     * @param $query
     * @return mixed
     */
    public function scopePublished($query): mixed
    {
        return $query->whereNotNull('published_at')
            ->where('published_at', '<=', now());
    }
}
