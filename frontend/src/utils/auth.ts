import { deleteTokenClient } from "./CookiesClient";
import { redirect } from "next/navigation";
import { AUTH_URL, DEFAULT_URL } from "./const";
import { NextRequest, NextResponse } from "next/server";
import { IAccessToken, setToken } from "./cookies";
import { getProfile, profileFields } from "./profile";

export interface ILoginPost {
	email: string;
	password: string;
}
export interface IRegisterPost {
	email: string;
	username: string;
	password: string;
}
export async function logout() {
	deleteTokenClient("access");
	redirect("/register");
}

export async function registerFetch(json: string, req: NextRequest) {
	let responseStatus: number = 0;
	try {
		fetch(AUTH_URL + "/register", {
			body: json,
			method: "POST",
		}).then((response) => {
			if (response.ok) {
				responseStatus = response.status;
			}
		});

		console.log(responseStatus);
		if (Math.floor(responseStatus / 100) == 2) {
			return NextResponse.redirect(new URL("/login", req.url));
		}

		return NextResponse.redirect(new URL(DEFAULT_URL + "/register?error=Ошибка при регистрации"));
	} catch {
		return NextResponse.redirect(new URL(DEFAULT_URL + "/login"));
	}
}
export async function loginFetch(json: string, req: NextRequest) {
	let responseStatus: number = 0;
	let responseText: string = "";
	let profileName: string = "";
	try {
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

			return NextResponse.redirect(new URL(DEFAULT_URL + "/" + profileName));
		} else {
			return NextResponse.redirect(new URL(DEFAULT_URL + "/login?error=Ошибка при логине"));
		}
	} catch {
		return NextResponse.redirect(new URL(DEFAULT_URL + "/" + profileName));
	}
}
