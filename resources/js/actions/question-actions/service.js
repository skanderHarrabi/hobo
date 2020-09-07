/*
@
 This file contains the requests ( services )
@
*/

import axiosInstance from "../../config/axios-instance";

function fetchQuestionRequest() {
  return axiosInstance({
    method: "get",
    url: process.env.MIX_BACKEND_PREFIX + "/get-question",
    data: null
  });
}

function fetchNextQuestionRequest(questionId) {
  return axiosInstance({
    method: "get",
    url: process.env.MIX_BACKEND_PREFIX + "/next-question/" + questionId,
    data: null
  });
}

function fetchAnswersBySuggestionRequest(questionId, suggestionId) {
  return axiosInstance({
    method: "get",
    url:
      process.env.MIX_BACKEND_PREFIX +
      "/question/" +
      questionId +
      "/suggestion/" +
      suggestionId +
      "/answers",
    data: null
  });
}

function savePicksRequest(body) {
  return axiosInstance({
    method: "post",
    url: process.env.MIX_BACKEND_PREFIX + "/save-picks",
    data: body
  });
}

function getVoucherRequest(suggestionsPicks) {
  return axiosInstance({
    method: "post",
    url: process.env.MIX_BACKEND_PREFIX + "/get-voucher",
    data: {
      suggestions: suggestionsPicks
    }
  });
}

const QuestionServices = {
  fetchQuestionRequest,
  fetchAnswersBySuggestionRequest,
  fetchNextQuestionRequest,
  savePicksRequest,
  getVoucherRequest
};

export default QuestionServices;
