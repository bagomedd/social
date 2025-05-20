"use server";
import { getProfile, getFollows, IProfile } from "@/utils/profile";
import { Profile } from "@/Components/Profile";

import { profileFields } from "@/utils/profile";
import { getToken } from "@/utils/cookies";

import { PROFILES_URL } from "@/utils/const";

// const myProfile: IProfile = {
// 	// [profileFields.initId]  : 0,
// 	[profileFields.id]: "1",
// 	[profileFields.userId]: "myProfileId",
// 	[profileFields.usernaa]: "myProfile",
// 	[profileFields.description]: "It is my profile",
// 	[profileFields.birthday]: "24.03.25",
// 	[profileFields.avatarURL]: "/default.jpg",
// 	[profileFields.isOwnProfile]: true,
// 	[profileFields.isFollowed]: false,
// 	[profileFields.followersCount]: 20,
// };
export default async function Page({ params }: { params: Promise<{ profile: string }> }) {
	const { profile } = await params;
	let accessToken = await getToken("access");
	let profileInfo = await getProfile(profile, accessToken);

	let followers = await getFollows(profile, accessToken, "followers");
	let followed = await getFollows(profile, accessToken, "followed");

	return (
		<>
			{profileInfo ? (
				<Profile
					profileInfo={profileInfo}
					profileName={profile}
					accessToken={accessToken}
					followers={followers}
					followed={followed}
				/>
			) : (
				"Profile isn't loaded"
			)}
		</>
	);
}
