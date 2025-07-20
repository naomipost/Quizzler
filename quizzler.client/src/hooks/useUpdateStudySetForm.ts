import { Button, TextField } from "@mui/material";
import { createFormHook, createFormHookContexts, formOptions } from "@tanstack/react-form";
import useUpdateStudySet, { type UpdateStudySetDto } from "./useUpdateStudySet";

export const { fieldContext, formContext, useFieldContext } = createFormHookContexts();

const { useAppForm, withForm: withUpdateStudySetForm } = createFormHook({
    fieldComponents: {
        TextField,
    },
    formComponents: {
        SubmitButton: Button
    },
    fieldContext,
    formContext
})

export const updateStudySetDefaultValues: UpdateStudySetDto = {
    name: '',
    flashcards: [{ id: 0, studySetId: 0, front: '', back: '', strength: 0 }],
}

export const updateStudySetWithForm = withUpdateStudySetForm;

export const updateStudySetFormOpts = formOptions({
    defaultValues: updateStudySetDefaultValues
})

export default function useUpdateStudySetForm(studySet: UpdateStudySetDto | undefined) {
    const { mutate } = useUpdateStudySet();
    return useAppForm({
        defaultValues: studySet ? {
            id: studySet.id,
            name: studySet.name,
            flashcards: studySet.flashcards
        } : updateStudySetDefaultValues,
        onSubmit: ({ value }) => {
            const updatedStudySet: UpdateStudySetDto = {
                id: studySet?.id ?? 0,
                name: value.name,
                flashcards: value.flashcards.map((flashcard) => ({
                    ...flashcard,
                    studySetId: studySet?.id ?? 0
                }))
            };
            mutate(updatedStudySet);
        }
    });
}