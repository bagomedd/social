'use client'
import styles from "@/styles/profile.module.css"
import {IProfile, getProfile} from "@/utils/profile"
import { profileFields as prF } from "@/utils/profile";
import {useState} from "react"
import { redirect } from "next/navigation";
import { followRequest, unfollowRequest } from "@/utils/profile";

export function Profile({profileInfo, profileName, accessToken} : {profileInfo : IProfile, profileName:string, accessToken : string | undefined }){
    const [profileState, setProfileState] = useState<IProfile>(profileInfo);1

    function followButton(){
      followRequest(profileName,accessToken)
      .then((isOk)=>{
        console.log('STATUS OF SUBSCRIBE IS ', isOk);
        if (isOk){
          getProfile(profileName, accessToken)
          .then((_profileInfo)=>{
            setProfileState(_profileInfo);
          });}
        
          else{
          console.log("PROFILE INFO HAS NOT UPDATED, STATUS IS : ", isOk);
        }
      })
    }
    function unfollowButton(){
      unfollowRequest(profileName,accessToken)
      .then((isOk)=>{
        if (isOk){
          // setIsFollow(true);
          getProfile(profileName, accessToken)
          .then((_profileInfo)=>{
            setProfileState(profileInfo);
          });}
        else{
          console.log("PROFILE INFO HAS NOT UPDATED, STATUS IS : ", isOk);
        }
      })
    }
    function editInfo(){
      redirect('/editInfo')
    }


    return(
    <>
        <div className={styles["profile-layout"]}>
        <div className={styles["background-image-layout"]}>
          <div className={styles["background-image"]}>
            <div className={styles["buttons-on-image"]}>
              
              {!profileState[prF.isOwnProfile] ?
              (
              // isFollow ?
              profileState[prF.isFollowed] ? 
              <>
              <button onClick={unfollowButton} className={styles["button-add-friend"]}> Unfollow </button> 
              <button className={styles["button-send-message"]}> Send message </button>
             </>
             :
             <>
              <button onClick={followButton}   className={styles["button-add-friend"]}> Follow </button>
              <button className={styles["button-send-message"]}> Send message </button>
              </>
              ): 
              <button className={styles["button-add-friend"]} onClick={editInfo}> Edit Info </button>
              }  


            </div>
            <div className={styles["short-info"]}>
              {/* <p className={styles["name"]}> {profileInfo[prF.username]} </p>   */}
              <p className={styles["name"]}> {profileState[prF.username]} </p>  
              {/* <p className={styles["surname"]}> {profileInfo[prF.surname]} </p>   */}
            </div>
          </div>  
        {/* <img className={styles["profile-image"]} src={profileInfo[prF.avatarURL]} alt={profileInfo[prF.avatarURL]} /> */}
        {/* <img className={styles["profile-image"]} src={profileInfo[prF.avatarURL]} alt="can't resolve" /> */}
        <img className={styles["profile-image"]} src={profileState[prF.avatarURL]} alt="can't resolve" />
        <div className={styles["profile-image-trace"]}> </div>
      </div>
    <div > 

      <p>{profileState[prF.description]} </p>
      <p> Birthday: {profileState[prF.birthday]} </p>
      <p> Followers Count: {profileState[prF.followersCount]} </p>
      {/* <p>{profileInfo[prF.description]} </p>
      <p> Birthday: {profileInfo[prF.birthday]} </p>
      <p> Followers Count: {profileInfo[prF.followersCount]} </p> */}
    </div>
  </div>
    </>
    );
}