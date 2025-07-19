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
    flashcards: [{ id: 0, studySetId: 0, front: '', back: '', strength: 0 }],
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
                name: value.name,
                createdAt: new Date().toISOString(),
                flashcards: value.flashcards.map(flashcard => ({
                    ...flashcard,
                    studySetId: 0 // Will be set by server after creation
                }))
            }
            mutate(studySet);
        }
    })
}