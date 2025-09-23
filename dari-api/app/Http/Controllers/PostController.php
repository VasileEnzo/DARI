<?php
namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class PostController extends Controller
{
    public function index(Request $req)
    {
        $q = Post::with([
            'category:id,name',
            'state:id,code,label',
            'author:id,name'
        ])->orderByDesc('id');

        if ($type = $req->query('type'))        $q->where('type', $type);
        if ($cid  = $req->query('category_id')) $q->where('category_id', $cid);
        if ($sid  = $req->query('state_id'))    $q->where('state_id', $sid);

        $perPage   = (int) $req->query('per_page', 10);
        $page      = (int) $req->query('page', 1);
        $paginator = $q->paginate($perPage, ['*'], 'page', $page);

        return response()->json([
            'data' => $paginator->items(),
            'meta' => [
                'page'     => $paginator->currentPage(),
                'per_page' => $paginator->perPage(),
                'total'    => $paginator->total()
            ]
        ]);
    }

    public function show(Post $post)
    {
        $post->load([
            'category:id,name',
            'state:id,code,label',
            'author:id,name'
        ]);

        return response()->json($post);
    }

    public function store(Request $req)
    {
        $validated = $req->validate([
            'type'        => ['required', Rule::in(['incident','environment'])],
            'title'       => ['required','string','max:200'],
            'description' => ['required','string'],
            'category_id' => ['required','exists:categories,id'],
            'state_id'    => ['required','exists:states,id'], // por ahora mandá "open" desde el front
            'anonymous'   => ['boolean'],
            'lat'         => ['nullable','numeric','between:-90,90'],
            'lng'         => ['nullable','numeric','between:-180,180'],
            'address'     => ['nullable','string','max:255'],
        ]);

        $post = new Post($validated);
        $post->created_by = $req->user()->id; // usuario autenticado
        $post->save();

        $post->load(['category:id,name','state:id,code,label','author:id,name']);
        return response()->json($post, 201);
    }
}
