import { AUTH_URL, DEFAULT_IP } from "@/utils/const";

import { NextRequest, NextResponse } from "next/server";

export interface IRegisterApi {
	email: string;
	username: string;
	password: string;
}

export async function POST(req: NextRequest) {
	let responseStatus: number = 0;

	let formData: FormData = await req.formData();

	var object = {};
	formData.forEach(function (value, key) {
		//@ts-ignore
		object[key] = value;
	});
	var json = JSON.stringify(object);

	await fetch(AUTH_URL + "/register", {
		body: json,
		method: "POST",
	}).then((response) => {
		if (response.ok) {
			responseStatus = response.status;
		}
	});

	console.log(responseStatus);
	if (Math.floor(responseStatus / 100) == 2) {
		return NextResponse.redirect(new URL(DEFAULT_IP + "/login"));
	}

	return NextResponse.redirect(new URL(DEFAULT_IP + "/register?error=Ошибка при регистрации"));
	// return NextResponse.redirect('/');
}
