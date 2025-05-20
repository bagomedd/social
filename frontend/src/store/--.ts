// "use client";
// import { IProfile } from "@/utils/profile";
// import { useProfileStore } from "@/store/profileStore";
// import { useEffect } from "react";
// export function ProfileInit({ profileInfo }: { profileInfo: IProfile | null }) {
// 	let setProfile = useProfileStore((state) => state.setProfile);
// 	let clearProfile = useProfileStore((state) => state.clearProfile);
// 	useEffect(() => {
// 		if (profileInfo) {
// 			setProfile(profileInfo);
// 		} else {
// 			clearProfile();
// 		}
// 	}, []);

// 	return null;
// }
