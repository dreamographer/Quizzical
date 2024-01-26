"use server"
import { questions } from "../data";
export const Adduser = async (data: {
  id: number;
  question: string;
  answers: string[];
  correctAnswer: string;
}) => {
  console.log(questions.push(data));
  
  return questions;
};
