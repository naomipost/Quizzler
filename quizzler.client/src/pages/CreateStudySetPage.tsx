import { Button, Stack, TextField, Typography } from "@mui/material";
import useCreateStudySetForm from "../hooks/useCreateStudySetForm";
import { useNavigate } from "react-router";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

export default function CreateStudySetPage() {
    const form = useCreateStudySetForm();
    const navigate = useNavigate();
    const { t } = useTranslation();
    return (
        <Stack display="flex" alignItems={"flex-start"} justifyContent="flex-start" width="100%">
            <Typography variant="h6" component="h1" gutterBottom>
                {t("create_a_set")}
            </Typography>
            <Stack gap="1rem">
                <form.Field name="name"
                    children={(field) =>
                        <TextField
                            label={t("study_set_name")}
                            fullWidth
                            value={field.state.value}
                            onChange={e => field.handleChange(e.target.value)}
                            onBlur={field.handleBlur}
                            error={!field.state.meta.isValid}
                            helperText={field.state.meta.errors.join(", ")}
                        />}
                />
                <form.Field name="flashcards">
                    {(field) => {
                        return (
                            <>
                                {field.state.value.map((_, i) => (
                                    <Stack key={i} direction="row" gap="1rem">
                                        <form.Field name={`flashcards[${i}].front`}
                                            children={(field) => <TextField
                                                label={t("front")}
                                                fullWidth
                                                value={field.state.value}
                                                onChange={e => field.handleChange(e.target.value)}
                                                onBlur={field.handleBlur}
                                                error={!field.state.meta.isValid}
                                                helperText={field.state.meta.errors.join(", ")}
                                            />} />
                                        <form.Field name={`flashcards[${i}].back`}
                                            children={(field) => <TextField
                                                label={t("back")}
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
                                    {t("add_flashcard")}
                                </Button>
                            </>
                        )
                    }}
                </form.Field>
                <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                    children={([canSubmit, isSubmitting]) => {
                        return (
                            <Button
                                variant="contained"
                                disabled={!canSubmit || isSubmitting}
                                onClick={() => {
                                    navigate("/");
                                    form.handleSubmit();
                                    return;
                                }}
                            >
                                {t("create")}
                            </Button>
                        )
                    }}
                />
            </Stack>
        </Stack>
    )
}