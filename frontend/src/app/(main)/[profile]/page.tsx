'use server'
import {getProfile, IProfile} from "@/utils/profile"
import {Profile} from "@/Components/Profile"

import { profileFields } from "@/utils/profile";
// import {getToken} from ""

import { getToken } from "@/utils/cookies";
export default async function Page({params} : {params : Promise<{profile : string}>}){
  // const jwtToken = getToken();

  // const [profileInfo, setProfileInfo] = useState<IProfile | null>(null);
  
  // useEffect(()=>{
  let profileInfo : IProfile | null = null; 
  
  const {profile} = await params;
  
  let accessToken = await getToken();
  
  const myProfile : IProfile = {
    // [profileFields.initId]  : 0,
    [profileFields.id]      : '1',
    [profileFields.userId]      : 'myProfileId',
    [profileFields.username]    : 'myProfile',
    [profileFields.description] : 'It is my profile',
    [profileFields.birthday] : '24.03.25',
    [profileFields.avatarURL] : '/default.jpg',
    [profileFields.isOwnProfile] : true,
    [profileFields.isFollowed] : false,
    [profileFields.followersCount] : 20,
  }
// profileInfo = await getProfile(profile, accessToken);
  if (profile == "myProfile"){
    profileInfo = myProfile;
  }

  
  return(
  <>
      {/* {(profileInfo && profileInfo[prF.isOwnProfile]) ? <OwnProfile profileInfo={profileInfo}/>: 
        profileInfo ? <Profile profileInfo ={profileInfo} /> : "Profile isn't loaded"
      } */}
    {profileInfo ? <Profile profileInfo={profileInfo} profileName = {profile} accessToken={accessToken}/> : "Profile isn't loaded"}

  </>
  )
}