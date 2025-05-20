import { deleteToken } from "./cookies";
import { deleteTokenClient } from "./CookiesClient";
import { redirect } from "next/navigation";
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
