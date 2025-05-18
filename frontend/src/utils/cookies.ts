import { cookies } from "next/headers";


export interface IAccessToken{
    "access_token":string,
}

export async function getToken(){
    let cookiesStore = await cookies();
    return cookiesStore.get('token')?.value;
}