"use client";
import styles from "@/styles/layout.module.css";
import { IProfileShort, IProfile, getProfilesByName } from "@/utils/profile";
import { profileShortFields as prsF } from "@/utils/profile";
import { logout } from "@/utils/auth";
import { useRef, useState, useEffect } from "react";
import { getTokenClient } from "@/utils/CookiesClient";
import { JSX } from "react";
import { redirect } from "next/navigation";
const VISIBLE_ACCOUNTS_COUNT = 4;

function SearchMenuContent({ searchedProfiles }: { searchedProfiles: Array<IProfileShort> }) {
	return <></>;
}

export function TopUI() {
	const searchMenuRef = useRef<HTMLDivElement | null>(null);
	const [searchedProfiles, setSearchedProfiles] = useState<Promise<Array<IProfileShort> | null> | null>(null);
	const [searchMenuContent, setSearchMenuContent] = useState<JSX.Element>(<></>);
	// const profileInfo: IProfile | null = useProfileStore((state) => state.profile);
	const isSearchEmpty = useRef<boolean>(true);

	let accessToken = getTokenClient("access");

	function showMenu() {
		searchMenuRef.current!.style.visibility = "visible";
	}
	const closeMenu = () => {
		searchMenuRef.current!.style.visibility = "hidden";
	};

	useEffect(() => {
		if (searchedProfiles) {
			setSearchMenuContent(<>Загрузка</>);
			searchedProfiles.then((_searchedProfiles) => {
				if (isSearchEmpty.current) {
				} else {
					if (_searchedProfiles) {
						setSearchMenuContent(
							<>
								{_searchedProfiles.slice(0, VISIBLE_ACCOUNTS_COUNT).map((element, index) => {
									return (
										<div
											key={index}
											onClick={() => {
												closeMenu();
												redirect("/" + element[prsF.username]);
											}}
											className={styles["searched-profile"]}>
											<img className={styles["searched-profile-image"]} src={element[prsF.avatarURL]} />
											<div className={styles["searched-profile-name"]}> {element[prsF.username]} </div>
										</div>
									);
								})}
							</>
						);
					} else {
						setSearchMenuContent(<>Пользователей с таким именем не найдено</>);
					}
				}
			});
		}
	}, [searchedProfiles]);

	return (
		<header className={styles["header"]}>
			<ul className={styles["header-ul"]}>
				<li className={styles["header-element"]}>logo</li>
				<li className={`${styles["header-element"]} ${styles["header-element-search"]}`}>
					<input
						className={styles["search"]}
						placeholder="Поиск"
						onFocus={showMenu}
						onChange={(e) => {
							if (e.target.value != "") {
								isSearchEmpty.current = false;
								setSearchedProfiles(getProfilesByName(e, accessToken));
							} else {
								isSearchEmpty.current = true;
								setSearchedProfiles(null);
								setSearchMenuContent(<></>);
							}
						}}
					/>
					<div className={styles["search-menu"]} ref={searchMenuRef}>
						{searchMenuContent}
						{/* <SearchMenuContent searchedProfiles={searchedProfiles} searchMenuRef={searchMenuRef} /> */}
					</div>
				</li>
				<li className={styles["header-element"]}>notif</li>
				<li className={styles["header-element"]}>music</li>
				<li onMouseOver={logout} className={styles["header-element"]}>
					log out
				</li>
				{/* Это лучшее решение	 */}
			</ul>
		</header>
	);
}

export function SideUI() {
	return (
		<aside className={styles["side-ui"]}>
			<ul className={styles["side-ul"]}>
				<li className={styles["side-element"]}>Profile</li>
				<li className={styles["side-element"]}>Messages</li>
				<li className={styles["side-element"]}>Friends</li>
				<li className={styles["side-element"]}>Communities</li>
				<li className={styles["side-element"]}>Music</li>
				<li className={styles["side-element"]}>Bookmarks</li>
			</ul>
		</aside>
	);
}
