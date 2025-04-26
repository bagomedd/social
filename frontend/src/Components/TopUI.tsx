import styles from "@/styles/layout.module.css"

export function TopUI(){
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
            account
          </li>
        </ul>
      </header>
    )
}