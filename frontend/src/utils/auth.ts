import {AUTH_URL, DEFAULT_IP} from "@/utils/const"
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import {IAccessToken} from "@/utils/cookies";
import { IProfile, getProfile } from "./profile";
import { ProfileInit } from "@/store/ProfileInit";


export async function login(req: NextRequest, jsonBody : string ){
    const response = await fetch(AUTH_URL + "/login",{
        body: jsonBody,
        method : "POST",
    })
    const status = response.status;
    if (status ==200){
        let responseText = await response.text();
        let json : IAccessToken | null = null;
        let accessToken : string = '';
        try{
            json = (JSON.parse(responseText) as IAccessToken);
            if (json){
                accessToken = json['access_token'];
            }
        }
        catch{
            throw('error with convert accessToken');
        }

        const cookieStore = await cookies();
        cookieStore.set('token', accessToken);
        
        let profile = await getProfile("me",accessToken);
        ProfileInit(profile);

        return NextResponse.redirect(new URL(DEFAULT_IP + '/', req.url));   
    }    
    else{
        console.log('ERROR WITH LOGIN');
        return NextResponse.redirect(new URL(DEFAULT_IP + '/login', req.url));   
    }
}