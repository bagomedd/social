"use server";
import { getProfile, getFollows, IProfile } from "@/utils/profile";
import { Profile } from "@/Components/Profile";

import { getToken } from "@/utils/cookies";

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
