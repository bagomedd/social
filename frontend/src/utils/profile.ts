// const PROFILES_URL = "http://localhost:1488/api/"
import { ChangeEvent } from "react";
import { PROFILES_URL } from "./const";

export const profileFields = {
	// initId : "initId",
	id: "ID",
	userId: "userid",
	username: "username",
	// surname: "surname",
	description: "description",
	birthday: "birthday",
	avatarURL: "avatarurl",
	isOwnProfile: "isownprofile",
	followersCount: "followerscount",
	isFollowed: "isfollowed",
} as const;

export interface IProfile {
	// [profileFields.initId] : number,
	[profileFields.id]: number;
	[profileFields.userId]: number;
	[profileFields.username]: string;
	[profileFields.description]: string;
	[profileFields.birthday]: string;
	[profileFields.avatarURL]: string;
	[profileFields.isOwnProfile]: boolean;
	[profileFields.isFollowed]: boolean;
	[profileFields.followersCount]: number;
	// [profileFields.surname]: string,
}

export const profileShortFields = {
	username: "username",
	avatarURL: "avatarurl",
} as const;
export interface IProfileShort {
	[profileShortFields.username]: string;
	[profileShortFields.avatarURL]: string;
}

export function authorizationHeaders(accessToken: string): Headers {
	return new Headers({
		Authorization: `Bearer ${accessToken}`,
	});
}

export function getProfile(shortUrl: string, accessToken: string | undefined): Promise<IProfile> {
	if (!accessToken) {
		accessToken = "";
	}
	return fetch(PROFILES_URL + "/" + shortUrl, {
		method: "GET",
		headers: authorizationHeaders(accessToken),
	})
		.then((response) => {
			return response.text();
		})
		.then((json) => {
			let profileInfo = JSON.parse(json) as IProfile;
			return profileInfo;
		});
}

export function followRequest(shortUrl: string, accessToken: string | undefined) {
	if (!accessToken) {
		accessToken = "";
	}
	return fetch(PROFILES_URL + "/subscribe/" + shortUrl, {
		method: "POST",
		headers: authorizationHeaders(accessToken),
	}).then((response) => {
		return response.ok;
	});
}

export function unfollowRequest(shortUrl: string, accessToken: string | undefined) {
	if (!accessToken) {
		accessToken = "";
	}
	return fetch(PROFILES_URL + "/unsubscribe/" + shortUrl, {
		method: "POST",
		headers: authorizationHeaders(accessToken),
	}).then((response) => {
		return response.ok;
	});
}

export function getFollows(
	profileName: string,
	accessToken: string | undefined,
	type: "followers" | "followed"
): Promise<Array<IProfileShort> | null> {
	let responseStatus: number = 0;
	if (!accessToken) {
		accessToken = "";
	}
	return fetch(PROFILES_URL + "/" + type + "/" + profileName, {
		headers: authorizationHeaders(accessToken),
		method: "GET",
	})
		.then((response: Response) => {
			responseStatus = response.status;
			return response.text();
		})
		.then((json) => {
			try {
				let returnValue = JSON.parse(json) as Array<IProfileShort>;
				return returnValue;
			} catch {
				return null;
			}
		});
}
export async function getProfilesByName(e: ChangeEvent, accessToken: string): Promise<Array<IProfileShort> | null> {
	let inputValue = (e.target as HTMLInputElement).value;

	return fetch(PROFILES_URL + "?search=" + inputValue, {
		method: "GET",
		headers: authorizationHeaders(accessToken),
	})
		.then((response: Response) => {
			return response.text();
		})
		.then((json) => {
			try {
				let returnValue = JSON.parse(json) as Array<IProfileShort>;
				return returnValue;
			} catch {
				return null;
			}
		});
}
