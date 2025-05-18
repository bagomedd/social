'use client'
export default function page(){
    function fek(){
        console.log("http://192.168.1.221:8080/register");
        fetch("http://192.168.1.221:8080/register",{
            body: 'asdfasdf',
            method : "POST",
        })
        .then((response)=>{
            
        })
    }
    return(
        <>
        <form
        action = "/api/editInfo"
        >
            <input
            placeholder="username"
            />
            <input
            placeholder="description"
            />
            <input
            placeholder="user"
            />
            <input
            />
            <button
                type = "submit"
            />
        </form>
        <button onClick = {fek}> SDFOASDF;LKADSJF </button>
        </>
    )
}