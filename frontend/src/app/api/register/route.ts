import { AUTH_URL, DEFAULT_IP} from "@/utils/const";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { APP_CLIENT_INTERNALS } from "next/dist/shared/lib/constants";
import { cookies } from "next/headers";
import { NextRequest, NextResponse} from "next/server";

export interface IRegisterApi{
    "email" : string,
    "username" : string,
    "password" : string,
}
// export function newRegisterApiObject() : IRegisterApi{
//     return{
//         "email" : '',
//         "username": '',
//         "password" : '',
//     }
// }



export async function POST(req: NextRequest){
    // cookies()
    // .then((cookieStore)=>{
    //     return cookieStore.set("token", jwtToken);
    // })
    // .then((e)=>{
    //     return cookies()
    // })
    // .then((cookieStore)=>{
    //     console.log(cookieStore.get("token"));
    // })

    

    let formData : FormData = await req.formData()

    var object = {};
    formData.forEach(function(value, key){
        //@ts-ignore
        object[key] = value;
    });
    var json = JSON.stringify(object);

    fetch(AUTH_URL + "/register",{
        body: json,
        method : "POST",
    })
    .then((response)=>{
        
    })
    
    
    return NextResponse.redirect(new URL(DEFAULT_IP + '/login', req.url));
    // return NextResponse.redirect('/');
    
} 