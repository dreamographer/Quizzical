"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { AxiosResponse } from 'axios';
export default function Quiz() {
  const URL: string = process.env.NEXT_PUBLIC_API_URL || ''
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
        let data: AxiosResponse = await axios.get(URL)
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

            <div className="h-full bg-blue-700/45 backdrop-blur-xl md:w-1/2 rounded-lg shadow-xl  p-10 ">
              <div className="flex animate-pulse justify-center">
              <h2 className="w-36 text-center bg-gray-300 h-6 rounded-md "></h2>

              </div>
              <div className=" md:flex mt-5 md:flex-wrap animate-pulse flex-wrap">
                <button className="border  bg-blue-700/15 h-10  rounded-sm text-center w-full  md:w-1/2"></button>
                <button className="border  bg-blue-700/15  h-10 rounded-sm text-center w-full md:w-1/2"></button>
                <button className="border  bg-blue-700/15 h-10 rounded-sm text-center w-full md:w-1/2"></button>
                <button className="border  bg-blue-700/15 h-10 rounded-sm text-center w-full md:m-0 md:w-1/2"></button>
          </div>
              <div className="flex mt-5 animate-pulse justify-center ">
                <button className="border w-16 bg-blue-700/45 h-10   rounded-sm"></button>
                </div>

         </div>
        </div>
          : <div>{!showResult ? (<div className="flex justify-center">
            <div className="h-full  md:w-1/2 rounded-lg shadow-xl bg-blue-700/45 backdrop-blur-xl p-10 ">
              <h1 className="text-center">{question}</h1>
              <div className="h-24 md:flex mt-5 md:flex-wrap w-full justify-center">
                {answers && answers.map((ans, idx) => {
                  return (
                    <button onClick={() => onAnswerSelected(ans, idx)}
                      className={`border ${selectedAnswerIndex == idx ? 'bg-slate-400 bg-blue-700/45' : ''} hover:bg-slate-200 hover:text-black rounded-sm text-center w-full m-1 md:m-0 md:w-1/2`}
                      key={idx}
                    >
                      {ans}
                    </button>
                  );
                })}
              </div>
              <div className="flex justify-center ">
                {checked ?
                  <button onClick={() => nextQuestion()} className="border p-2 md:mt-4 mt-16 rounded-md bg-blue-700 hover:bg-blue-400a">
                    {activeQuestion == allQuestions.length - 1 ? 'FINSIH' : 'NEXT'}
                  </button>
                  :
                  <button disabled className="border p-2 md:mt-4 mt-16  rounded-md bg-gray-400 hover:bg-blue-400a">
                    {activeQuestion == allQuestions.length - 1 ? 'FINSIH' : 'NEXT'}
                  </button>
                }
              </div>
            </div>
          </div>
          ) : (
            <div className="flex justify-center">

                <div className=" bg-blue-700/45 backdrop-blur-xl m-10 p-10 w-1/2  rounded-xl text-white">
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
