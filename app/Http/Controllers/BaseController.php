<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Intervention\Image\ImageManagerStatic as ImageResizer;

class BaseController extends Controller
{
  public $image = null;
  public $thumbnail = null;

  /**
   * Display a listing of the resource.
   *
   * @param $Model
   * @param $pagination
   * @param  $limit
   * @return \Illuminate\Http\Response
   */
  public function index($Model, $pagination, $limit = null)
  {
    if (isset($limit)) {
      $elements = $Model::orderBy('updated_at', 'desc')->take($limit)->get();
      return response()->json($elements);
    }
    $elements = $Model::paginate($pagination);
    return response()->json($elements);
  }

  /**
   * Show the form for creating a new resource.
   *
   * @param $request
   * @param $Model
   * @param $fields
   * @param $image -> name of the image field
   * @param $thumbnail -> name of the thumbnail field
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request, $Model, $fields, $image = null, $thumbnail = null)
  {
    /**
     *  Validation included in the parent controller store method.
     */
    if ($request->hasFile($image)) {
      $file = $request->file($image);
      $this->image = sha1(Carbon::now()->timestamp) . '.' . $file->getClientOriginalExtension();
      $request->file('image')->storeAs("public", $this->image);
      if (isset($thumbnail)) {
        $this->thumbnail = 'thumbnail_' . sha1(Carbon::now()->timestamp) . '.' . $file->getClientOriginalExtension();
        $request->file('image')->storeAs("public", $this->thumbnail);
        $thumbnailpath = public_path('storage/' . $this->thumbnail);
        $img = ImageResizer::make($thumbnailpath)->resize(100, 100, function ($constraint) {
          $constraint->aspectRatio();
        });
        $img->save($thumbnailpath);
      }
    }
    $model = new $Model($fields);
    if (isset($image)) {
      $model->image = $this->image;
      if (isset($thumbnail)) {
        $model->thumbnail = $this->thumbnail;
      }
    }
    $model->save();
    return response()->json($model);
  }

  /**
   * Display the specified resource.
   *
   * @param  $Model
   * @param int $id
   * @return \Illuminate\Http\Response
   */
  public function show($Model, $id)
  {
    $element = $Model::find($id)->first();
    if (empty($element))
      return response()->json([
        'message' => $Model . ' with this id is unavailable'
      ], 400);
    return response()->json($element, 200);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param \Illuminate\Http\Request $request
   * @param  $Model
   * @param int $id
   * @param array $updates
   * @param $image
   * @param $thumbnail
   * @return \Illuminate\Http\Response
   */
  public function update($request, $Model, $id, $updates, $image = null, $thumbnail = null)
  {
    /**
     * validation goes into the update call
     */

    $element = $Model::find($id);

    if (empty($element))
      return response()->json([
        'message' => $Model . '  with this id is unavailable'
      ]);

    if ($request->hasFile($image)) {
      $file = $request->file($image);
      $this->image = sha1(Carbon::now()->timestamp) . '.' . $file->getClientOriginalExtension();
      $request->file('image')->storeAs("public", $this->image);
      if (isset($thumbnail)) {
        $this->thumbnail = 'thumbnail_' . sha1(Carbon::now()->timestamp) . '.' . $file->getClientOriginalExtension();
        $request->file('image')->storeAs("public", $this->thumbnail);
        $thumbnailpath = public_path('storage/' . $this->thumbnail);
        $img = ImageResizer::make($thumbnailpath)->resize(100, 100, function ($constraint) {
          $constraint->aspectRatio();
        });
        $img->save($thumbnailpath);
      }
    }
    $model = new $Model($updates);
    if ($request->hasFile($image)) {
      $model->image = $this->image;
      if (isset($thumbnail)) {
        $model->thumbnail = $this->thumbnail;
      }
    }

    $element->update($model->toArray());
    return response()->json($element
      , 201);
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param $Model
   * @param int $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($Model, $id)
  {
    $element = $Model::find($id);
    if (empty($element))
      return response()->json([
        'message' => $Model . ' with this id is unavailable'
      ]);
    $element->delete();
    return response()->json([
      'message' => $Model . ' was deleted'
    ], 201);
  }
}
