import { NextRequest } from "next/server";
import { loginFetch } from "@/utils/auth";

export async function POST(req: NextRequest) {
	let formData: FormData = await req.formData();

	var object = {};
	formData.forEach(function (value, key) {
		//@ts-ignore
		object[key] = value;
	});
	var json = JSON.stringify(object);

	return await loginFetch(json, req);
}
