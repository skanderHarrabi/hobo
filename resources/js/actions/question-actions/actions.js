/*
@
 This file contains the actions creators
@
*/

import QuestionsServices from "./service";
import {
  ADD_PARTICION,
  ADD_SUGGESTION_PICK,
  FETCH_ANSWERS_FAILURE,
  FETCH_ANSWERS_REQUEST,
  FETCH_ANSWERS_SUCCESS,
  FETCH_NEXT_QUESTION_FAILURE,
  FETCH_NEXT_QUESTION_REQUEST,
  FETCH_NEXT_QUESTION_SUCCESS,
  FETCH_PARTITIONS_BY_RESPONSE_FAILURE,
  FETCH_PARTITIONS_BY_RESPONSE_REQUEST,
  FETCH_PARTITIONS_BY_RESPONSE_SUCCESS,
  FETCH_QUESTION_FAILURE,
  FETCH_QUESTION_REQUEST,
  FETCH_QUESTION_SUCCESS,
  GET_VOUCHER_FAILURE,
  GET_VOUCHER_REQUEST,
  GET_VOUCHER_SUCCESS,
  SAVE_PICKS_FAILURE,
  SAVE_PICKS_REQUEST,
  SAVE_PICKS_SUCCESS,
  SET_END_FALSE,
  SET_END_TRUE,
  SET_LOADING_FALSE,
  SET_LOADING_TRUE,
  SET_LODING_FALSE
} from "./types";

export function setLoadingTrue() {
  return async dispatch => {
    dispatch({ type: SET_LOADING_TRUE });
  };
}

export function setLoadingFalse() {
  return async dispatch => {
    dispatch({ type: SET_LOADING_FALSE });
  };
}

export function setEndTrue() {
  return async dispatch => {
    dispatch({ type: SET_END_TRUE });
  };
}

export function setEndFalse() {
  return async dispatch => {
    dispatch({ type: SET_END_FALSE });
  };
}

export function addSuggestionPick(suggestion) {
  return async dispatch => {
    dispatch({ type: ADD_SUGGESTION_PICK, payload: suggestion });
  };
}

export function fetchQuestion() {
  return async dispatch => {
    dispatch({ type: FETCH_QUESTION_REQUEST });
    dispatch(setLoadingTrue());
    setTimeout(async () => {
      try {
        const response = await QuestionsServices.fetchQuestionRequest();
        dispatch(setLoadingFalse());
        dispatch({ type: FETCH_QUESTION_SUCCESS, payload: response.data });
      } catch (e) {
        dispatch(setLoadingFalse());
        dispatch({ type: FETCH_QUESTION_FAILURE });
      }
    }, 1500);
  };
}

export function fetchNextQuestion(questionId) {
  return async dispatch => {
    dispatch({ type: FETCH_NEXT_QUESTION_REQUEST });
    dispatch(setLoadingTrue());
    try {
      const response = await QuestionsServices.fetchNextQuestionRequest(
        questionId
      );
      dispatch({ type: FETCH_NEXT_QUESTION_SUCCESS, payload: response.data });
      dispatch(setLoadingFalse());
    } catch (e) {
      dispatch({ type: FETCH_NEXT_QUESTION_FAILURE });
    }
  };
}

export function fetchAnswersBySuggestion(question, suggestion) {
  return async dispatch => {
    dispatch({ type: FETCH_ANSWERS_REQUEST });
    dispatch(setLoadingTrue());
    try {
      const response = await QuestionsServices.fetchAnswersBySuggestionRequest(
        question.id,
        suggestion.id
      );
      const answers = response.data.answers;
      const questionId = response.data.id;
      let i = 0;
      const interval = setInterval(async () => {
        if (i === answers.length || answers.length === 0) {
          clearInterval(interval);
        } else {
          await dispatch({
            type: FETCH_ANSWERS_SUCCESS,
            payload: {
              questionId: questionId,
              answer: answers[i]
            }
          });
          i++;
        }
      }, 1500);
      setTimeout(async () => {
        if (suggestion.next_question_id) {
          await dispatch(fetchNextQuestion(suggestion.next_question_id));
          dispatch(setLoadingFalse());
        } else {
          dispatch(setEndTrue());
        }
      }, 1500 * response.data.answers.length);
    } catch (e) {
      dispatch(setLoadingFalse());
      dispatch({ type: FETCH_ANSWERS_FAILURE });
    }
  };
}

export function savePicks(body) {
  return async dispatch => {
    dispatch({ type: SAVE_PICKS_REQUEST });
    dispatch(setLoadingTrue());
    try {
      const response = await QuestionsServices.savePicksRequest(body);
      dispatch({ type: SAVE_PICKS_SUCCESS, payload: response.data });
      dispatch(setLoadingFalse());
    } catch (e) {
      dispatch({ type: SAVE_PICKS_FAILURE });
    }
  };
}

export function getVoucher(suggestionsPicks) {
  return async dispatch => {
    dispatch({ type: GET_VOUCHER_REQUEST });
    try {
      const response = await QuestionsServices.getVoucherRequest(
        suggestionsPicks
      );
      dispatch({
        type: GET_VOUCHER_SUCCESS,
        payload: {
          voucher: response.data.voucher,
          code: response.data.code
        }
      });
    } catch (e) {
      dispatch({ type: GET_VOUCHER_FAILURE });
    }
  };
}
