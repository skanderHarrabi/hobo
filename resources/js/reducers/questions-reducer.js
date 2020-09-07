import {
  ADD_PARTICION,
  ADD_SUGGESTION_PICK,
  FETCH_ANSWERS_FAILURE,
  FETCH_ANSWERS_REQUEST,
  FETCH_ANSWERS_SUCCESS,
  FETCH_FIRST_QUESTION_FAILURE,
  FETCH_FIRST_QUESTION_REQUEST,
  FETCH_FIRST_QUESTION_SUCCESS,
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
  SET_END_FALSE,
  SET_END_TRUE,
  SET_LOADING_FALSE,
  SET_LOADING_TRUE
} from "../actions/question-actions/types";

const initialState = {
  firstQuestion: null,
  questions: [],
  isLoading: false,
  end: false,
  suggestionsPick: [],
  wonVoucher: null,
  code: null
};
const questionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUESTION_REQUEST:
      return state;
    case FETCH_QUESTION_SUCCESS:
      return {
        ...state,
        questions: [...state.questions, action.payload]
      };
    case FETCH_QUESTION_FAILURE:
      return state;

    case FETCH_NEXT_QUESTION_REQUEST:
      return state;
    case FETCH_NEXT_QUESTION_SUCCESS:
      return {
        ...state,
        questions: [...state.questions, action.payload]
      };
    case FETCH_NEXT_QUESTION_FAILURE:
      return state;

    case FETCH_ANSWERS_REQUEST:
      return state;
    case FETCH_ANSWERS_SUCCESS:
      const _questions = Array.from(state.questions);
      let questionIndex = _questions.findIndex(
        q => q.id === action.payload.questionId
      );
      const question = _questions[questionIndex];
      if (question.answers) {
        question.answers.push(action.payload.answer);
      } else {
        question.answers = [];
        question.answers.push(action.payload.answer);
      }
      return {
        ...state,
        questions: _questions
      };
    case FETCH_ANSWERS_FAILURE:
      return state;
    case SET_LOADING_TRUE:
      return {
        ...state,
        isLoading: true
      };
    case SET_LOADING_FALSE:
      return {
        ...state,
        isLoading: false
      };
    case SET_END_TRUE:
      return {
        ...state,
        end: true
      };
    case SET_END_FALSE:
      return {
        ...state,
        end: false
      };
    case ADD_SUGGESTION_PICK:
      return {
        ...state,
        suggestionsPick: [...state.suggestionsPick, action.payload]
      };
    case GET_VOUCHER_REQUEST:
      return state;
    case GET_VOUCHER_SUCCESS:
      return {
        ...state,
        wonVoucher: action.payload.voucher,
        code: action.payload.code
      };
    case GET_VOUCHER_FAILURE:
      return state;
    default:
      return state;
  }
};

export default questionsReducer;
