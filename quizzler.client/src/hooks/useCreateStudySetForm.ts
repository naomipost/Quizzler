import { Button, TextField } from "@mui/material";
import { createFormHook, createFormHookContexts, formOptions } from "@tanstack/react-form";
import type { StudySetDto } from "./useCreateStudySet";
import useCreateStudySet from "./useCreateStudySet";

export const { fieldContext, formContext, useFieldContext } = createFormHookContexts();

const { useAppForm, withForm: withCreateStudySetForm } = createFormHook({
    fieldComponents: {
        TextField,
    },
    formComponents: {
        SubmitButton: Button
    },
    fieldContext,
    formContext
})

export const createStudySetDefaultValues: StudySetDto = {
    name: '',
    owner: {
        id: '',
        username: '',
        studySets: [],
        password: ''
    },
    flashcards: [],
}

export const createStudySetWithForm = withCreateStudySetForm;

export const createStudySetFormOpts = formOptions({
    defaultValues: createStudySetDefaultValues
})

export default function useCreateStudySetForm() {
    const { mutate } = useCreateStudySet();
    return useAppForm({
        defaultValues: createStudySetDefaultValues,
        onSubmit: ({ value }) => {
            const studySet: StudySetDto = {
                ...value,
            }
            mutate(studySet);
        }
    })
}