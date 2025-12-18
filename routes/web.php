<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Post;
use Illuminate\Http\Request;


//Route::get('/', function () {
//    return Inertia::render('Welcome', [
//        'canLogin' => Route::has('login'),
//        'canRegister' => Route::has('register'),
//        'laravelVersion' => Application::VERSION,
//        'phpVersion' => PHP_VERSION,
//    ]);
//});

Route::get('/', function () {
    return Inertia::render("Home");
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
            'slug'
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
        ],
    ]);
});

Route::patch('/blog/{post:slug}', function (Request $request, Post $post) {
    $validated = $request->validate([
        'content' => ['required', 'string'],
    ]);

    $post->update([
        'content' => $validated['content']
    ]);

    return back();
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
