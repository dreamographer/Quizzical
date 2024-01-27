import { questions } from "@/app/data";

export async function DELETE(request:Request,{params}:{params:{ id:string}}){
    const index=questions.findIndex((ele)=>ele.id==Number(params.id))
    questions.splice(index,1)
    return new Response(JSON.stringify(questions))
}