import {AUTH_URL, DEFAULT_IP} from "@/utils/const"
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import {IAccessToken} from "@/utils/cookies";
import { IProfile, getProfile } from "./profile";
import { ProfileInit } from "@/store/ProfileInit";



export interface ILoginPost{
    email: string,
    password : string,
}
export interface IRegisterPost{
    email: string,
    username: string,
    password: string,
}



async function login(req: NextRequest, jsonBody : string ){
    
}

// export async function checkIsLogged(jwt? : string | undefined){
//     let redirectPath = '/';
//     if (!jwt){
//         return false;
//     }
//     else{
//         // ОБРАБОТКА, НОРМ ЛИ ОТВЕТ
//         let profile : IProfile = await getProfile("me", jwt);
//         return true;
//     }
// }