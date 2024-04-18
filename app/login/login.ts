"use server";
import { cookies } from "next/headers";
import { lucia } from "@/auth";
import { redirect } from "next/navigation";
import { getUserFromEmail } from "../queries";

interface ActionResult {
	error: string;
}


export default async function login(formData: FormData): Promise<ActionResult> {
	console.log("called")
	const email = formData.get("email")?.toString();
	if (
		typeof email !== "string"
	) {
		console.log(typeof email)
		return {
			error: "Invalid username"
		};
		
	}
	const password = formData.get("password")?.toString();
	if (typeof password !== "string") {
		console.log("email")
		return {
			error: "Invalid password"
		};
	}

	const existingUser = await getUserFromEmail(email)
	if (!existingUser) {
		// NOTE:
		// Returning immediately allows malicious actors to figure out valid usernames from response times,
		// allowing them to only focus on guessing passwords in brute-force attacks.
		// As a preventive measure, you may want to hash passwords even for invalid usernames.
		// However, valid usernames can be already be revealed with the signup page among other methods.
		// It will also be much more resource intensive.
		// Since protecting against this is none-trivial,
		// it is crucial your implementation is protected against brute-force attacks with login throttling etc.
		// If usernames are public, you may outright tell the user that the username is invalid.
		return {
			error: "Incorrect username or password"
		};
	}

	if (existingUser.password !== password) {
		return {
			error: "Incorrect username or password"
		};
	}

	const session = await lucia.createSession(String(existingUser.id), {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect("/");
}