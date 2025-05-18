
import { NextRequest, NextResponse} from "next/server";
import { AUTH_URL,DEFAULT_IP } from "@/utils/const";
import { cookies } from "next/headers";
import { IAccessToken } from "@/utils/cookies";
import { getProfile } from "@/utils/profile";
import { ProfileInit } from "@/store/ProfileInit";
import { ILoginPost } from "@/utils/auth";


export async function POST(req: NextRequest){
    let formData : FormData = await req.formData()
    
    let json = JSON.stringify(formData as object as ILoginPost);
    
    let responseStatus : number = 0;
    let responseText : string = '';

    fetch(AUTH_URL + "/login",{
        body: json,
        method : "POST",
    })
    .then((response)=>{
        responseStatus = response.status;
        return response.text();
        
    })
    .then((text)=>{
        return responseText = text;
    })

    if (Math.floor(responseStatus/100) == 2){
        let responseJson : IAccessToken | null = null;
        let accessToken : string = '';
        try{
            responseJson = (JSON.parse(responseText) as IAccessToken);
            if (json){
                accessToken = responseJson['access_token'];
            }
            
        const cookieStore = await cookies();
        cookieStore.set('token', accessToken);
        
        let profile = await getProfile("me",accessToken);
        ProfileInit(profile);

        }
        catch{
            throw('error with convert accessToken');
        }

        return NextResponse.redirect(new URL(DEFAULT_IP + '/', req.url));   
    }    
    else{
        return NextResponse.redirect(new URL(DEFAULT_IP + '/login?error=Ошибка при логине', req.url));   
    }
    // return NextResponse.redirect('/');
    
} 