<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Reviews extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'review',
        'recipe_id',
        'review_author_id',
    ];

    public function recipe(): BelongsTo
    {
        return $this->belongsTo(Recipe::class, 'recipe_id');
    }

    public function author() : BelongsTo
    {
        return $this->belongsTo(RecipeAuthor::class, 'recipe_author_id');        
    }
}
