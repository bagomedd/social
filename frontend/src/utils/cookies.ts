"use server";
import { cookies } from "next/headers";
export interface IAccessToken {
	access_token: string;
}
export async function setToken(token: "access" | "refresh", accessToken: string) {
	let cookiesStore = await cookies();
	cookiesStore.set("access_token", accessToken);
}

export async function deleteToken(token: "access" | "refresh") {
	let cookiesStore = await cookies();
	cookiesStore.delete("access_token");
}
export async function getToken(token: "access" | "refresh") {
	let cookiesStore = await cookies();
	return cookiesStore.get("access_token")?.value;
}
