import { useNavigate, useParams } from "react-router";
import { useFetchStudySet } from "../hooks/useFetchStudySet";
import { Button, Stack, TextField, Typography } from "@mui/material";
import useUpdateStudySetForm from "../hooks/useUpdateStudySetForm";
import { IconPlus, IconTrash } from "@tabler/icons-react";

export default function EditStudySet() {
    const { studySetId } = useParams<{ studySetId: string }>();
    const { data: studySet, isLoading: studySetLoading } = useFetchStudySet(studySetId ?? "0");
    const navigate = useNavigate();
    const form = useUpdateStudySetForm(studySet);

    if (studySetLoading) {
        return <Typography>Loading...</Typography>;
    }
    if (!studySet) {
        return <Typography>Study set not found</Typography>;
    }

    return (
        <Stack display="flex" alignItems={"flex-start"} justifyContent="flex-start" width="100%">
            <Typography variant="h6" component="h1" gutterBottom>
                Update Study Set {studySet.name}
            </Typography>
            <Stack gap="1rem" paddingTop="0.5rem">
                <form.Field name="name"
                    children={(field) =>
                        <TextField
                            label="Study Set Name"
                            fullWidth
                            value={field.state.value}
                            onChange={e => field.handleChange(e.target.value)}
                            onBlur={field.handleBlur}
                            error={!field.state.meta.isValid}
                            helperText={field.state.meta.errors.join(", ")}
                        />}
                />
                {<form.Field name="flashcards">
                    {(field) => {
                        return (
                            <>
                                {field.state.value.map((flashcard, i) => (
                                    <Stack key={flashcard.id} direction="row" gap="1rem">
                                        <form.Field name={`flashcards[${i}].front`}
                                            children={(field) => <TextField
                                                label="Front"
                                                fullWidth
                                                value={field.state.value}
                                                onChange={e => field.handleChange(e.target.value)}
                                                onBlur={field.handleBlur}
                                                error={!field.state.meta.isValid}
                                                helperText={field.state.meta.errors.join(", ")}
                                            />} />
                                        <form.Field name={`flashcards[${i}].back`}
                                            children={(field) => <TextField
                                                label="Back"
                                                fullWidth
                                                value={field.state.value}
                                                onChange={e => field.handleChange(e.target.value)}
                                                onBlur={field.handleBlur}
                                                error={!field.state.meta.isValid}
                                                helperText={field.state.meta.errors.join(", ")}
                                            />}
                                        />
                                        <Button variant="outlined"
                                            onClick={() => field.removeValue(i)}
                                            color="error"
                                        >
                                            <IconTrash />
                                        </Button>
                                    </Stack>
                                ))}
                                <Button variant="outlined"
                                    onClick={() => field.pushValue({ id: 0, studySetId: 0, front: '', back: '', strength: 0 })}
                                    startIcon={<IconPlus size={18} />}
                                >
                                    Add flashcard
                                </Button>
                            </>
                        )
                    }}
                </form.Field>}
                <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                    children={([canSubmit, isSubmitting]) => {
                        return (
                            <Button
                                variant="contained"
                                disabled={!canSubmit || isSubmitting}
                                onClick={() => {
                                    navigate("/studysets/" + studySetId);
                                    form.handleSubmit();
                                    return;
                                }}
                            >
                                Update
                            </Button>
                        )
                    }}
                />
            </Stack>
        </Stack>
    );
}