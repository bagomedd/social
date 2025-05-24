"use client";
import { useState, useRef } from "react";
import styles from "@/styles/auth.module.css";
import { IRegisterValues, newRegisterValues } from "@/utils/register";
import Link from "next/link";

export default function registerPage() {
	const registrationError = "error";
	const registerValuesRef = useRef<IRegisterValues>(newRegisterValues());
	const [inputErrors, setInputErrors] = useState<IRegisterValues>(newRegisterValues());
	const formElementRef = useRef<HTMLFormElement | null>(null);

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (e) {
			let inputField = e.target.dataset["type"];
			let inputValue = e.target.value;

			let tempRegisterValues = { ...registerValuesRef.current };

			inputField === "email" ? (tempRegisterValues.email = inputValue) : "";
			inputField === "username" ? (tempRegisterValues.username = inputValue) : "";
			inputField === "password" ? (tempRegisterValues.password = inputValue) : "";
			inputField === "confirmPassword" ? (tempRegisterValues.confirmPassword = inputValue) : "";
			registerValuesRef.current = tempRegisterValues;
		}
	}
	function handleSubmitButton(e: React.MouseEvent<HTMLButtonElement>) {
		if (e) {
			let tempRegisterValues = registerValuesRef.current;
			let tempErrors = newRegisterValues();

			tempRegisterValues.email.includes("@") === false
				? (tempErrors.email = "Enter valid email")
				: (tempErrors.email = "");

			// tempRegisterValues.username.length < 5 ? tempErrors.username = "username must be minimum 5 symbols" :
			// tempRegisterValues.username.length > 15 ? tempErrors.username = "username must be maximum 15 symbols" : tempErrors.username ='';

			tempRegisterValues.username.length == 0 ? (tempErrors.username = "Enter your username") : "";
			tempRegisterValues.username.length > 10 ? (tempErrors.username = "Username must be maximum 10 symbols") : "";

			tempRegisterValues.password.length < 6
				? (tempErrors.password = "password must be minimum 6 symbols")
				: tempRegisterValues.password.length > 32
				? (tempErrors.password = "password must be maximum 32 symbols")
				: (tempErrors.password = "");

			tempRegisterValues.confirmPassword.length < 6
				? (tempErrors.confirmPassword = "password must be minimum 6 symbols\n")
				: tempRegisterValues.confirmPassword.length > 32
				? (tempErrors.confirmPassword = "password must be maximum 32 symbols\n")
				: (tempErrors.confirmPassword = "");

			tempRegisterValues.password !== tempRegisterValues.confirmPassword
				? (tempErrors.confirmPassword += "\npassword must be the same")
				: null;

			setInputErrors(tempErrors);
			if (JSON.stringify(tempErrors) == JSON.stringify(newRegisterValues())) {
				formElementRef.current!.submit();
			}
		}
	}

	return (
		<div className={styles["page"]}>
			<p className={styles["error"]}> {registrationError} </p>
			<form action="/api/register" method="POST" className={styles["auth-form"]} ref={formElementRef}>
				<p className={styles["error"]}>{inputErrors.email}</p>
				<input
					className={styles["input"]}
					placeholder="email"
					name="email"
					data-type="email"
					onChange={(e) => {
						handleInputChange(e);
					}}
				/>
				<p className={styles["error"]}>{inputErrors.username}</p>
				<input
					className={styles["input"]}
					placeholder="username"
					data-type="username"
					name="username"
					onChange={(e) => {
						handleInputChange(e);
					}}
				/>
				<p className={styles["error"]}>{inputErrors.password}</p>
				<input
					className={styles["input"]}
					placeholder="password"
					data-type="password"
					name="password"
					onChange={(e) => {
						handleInputChange(e);
					}}
				/>
				<p className={styles["error"]}>{inputErrors.confirmPassword}</p>
				<input
					className={styles["input"]}
					placeholder="Confirm password"
					data-type="confirmPassword"
					onChange={(e) => {
						handleInputChange(e);
					}}
				/>
			</form>
			<button
				onClick={(e) => {
					handleSubmitButton(e);
				}}
				type="button"
				className={styles["submit-button"]}>
				Submit form
			</button>
			<Link href="/login" className={styles["submit-button"]}>
				{" "}
				Login{" "}
			</Link>
		</div>
	);
}
