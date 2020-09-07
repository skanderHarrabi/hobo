<?php

namespace App\Http\Controllers\Api;

use App\Answer;
use App\Code;
use App\Question;
use App\Response;
use App\Scenario;
use App\Suggestion;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\URL;

class QuestionController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\JsonResponse
   */
  public function index()
  {
    $questions = Question::all();
    if (!$questions) {
      return response()->json([
        'message' => 'there is no question in DB !'
      ], 500);
    }
    return response()->json(
      [
        'questions' => $questions
      ], 200);
  }


  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {

  }

  /**
   * Store a newly created resource in storage.
   *
   * @param \Illuminate\Http\Request $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {

  }

  /**
   * Display the specified resource.
   *
   * @param int $id
   * @return \Illuminate\Http\Response
   */
  public function show($id)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param int $id
   * @return \Illuminate\Http\Response
   */
  public function edit($id)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param \Illuminate\Http\Request $request
   * @param int $id
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, $id)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param int $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
  {
    //
  }

  public function getQuestionByCode($code)
  {
    $question = Question::with('Reponses.Partitions')->where('code', $code)->first();
    return response()->json($question);
  }

  public function getPartitionsByResponse($code)
  {
    $parts = Response::with('Partitions')->where('code', $code)->first();
    return response()->json($parts);
  }

  public function getQuestion()
  {
    $question = Question::with('suggestions')->first();
    return response()->json($question);
  }

  public function getNextQuestion($id)
  {
    $question = Question::with('suggestions')->where('id', $id)->first();
    return response()->json($question);
  }

  public function getQuestionAnswersBySuggestion($question_id, $suggestion_id)
  {
    $answers = Question::where('id', $question_id)
      ->with(['answers' => function ($q) use ($suggestion_id) {
        $q->where('answers.suggestion_id', '=', $suggestion_id);
      }])->first();

    return response()->json($answers);
  }

  public function getVoucher(Request $request)
  {
    $request->validate([
      'suggestions' => 'required'
    ]);
    $ids = array_column($request->suggestions, 'id');
    $codes = Suggestion::findMany($ids)->pluck('code')->toarray();
    $voucher = $this->vouchers($codes);
    $code = new Code();
    $code->save();
    return response()->json([
      'code' => $code,
      'voucher' => $voucher,
    ]);

  }

  public function vouchers($suggestions_codes)
  {
    $voucher4 = ["A1", "B2", "D2",];
    $voucher3 = ["A1", "B2", "D1",];
    $voucher1 = ["A1", "B1",];
    //$voucher5 = ["A2", "C1", "E1",];
    $voucher5 = ["A2", "C2"];
    $voucher6 = ["A2", "C1", "E2"];
    $voucher2 = ["A2", "C2",];

    $voucher1_diff = count(array_diff($voucher1, $suggestions_codes));
    $voucher2_diff = count(array_diff($voucher2, $suggestions_codes));
    $voucher3_diff = count(array_diff($voucher3, $suggestions_codes));
    $voucher4_diff = count(array_diff($voucher4, $suggestions_codes));
    $voucher5_diff = count(array_diff($voucher5, $suggestions_codes));
    $voucher6_diff = count(array_diff($voucher6, $suggestions_codes));

    $result = array(
      'voucher1' => $voucher1_diff,
      'voucher2' => $voucher2_diff,
      'voucher3' => $voucher3_diff,
      'voucher4' => $voucher4_diff,
      'voucher5' => $voucher5_diff,
      'voucher6' => $voucher6_diff,
    );
    $minimum_diff = min($result);
    $keys = array_keys($result, $minimum_diff);
    if (count($keys) > 0) {
      return $keys[0];
    }
    return null;
  }
}
