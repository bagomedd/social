// const PROFILES_URL = "http://localhost:1488/api/"
import { PROFILES_URL } from "./const";
import {useProfileStore} from "@/store/profileStore"


export const profileFields = { 
    // initId : "initId",
    id : "ID",
    userId : "userid",
    username: "username",
    // surname: "surname",
    description : "description",
    birthday: "birthday",
    avatarURL: "avatarurl",
    isOwnProfile: "isownprofile",
    followersCount: "followerscount",
    isFollowed : "isfollowed",
    

 } as const;

export interface IProfile{
    // [profileFields.initId] : number,
    [profileFields.id]     : string,
    [profileFields.userId]     : string,
    [profileFields.username]   : string,
    [profileFields.description] : string,
    [profileFields.birthday] : string,
    [profileFields.avatarURL] : string,
    [profileFields.isOwnProfile] : boolean,
    [profileFields.isFollowed] : boolean,
    [profileFields.followersCount] : number,
    // [profileFields.surname]: string,

}

export const emptyProfile : IProfile = {
    // [profileFields.initId]  : 0,
    [profileFields.id]      : '',
    [profileFields.userId]      : '',
    [profileFields.username]    : '',
    [profileFields.description] : '',
    [profileFields.birthday] : '',
    [profileFields.avatarURL] : '',
    [profileFields.isOwnProfile] : false,
    [profileFields.isFollowed] : false,
    [profileFields.followersCount] : 0,
} as const


function authorizationHeaders(jwt:string) : Headers{
    return(
        new Headers({
        'Authorization' : `Bearer ${jwt}`
    })
    )
}

export function getProfile(shortUrl:string, jwt: string | undefined ) : Promise<IProfile>{ 
        if (!jwt){
            jwt = ''
        }   
        return fetch(PROFILES_URL + "/profiles/" + shortUrl,{
            method: "GET",
            headers : authorizationHeaders(jwt),
        })
        .then((response)=>{
            return response.text();

        })
        .then((json)=>{
            let profileInfo = JSON.parse(json) as IProfile;
            // useProfileStore((state) =>state.setProfile(profileInfo));
            return profileInfo;
    })
}

export function followRequest(shortUrl: string, jwt: string | undefined){
    if (!jwt){
        jwt = ''
    }
    return fetch(PROFILES_URL + "/subscribe/" + shortUrl,{
        method: "POST",
        headers: authorizationHeaders(jwt),
    })
    .then((response)=>{
        return response.ok;
    })
}


export function unfollowRequest(shortUrl: string, jwt: string | undefined){
    if (!jwt){
        jwt = ''
    }
    return fetch(PROFILES_URL + "/unsubscribe/" + shortUrl,{
        method: "POST",
        headers: authorizationHeaders(jwt),
    })
    .then((response)=>{
        return response.ok;
    })
}


// export const postFields = {
//     text : "text",
//     media: "media",
//     music: "music"
// } as const 

// export interface IPost {
//     [postFields.text] : string;
//     // ОГРАНИЧИТЬ ДО 10 ЭЛЕМЕНТОВ
//     [postFields.media] : Array<string>;
//     // ОГРАНИЧИТЬ ДО 3 ЭЛЕМЕНТОВ
//     [postFields.music] : Array<string>;
// }


// const postExample : IPost = {
//     [postFields.text] : "Privet eto moi perviy post",
//     [postFields.media]: [
//         PROFILES_URL + "/media/media_0",
//         PROFILES_URL + "/media/media_1",
//         PROFILES_URL + "/media/media_2",
//         PROFILES_URL + "/media/media_3",
//         PROFILES_URL + "/media/media_4",
//         PROFILES_URL + "/media/media_5",
//         PROFILES_URL + "/media/media_6",
//         PROFILES_URL + "/media/media_7",
//         PROFILES_URL + "/media/media_8",
//         PROFILES_URL + "/media/media_9"
//     ],
//     [postFields.music] : [
//         PROFILES_URL + "/music/music_0",
//         PROFILES_URL + "/music/music_1",
//         PROFILES_URL + "/music/music_2"
//     ]
// }



// export function getFeed() : Promise<IPost>{    
//     return fetch(PROFILES_URL + "post",{
//         method: "GET",
//     })
//     .then((response)=>{
//         return response.text();
//     })
//     .then((json)=>{
//         // console.log(json);
//         return JSON.parse(json) as IPost;
//         // return JSON.parse(json);
// })
// }

// export function postRegisterFormData(formData : FormData){
//     return fetch(PROFILES_URL + "postFormData",{
//         method : "POST",
//         body: formData,
//     })
//     .then((response)=>{
//         console.log(response);
//     })
// }

// export function getPage(shortUrl: string) : Promise<string>{    
//         return fetch(PROFILES_URL + shortUrl,{
//             method: "GET",
//         })
//         .then((response)=>{
//             return response.text();
//         })
//         .then((json)=>{
//             return json;
//     })
// }

