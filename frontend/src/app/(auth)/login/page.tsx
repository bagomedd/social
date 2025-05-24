"use client";
//import React, { ChangeEvent } from 'react'
import { useState, useRef } from "react";
import styles from "@/styles/auth.module.css";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function loginPage() {
	const loginError = "";

	interface ILoginValues {
		email: string;
		password: string;
	}

	function newLoginValues(): ILoginValues {
		return {
			email: "",
			password: "",
		};
	}
	const loginValuesRef = useRef<ILoginValues>(newLoginValues());
	const [inputErrors, setInputErrors] = useState<ILoginValues>(newLoginValues());
	const formElementRef = useRef<HTMLFormElement | null>(null);
	const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState<boolean>(false);

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (e) {
			let inputField = e.target.dataset["type"];
			let inputValue = e.target.value;

			let tempLoginValues = { ...loginValuesRef.current };

			inputField === "email" ? (tempLoginValues.email = inputValue) : "";
			inputField === "password" ? (tempLoginValues.password = inputValue) : "";
			loginValuesRef.current = tempLoginValues;
		}
	}
	function handleSubmitButton(e: React.MouseEvent<HTMLButtonElement>) {
		if (e) {
			setIsSubmitButtonDisabled(true);
			let tempLoginValues = loginValuesRef.current;
			let tempErrors = newLoginValues();

			tempLoginValues.email.includes("@") === false
				? (tempErrors.email = "Enter valid email")
				: (tempErrors.email = "");

			tempLoginValues.password.length < 6
				? (tempErrors.password = "password must be minimum 6 symbols")
				: tempLoginValues.password.length > 32
				? (tempErrors.password = "password must be maximum 32 symbols")
				: (tempErrors.password = "");

			setInputErrors(tempErrors);
			if (JSON.stringify(tempErrors) == JSON.stringify(newLoginValues())) {
				formElementRef.current!.submit();
			}
			setIsSubmitButtonDisabled(false);
		}
	}

	return (
		<div className={styles["page"]}>
			<p className={styles["error"]}> {loginError} </p>
			<form action="/api/login" method="POST" className={styles["auth-form"]} ref={formElementRef}>
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

				<p className={styles["error"]}>{inputErrors.email}</p>
				<input
					className={styles["input"]}
					placeholder="password"
					name="password"
					data-type="password"
					onChange={(e) => {
						handleInputChange(e);
					}}
				/>
			</form>
			<button
				className={styles["submit-button"]}
				disabled={isSubmitButtonDisabled}
				onClick={(e) => {
					handleSubmitButton(e);
				}}>
				Submit form
			</button>

			<Link href="/register" className={styles["submit-button"]}>
				{" "}
				Register{" "}
			</Link>
		</div>
	);
}
