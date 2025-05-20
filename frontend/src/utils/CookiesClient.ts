import Cookie from "js-cookie";

export function getTokenClient(token: "access" | "refresh") {
	return Cookie.get(token + "_token") || "";
}
export function deleteTokenClient(token: "access" | "refresh") {
	Cookie.remove(token + "_token");
}
