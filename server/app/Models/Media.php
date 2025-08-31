<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    protected $table = 'media';
    
    protected $fillable = [
        'name',
        'originalName',
        'type',
        'mimeType',
        'size',
        'url',
        'thumbnailUrl',
        'alt',
        'caption',
        'uploadedBy',
    ];

    protected $casts = [
        'size' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Custom accessor for uploadedAt to match the frontend expectation
    public function getUploadedAtAttribute()
    {
        return $this->created_at;
    }

    public function getUpdatedAtAttribute()
    {
        return $this->attributes['updated_at'];
    }
}
