"use client";
import React, { useEffect, useState } from "react";
import { questions } from "../data";
import axios from "axios";
import { AxiosResponse } from 'axios';
export default function Master() {
    const [allQuestions, setallQuestions] = useState(questions)
    const [question, setQuestion] = useState<string>('')
    const [option1, setOption1] = useState<string>('')
    const [option2, setOption2] = useState<string>('')
    const [option3, setOption3] = useState<string>('')
    const [option4, setOption4] = useState<string >('')
    const [answer, setAnswer] = useState<string >('')
    const [addUser,setAddUser]=useState(false)
    const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const update = await axios.post('http://localhost:3000/master/api', { id: allQuestions.length + 1, question: question, answers: [option1, option2, option3, option4], correctAnswer: answer }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        setallQuestions(update.data);
        
    }
    useEffect(() => {
        async function fetchData() {
            let data: AxiosResponse = await axios.get('http://localhost:3000/master/api')
            console.log(data.data)
            setallQuestions(data.data)
        }
        fetchData()
    }, [])
    return (
        <>
            <div  className="p-5 text-3xl flex justify-center font-bold">
                <h1>Quiz Master Page</h1>
            </div>
            <div className="flex justify-center">

            <div className="bg-white m-10 p-10 w-1/2  rounded-xl text-black">
                <h3 className="text-center font-medium text-xl">Current Questions</h3>
                {allQuestions.map((qes, idx) => {
                    return (<div key={idx} className="grid  grid-cols-3 p-5">
                        <div className="col-start-2">
                            <p >Question : {qes.question}</p>
                            <p >options : {qes.answers.map((opt) => `${opt},`)}</p>
                            <p >Answer : {qes.correctAnswer}</p>
                        </div>
                        {/* <div>
                            Edit
                        </div> */}
                    </div>
                    )
                })}
            </div>
            </div>
            <div className="flex justify-center mt-4">
                <button className="bg-blue-800 p-3 rounded-lg " onClick={()=>setAddUser(true)}> Add NewQuestion </button>
            </div>{addUser&&
            <div className="flex justify-center">

            
            <div className="h-full w-1/2 rounded-lg shadow-xl bg-slate-950 p-10 ">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="text-black justify-center gap-5 mt-5 flex items-center flex-col">
                            <label className="text-white" htmlFor="question ">Enter the question</label>
                        <div className=" gap-7">
                            <input onChange={(e) => setQuestion(e.target.value)} type="text" className="w-80 h-9 rounded-md p-4" name="question" id="question" />
                        </div>
                            <label className="text-white" htmlFor="options">Provide the Options</label>
                        <div className="flex   flex-wrap justify-center gap-6">
                            <input  onChange={e=>setOption1(e.target.value)}  type="text" className="w-80 h-9 rounded-md p-4" name="option1" />
                            <input onChange={e => setOption2(e.target.value)} type="text" className="w-80 h-9 rounded-md p-4" name="option2" />
                            <input onChange={e => setOption3(e.target.value)} type="text" className="w-80 h-9 rounded-md p-4" name="option3" />
                            <input onChange={e => setOption4(e.target.value)} type="text" className="w-80 h-9 rounded-md p-4" name="option4" />
                        </div>
                        <label className="text-white" htmlFor="answer">Choose The correct Answer</label>
                        <select name="answer" className=" text-black  rounded-md p-4" onChange={(e) => setAnswer(e.target.value)} >
                            <option  value='' selected disabled>Choose Your Answer</option>
                            {option1&&<option  defaultValue={option1}>{option1}</option>}
                                {option2 && <option  defaultValue={option2}>{option2}</option>}
                                {option3 && <option  defaultValue={option3}>{option3}</option>}
                            {option4&&<option  defaultValue={option4}>{option4}</option>}
                        </select>
                        <div className="flex gap-5">
                        <button className="bg-blue-800 text-white p-3 rounded-lg">Submit</button>
                                <button onClick={() => setAddUser(false)} className="bg-blue-800 text-white p-3 rounded-lg">cancel</button>
                        </div>
                    </div>
                </form>
                </div>
            </div>}
        </>
    )
}