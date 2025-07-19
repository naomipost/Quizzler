import { TextField, Button } from "@mui/material";
import { createFormHook, createFormHookContexts, formOptions } from "@tanstack/react-form";
import useSignup from "./useSignup";

export const { fieldContext, formContext, useFieldContext } = createFormHookContexts();

const { useAppForm, withForm: withSignupForm } = createFormHook({
	fieldComponents: {
		TextField,
	},
	formComponents: {
		SubmitButton: Button
	},
	fieldContext,
	formContext
});

type SignupFormValues = {
	username: string
	password: string
	email: string
}

export const signupDefaultValues: SignupFormValues = {
	username: "",
	password: "",
	email: ""
};

export const signupWithForm = withSignupForm;

export const signupFormOpts = formOptions({
	defaultValues: signupDefaultValues
});

export default function useSignupForm() {
	const { mutate } = useSignup();
	return useAppForm({
		defaultValues: signupDefaultValues,
		onSubmit: ({ value }) => {
			const user: SignupFormValues = {
				...value,
			}
			mutate(user);
		}
	})
}