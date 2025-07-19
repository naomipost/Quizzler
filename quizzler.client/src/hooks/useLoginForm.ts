import { TextField, Button } from "@mui/material";
import { createFormHook, createFormHookContexts, formOptions } from "@tanstack/react-form";
import useLogin from "./useLogin";

export const { fieldContext, formContext, useFieldContext } = createFormHookContexts();

const { useAppForm, withForm: withLoginForm } = createFormHook({
    fieldComponents: {
        TextField,
    },
    formComponents: {
        SubmitButton: Button
    },
    fieldContext,
    formContext
});

type LoginFormValues = {
    username: string
    password: string
}

export const loginDefaultValues: LoginFormValues = {
    username: "",
    password: ""
};

export const loginWithForm = withLoginForm;

export const loginFormOpts = formOptions({
    defaultValues: loginDefaultValues
});

export default function useLoginForm() {
    const { mutate } = useLogin();
    return useAppForm({
        defaultValues: loginDefaultValues,
        onSubmit: ({ value }) => {
            const user: LoginFormValues = {
                ...value,
            }
            mutate(user);
        }
    })
}