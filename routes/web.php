<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;


//Route::get('/', function () {
//    return Inertia::render('Welcome', [
//        'canLogin' => Route::has('login'),
//        'canRegister' => Route::has('register'),
//        'laravelVersion' => Application::VERSION,
//        'phpVersion' => PHP_VERSION,
//    ]);
//});

Route::get('/', function () {
    return Inertia::render("Home", [
        'posts' => Post::published()
        ->latest()
        ->take(5)
        ->get([
            'id',
            'title',
            'excerpt',
            'published_at',
            'slug',
            'feature_image',
        ])
    ]);
});

Route::get('/blog', function () {
    return Inertia::render('Blog', [
        'posts' => Post::published()
        ->latest('published_at')
        ->take(5)
        ->get([
            'id',
            'title',
            'excerpt',
            'published_at',
            'slug',
            'feature_image',
        ])
    ]);
});

Route::get('/blog/{slug}', function (string $slug) {
    $post = Post::published()
        ->where('slug', $slug)
        ->firstOrFail();

    return Inertia::render("Blog/Post", [
        'post' => [
            'id' => $post->id,
            'title' => $post->title,
            'excerpt' => $post->excerpt,
            'published_at' => $post->published_at,
            'slug' => $post->slug,
            'content' => $post->content,
            'feature_image' => $post->feature_image,
        ],
        'can' => [
            'edit' => auth()->user()?->can('update', $post) ?? false,
        ],
    ]);
});

Route::patch('/blog/{post:slug}', function (Request $request, Post $post) {
    $validated = $request->validate([
        'content' => ['required', 'string'],
        'feature_image' => ['nullable', 'string'],
    ]);

    $post->update([
        'content' => $validated['content'],
        'feature_image' => $validated['feature_image'],
    ]);

    return back();
});

Route::post('/uploads/feature-image', function (Request $request) {
    $request->validate([
        'image' => ['required', 'image', 'max:4096'],
    ]);

    $path = $request
        ->file('image')
        ->store('uploads', 'public');

    return response()->json([
        'url' => Storage::url($path)
    ]);
});

Route::post('/blog/images', function (Request $request) {
    $request->validate([
        'image' => ['required', 'image', 'max:2048'],
    ]);

    $path = $request->file('image')->store('blog', 'public');

    return response()->json(['path' => Storage::url($path)]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
