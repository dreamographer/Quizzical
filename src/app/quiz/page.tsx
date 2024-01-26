"use client";
import React, { useState } from "react";
import { quiz } from "../data";
export default function Quiz() {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectetedAnswer] = useState(false);
  const [selectedAnswerIndex, setSelectetedAnswerIndex] = useState<Number|null>(null);
  const [checked, setChecked] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const { questions } = quiz;
  const { question, answers, correctAnswer } = questions[activeQuestion];

  const onAnswerSelected = (ans: string, idx: number) => {
    setChecked(true)
    setSelectetedAnswerIndex(idx)
    if (ans == correctAnswer) {
      setSelectetedAnswer(true)
    } else {
      setSelectetedAnswer(false)
    }
  }

  const nextQuestion=()=>{
    setSelectetedAnswerIndex(null)
    setResult((prev)=>selectedAnswer?{
        ...prev,
        score:prev.score+1,
        correctAnswers:prev.correctAnswers+1
      }:
      {
        ...prev,
          wrongAnswers:prev.wrongAnswers+1
      }
    )
    if(activeQuestion!=questions.length-1){
      setActiveQuestion((prev)=>prev+1)
    }else{
      setActiveQuestion(0)
      setShowResult(true)
    }
    setChecked(false)
  }

  return (
    <>
      <div className="flex justify-center mt-20">
        <h1 className="text-4xl">Let the Game Begin</h1>
      </div>
      <div>
        <h2>
          Question: {activeQuestion + 1}
          <span>/ {questions.length}</span>
        </h2>
      </div>
      <div>{!showResult ? (
        <div className="bg-gray-950 m-5 p-7">
          <h1 className="text-center">{question}</h1>
          <div className="h-24 flex mt-5 flex-wrap w-full justify-center">
            {answers.map((ans, idx) => {
              return (
                <button onClick={() => onAnswerSelected(ans, idx)}
                  className={`border ${selectedAnswerIndex == idx ? 'bg-slate-400 text-black' : ''} hover:bg-slate-200 hover:text-black rounded-sm text-center w-1/2`}
                  key={idx}
                >
                  {ans}
                </button>
              );
            })}
          </div>
          <div className="flex justify-center ">
            {checked ?
              <button onClick={() => nextQuestion()} className="border p-2 mt-4 rounded-md bg-blue-700 hover:bg-blue-400a">
                {activeQuestion == questions.length - 1 ? 'FINSIH' : 'NEXT'}
              </button>
              :
              <button disabled className="border p-2 mt-4   rounded-md bg-gray-400 hover:bg-blue-400a">
                {activeQuestion == questions.length - 1 ? 'FINSIH' : 'NEXT'}
              </button>
            }
          </div>
        </div>
      ) : (
        <div className="bg-white text-black p-10 mt-3">
          <h2 className="text-xl text-bold">Result</h2>
          <h3>Overall {(result.score/25)*100}%</h3>
          <p>Total questions : <span>{questions.length}</span>
          </p>
          <p>Total Score : <span>{result.score}</span>
          </p>
          <p>Correct Answers : <span>{result.correctAnswers}</span>
          </p>
          <p>Wrong Answers : <span>{result.wrongAnswers}</span>
          </p>
            <button onClick={() => window.location.reload()} className="border text-white p-2 mt-4 rounded-md bg-blue-700 hover:bg-blue-400a">
              Restart
            </button>
        </div>  
      )}</div>

    </>
  );
}
