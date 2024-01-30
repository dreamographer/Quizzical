export default function Student({params}:{params:{id:string}}){
    return(
        <h1>
            This is the Student Page for {params.id}
        </h1>
    )
}