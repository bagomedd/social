"use client";
import styles from "@/styles/profile.module.css";
import { useState, useRef, useEffect, JSX } from "react";
import { redirect } from "next/navigation";

import { IProfile, getFollows, getProfile } from "@/utils/profile";
import { followRequest, unfollowRequest } from "@/utils/profile";
import { IProfileShort } from "@/utils/profile";
import { profileFields as prF } from "@/utils/profile";
import { profileShortFields as prsF } from "@/utils/profile";

import Link from "next/link";

export function Profile({
	profileInfo,
	profileName,
	accessToken,
	followers,
	followed,
}: {
	followers: Array<IProfileShort> | null;
	followed: Array<IProfileShort> | null;
	profileInfo: IProfile;
	profileName: string;
	accessToken: string | undefined;
}) {
	const [followsState, setFollowsState] = useState<Array<IProfileShort> | null>(null);
	const followsMenuRef = useRef<HTMLDivElement | null>(null);
	const pageFilterRef = useRef<HTMLDivElement | null>(null);
	const [profileState, setProfileState] = useState<IProfile>(profileInfo);
	const VISIBLE_FOLLOWERS_COUNT = 4;

	function followButton() {
		followRequest(profileName, accessToken).then((isOk) => {
			if (isOk) {
				getProfile(profileName, accessToken).then((_profileInfo) => {
					setProfileState(_profileInfo);
				});
			} else {
				console.log("PROFILE INFO HAS NOT UPDATED, STATUS IS : ", isOk);
			}
		});
	}
	function unfollowButton() {
		unfollowRequest(profileName, accessToken).then((isOk) => {
			if (isOk) {
				getProfile(profileName, accessToken).then((_profileInfo) => {
					setProfileState(_profileInfo);
				});
			} else {
				console.log("PROFILE INFO HAS NOT UPDATED, STATUS IS : ", isOk);
			}
		});
	}
	function editInfo() {
		redirect("/editInfo");
	}
	function openFollows(e: React.MouseEvent) {
		console.log(followsMenuRef);
		let buttonType = (e.target as HTMLDivElement).dataset["buttonType"];
		if (buttonType == "followers") {
			setFollowsState(followers);
			followsMenuRef.current!.style.visibility = "visible";
			pageFilterRef.current!.style.visibility = "visible";
		} else if (buttonType == "followed") {
			setFollowsState(followed);
			followsMenuRef.current!.style.visibility = "visible";
			pageFilterRef.current!.style.visibility = "visible";
		}
	}
	function closeMenu() {
		followsMenuRef.current!.style.visibility = "hidden";
		pageFilterRef.current!.style.visibility = "hidden";
	}

	return (
		<>
			<div
				onClick={(e) => {
					closeMenu();
				}}
				className={styles["page-filter"]}
				ref={pageFilterRef}
			/>

			<div className={styles["followers-menu-container"]} ref={followsMenuRef} onClick={closeMenu}>
				<div className={styles["followers-menu"]}>
					{followsState
						? followsState.map((profileShort: IProfileShort, index: number) => {
								return (
									<Link key={index} className={styles["follower"]} href={profileShort[prsF.username]}>
										<img className={styles["follower-image"]} src={profileShort[prsF.avatarURL]} />
										<span className={styles["follower-name"]}> {profileShort[prsF.username]} </span>
									</Link>
								);
						  })
						: "Здесь пока пусто :("}
				</div>
			</div>

			<div className={styles["profile-layout"]}>
				<div className={styles["background-image-layout"]}>
					<div className={styles["background-image"]}>
						<div className={styles["profile-image-trace"]}>
							<img className={styles["profile-image"]} src={profileState[prF.avatarURL]} alt="can't resolve" />
						</div>
						<div className={styles["profile-ui"]}>
							<div className={styles["buttons-on-image"]}>
								{!profileState[prF.isOwnProfile] ? (
									profileState[prF.isFollowed] ? (
										<>
											<button onClick={unfollowButton} className={styles["button-add-friend"]}>
												{" "}
												Unfollow{" "}
											</button>
											<button className={styles["button-send-message"]}> Send message </button>
										</>
									) : (
										<>
											<button onClick={followButton} className={styles["button-add-friend"]}>
												{" "}
												Follow{" "}
											</button>
											<button className={styles["button-send-message"]}> Send message </button>
										</>
									)
								) : (
									<button className={styles["button-add-friend"]} onClick={editInfo}>
										{" "}
										Edit Info{" "}
									</button>
								)}
							</div>
							<div className={styles["space-block"]} />
							<div className={styles["short-info"]}>
								<p className={styles["name"]}> {profileState[prF.username]} </p>
								<p className={styles["description"]}> {profileState[prF.description]} </p>
							</div>
						</div>
					</div>
				</div>
				<div>
					{/* 
      <p>{profileState[prF.description]} </p>
      <p> Birthday: {profileState[prF.birthday]} </p>
      <p> Followers Count: {profileState[prF.followersCount]} </p> */}
				</div>
				<div className={styles["under-profile"]}>
					<div className={styles["media"]}>
						<div className={styles["media-layout"]}>
							<div className={styles["media-buttons-ul"]}>
								<button className={`${styles["media-button"]} ${styles["selected-btn"]}`}> Фото </button>
								<button className={`${styles["media-button"]} ${styles["unselected-btn"]}`}> Музыка </button>
								<button className={`${styles["media-button"]} ${styles["unselected-btn"]}`}> Альбомы </button>
								<button className={`${styles["media-button"]} ${styles["unselected-btn"]}`}> Клипы </button>
							</div>
							<div className={`${styles["media-content"]} ${styles["media-content-photos"]}`}>
								<img className={styles["grid-element"]} src="/" alt="1" />
								<img className={styles["grid-element"]} src="/" alt="2" />
								<img className={styles["grid-element"]} src="/" alt="3" />
								<img className={styles["grid-element"]} src="/" alt="4" />
								<img className={styles["grid-element"]} src="/" alt="5" />
								<img className={styles["grid-eleme	nt"]} src="/" alt="6" />
							</div>
						</div>
					</div>

					<div className={styles["followers-section"]}>
						<div
							data-button-type="followers"
							className={styles["followers-count"]}
							onClick={(e) => {
								openFollows(e);
							}}>
							{" "}
							Подписчики: {profileInfo[prF.followersCount]}{" "}
						</div>
						<div className={styles["followers-bar"]}>
							{followers ? (
								followers.slice(0, VISIBLE_FOLLOWERS_COUNT).map((profileShort: IProfileShort, index: number) => {
									return (
										<Link key={index} className={styles["follower"]} href={profileShort[prsF.username]}>
											<img className={styles["follower-image"]} src={profileShort[prsF.avatarURL]} />
											<span className={styles["follower-name"]}> {profileShort[prsF.username]} </span>
										</Link>
									);
								})
							) : (
								<>Здесь пока никого :(</>
							)}
						</div>
						<div className={styles["line"]}></div>
						<div className={styles["followers-bar"]}>
							<div
								data-button-type="followed"
								className={styles["followers-count"]}
								onClick={(e) => {
									openFollows(e);
								}}>
								Подписан
							</div>
							{followed ? (
								followed.slice(0, VISIBLE_FOLLOWERS_COUNT).map((profileShort: IProfileShort, index: number) => {
									return (
										<Link key={index} className={styles["follower"]} href={profileShort[prsF.username]}>
											<img className={styles["follower-image"]} src={profileShort[prsF.avatarURL]} />
											<span className={styles["follower-name"]}> {profileShort[prsF.username]} </span>
										</Link>
									);
								})
							) : (
								<div className={styles["followers-space"]}>Здесь пусто :( </div>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
