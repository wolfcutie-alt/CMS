<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Post extends Model
{
    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'content',
        'status',
        'authorId',
        'categoryId',
        'featuredImage',
        'views',
        'likes',
        'shares',
        'publishedAt',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'publishedAt' => 'datetime',
    ];

    /**
     * Get the category that owns the post.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'categoryId');
    }

    /**
     * Get the author that owns the post.
     */
    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'authorId');
    }
}
