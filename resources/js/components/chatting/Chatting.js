import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addSuggestionPick,
  fetchAnswersBySuggestion,
  fetchQuestion,
  savePicks
} from "../../actions/question-actions/actions";
import HoboButton from "../button/HoboButton";

import "./chatting.scss";
import gsap from "gsap/gsap-core";

export function Chatting(props) {
  const questions = useSelector(state => state.questionsReducer.questions);
  const isGameEnd = useSelector(state => state.questionsReducer.end);
  const user = useSelector(state => state.authReducer.user);
  const suggestionsPick = useSelector(
    state => state.questionsReducer.suggestionsPick
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchQuestion());
  }, []);
  return (
    <div id="wrapper" className="chatting">
      {questions.map((question, k) => {
        return (
          <div key={k} className="question-wrapper">
            <div id={`question-${question.id}`} className="question">
              {question.question}
            </div>
            <div className="suggestions">
              {question.suggestions && question.suggestions.length > 0
                ? question.suggestions.map((suggestion, key) => {
                    return (
                      <button
                        id={`suggestion-${suggestion.id}`}
                        key={key}
                        className="text"
                        onClick={() => {
                          document.getElementById(
                            `suggestion-${suggestion.id}`
                          ).disabled = true;
                          dispatch(
                            fetchAnswersBySuggestion(question, suggestion)
                          );
                          dispatch(addSuggestionPick(suggestion));
                        }}
                      >
                        {suggestion.suggestion}
                      </button>
                    );
                  })
                : null}
            </div>
            <div className="answers">
              {question.answers
                ? question.answers.map((a, key) => {
                    return (
                      <div
                        id={`answer-${a.id}`}
                        className={`answer ${a.is_image ? "img" : ""}`}
                        key={key}
                      >
                        {a.is_image ? (
                          <img src={`${a.image}`} alt="img" />
                        ) : (
                          a.answer
                        )}
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        );
      })}
      {isGameEnd ? (
        <HoboButton
          callback={() => {
            dispatch(
              savePicks({
                suggestions: suggestionsPick,
                user_id: user.id
              })
            );
            props.history.push("/voucher");
          }}
          text="خوذ Bon D’achat"
        />
      ) : null}
    </div>
  );
}

export default withRouter(Chatting);
