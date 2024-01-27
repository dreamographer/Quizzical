"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { AxiosResponse } from 'axios';
export default function Quiz() {

  const [allQuestions, setallQuestions] = useState<{
    id: number;
    question: string;
    answers: string[];
    correctAnswer: string;
  }[] | []>([])
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectetedAnswer] = useState(false);
  const [selectedAnswerIndex, setSelectetedAnswerIndex] = useState<Number | null>(null);
  const [checked, setChecked] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true)
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  useEffect(() => {
    async function fetchData() {
      try {
        let data: AxiosResponse = await axios.get('http://localhost:3000/master/api')
        setallQuestions(data.data)

      } catch (error) {
        console.log(error)
      }
      finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])
  const { question, answers, correctAnswer } = allQuestions[activeQuestion] || {};
  const onAnswerSelected = (ans: string, idx: number) => {
    setChecked(true)
    setSelectetedAnswerIndex(idx)
    if (ans == correctAnswer) {
      setSelectetedAnswer(true)
    } else {
      setSelectetedAnswer(false)
    }
  }

  const nextQuestion = () => {
    setSelectetedAnswerIndex(null)
    setResult((prev) => selectedAnswer ? {
      ...prev,
      score: prev.score + 2,
      correctAnswers: prev.correctAnswers + 1
    } :
      {
        ...prev,
        wrongAnswers: prev.wrongAnswers + 1
      }
    )
    if (activeQuestion != allQuestions.length - 1) {
      setActiveQuestion((prev) => prev + 1)
    } else {
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
      <div className="text-center mt-7">
        <h2>
          Question: {activeQuestion + 1}
          <span>/ {allQuestions.length}</span>
        </h2>
      </div>
      {
       
        loading ?
          <div className="flex justify-center">

            <div className="h-full  w-1/2 rounded-lg shadow-xl bg-slate-950 p-10 ">
              <div className="flex animate-pulse justify-center">
              <h2 className="w-36 text-center bg-gray-300 h-6 rounded-md "></h2>

              </div>
              <div className="flex mt-5 animate-pulse flex-wrap">
                <button className="border  bg-gray-800 h-10  rounded-sm text-center w-1/2"></button>
                <button className="border  bg-gray-800  h-10 rounded-sm text-center w-1/2"></button>
                <button className="border  bg-gray-800 h-10 rounded-sm text-center w-1/2"></button>
                <button className="border  bg-gray-800 h-10 rounded-sm text-center w-1/2"></button>
          </div>
              <div className="flex mt-5 animate-pulse justify-center ">
                <button className="border w-10  bg-gray-800 h-10  rounded-sm"></button>
                </div>

         </div>
        </div>
          : <div>{!showResult ? (<div className="flex justify-center">
            <div className="h-full w-1/2 rounded-lg shadow-xl bg-slate-950 p-10 ">
              <h1 className="text-center">{question}</h1>
              <div className="h-24 flex mt-5 flex-wrap w-full justify-center">
                {answers && answers.map((ans, idx) => {
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
                    {activeQuestion == allQuestions.length - 1 ? 'FINSIH' : 'NEXT'}
                  </button>
                  :
                  <button disabled className="border p-2 mt-4   rounded-md bg-gray-400 hover:bg-blue-400a">
                    {activeQuestion == allQuestions.length - 1 ? 'FINSIH' : 'NEXT'}
                  </button>
                }
              </div>
            </div>
          </div>
          ) : (
            <div className="flex justify-center">

              <div className="bg-white m-10 p-10 w-1/2  rounded-xl text-black">
                <h2 className="text-xl text-bold">Result</h2>
                <h3>Overall {(result.score / (allQuestions.length * 2)) * 100}%</h3>
                <p>Total questions : <span>{allQuestions.length}</span>
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
            </div>
          )}</div>
      }


    </>
  );
}
