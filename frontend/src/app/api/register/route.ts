import { registerFetch } from "@/utils/auth";
import { NextRequest } from "next/server";

export interface IRegisterApi {
	email: string;
	username: string;
	password: string;
}

export async function POST(req: NextRequest) {
	let formData: FormData = await req.formData();

	var object = {};
	formData.forEach(function (value, key) {
		//@ts-ignorenpmnp
		object[key] = value;
	});
	var json = JSON.stringify(object);
	return await registerFetch(json, req);
	// return NextResponse.redirect('/');
}
