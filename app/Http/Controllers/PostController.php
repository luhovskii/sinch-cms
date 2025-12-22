<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Post;

class PostController extends Controller
{
    //
    public function update(Request $request, Post $post)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'excerpt' => ['required', 'string'],
            'feature_image' => ['nullable', 'image', 'max:4096'],
        ]);

        if ($request->hasFile('feature_image')) {
            $path = $request->file('feature_image')->store('uploads', 'public');
            $validated['feature_image'] = Storage::url($path);
        }

        $post->update($validated);

        return back();
    }
}
