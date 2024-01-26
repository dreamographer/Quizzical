import { questions } from "@/app/data";


export async function GET() {
  return new Response(JSON.stringify(questions));
}


export async function POST(request:Request) {
    const data=await request.json()
    questions.push(data)
    return new Response(JSON.stringify(questions));
}