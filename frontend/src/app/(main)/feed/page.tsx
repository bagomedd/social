// // 'use client'
// import { Post } from "@/Components/-Post";
// import {IPost, getFeed} from "@/utils/profile"
// import { postFields as pstF} from "@/utils/profile";
// import { JSX } from "react";

// export default async function feedPage(){
//     let  json : IPost = await getFeed();
//     let media : Array<JSX.Element>;

//     media = json[pstF.media].map((el)=>{
//         return (
//             <p> {el} </p>
//         );
//     })


//     return(<>
//         Feed 
//         <Post postJson={json}/>

//     </>
//     );
// }