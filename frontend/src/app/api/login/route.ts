
import { NextRequest, NextResponse} from "next/server";
import { login } from "@/utils/auth";

export interface ILoginApi{
    "username" : string,
    "password" : string,
}


export async function POST(req: NextRequest){
    let formData : FormData = await req.formData()
    
    var object = {};
    formData.forEach(function(value, key){
        //@ts-ignore
        object[key] = value;
    });
    var json = JSON.stringify(object);

    login(req, json)   
    // return NextResponse.redirect('/');
    
} 