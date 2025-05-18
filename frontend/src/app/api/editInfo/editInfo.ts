import { cookies } from "next/headers";
import { NextRequest, NextResponse} from "next/server";
import { IProfile } from "@/utils/profile";


export async function POST(req: NextRequest){
    let formData : FormData = await req.formData()
    const cookieStore = await cookies();
    const jwtToken = cookieStore.get("Authorization")
    if (jwtToken){
        formData.append("Authorization", jwtToken.value);
    }
    
    fetch('localhost:1488/api/postFormData',{
        body: formData,
        method : "POST",
    })
    .then((response)=>{
        
    })
    
    
    return NextResponse.redirect(new URL('/', req.url));
} 