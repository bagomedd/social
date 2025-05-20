import { NextRequest, NextResponse } from "next/server";
import { AUTH_URL, DEFAULT_IP } from "@/utils/const";

import { IAccessToken, setToken } from "@/utils/cookies";
import { getProfile, profileFields } from "@/utils/profile";
import { ProfileInit } from "@/store/-";
import { ILoginPost } from "@/utils/auth";

export async function POST(req: NextRequest) {
	let formData: FormData = await req.formData();

	var object = {};
	formData.forEach(function (value, key) {
		//@ts-ignore
		object[key] = value;
	});
	var json = JSON.stringify(object);

	let responseStatus: number = 0;
	let responseText: string = "";
	let profileName: string = "";
	await fetch(AUTH_URL + "/login", {
		body: json,
		method: "POST",
	})
		.then((response) => {
			responseStatus = response.status;
			return response.text();
		})
		.then((text) => {
			return (responseText = text);
		});

	if (Math.floor(responseStatus / 100) == 2) {
		let responseJson: IAccessToken | null = null;
		let accessToken: string = "";
		try {
			responseJson = JSON.parse(responseText) as IAccessToken;
			if (responseJson) {
				accessToken = responseJson["access_token"];
			}

			await setToken("access", accessToken);
			let profile = await getProfile("me", accessToken);
			profileName = profile[profileFields.username];
		} catch {
			throw "error with convert accessToken";
		}

		return NextResponse.redirect(new URL(DEFAULT_IP + "/" + profileName, req.url));
	} else {
		return NextResponse.redirect(new URL(DEFAULT_IP + "/login?error=Ошибка при логине", req.url));
	}
	// return NextResponse.redirect('/');
}
