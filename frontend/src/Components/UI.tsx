'use client'
import styles from "@/styles/layout.module.css"
import Link from "next/link";
import {useProfileStore} from "@/store/profileStore";
import {IProfile} from "@/utils/profile";
import {profileFields as prF} from "@/utils/profile";

export function TopUI(){
    const profileInfo : IProfile | null = useProfileStore((state) => state.profile)
    const profileName : string = profileInfo ? profileInfo[prF.username] : '';
    const profileImage: string = profileInfo ? profileInfo[prF.avatarURL] :'' ;
    return(
        <header className={styles['header']}>
        <ul className={styles['header-ul']}>
          <li className={styles['header-element']}>
            logo
          </li>
          <li className={styles['header-element']}>
            search
          </li>
          <li className={styles['header-element']}>
            notif
          </li>
          <li className={styles['header-element']}>
          music
          </li>
          <li className={styles['header-element']}>
            {/* <div className={styles['header-text']}></div> */}
            {profileInfo ? 
            <Link href = {profileName}>
              <span className={styles['profile-name']}> {profileName} </span>
              <img className={styles['profile-image']} src={profileImage} />
            </Link>
             : 
             <Link href = "/register">
              <span className={styles['profile-name']}> Register </span>
            </Link>
           }
          </li>
        </ul>
      </header>
    )
}

export function SideUI(){
  return (
  <aside className={styles['side-ui']}>
    <ul className={styles['side-ul']}>
      <li className={styles['side-element']}>
        Profile
      </li>  
      <li className={styles['side-element']}>
        Messages
      </li>  
      <li className={styles['side-element']}>
        Friends
      </li>  
      <li className={styles['side-element']}>
        Communities
      </li>  
      <li className={styles['side-element']}>
        Music
      </li>  
      <li className={styles['side-element']}>
        Bookmarks
      </li>

    </ul>
  </aside>
  )

}