import { Button, Link, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from 'react-router';
import useSignupForm from "../hooks/useSignupForm";
import { useTranslation } from "react-i18next";

export default function SignupPage() {
    const navigate = useNavigate();
    const form = useSignupForm();
    const { t } = useTranslation();
    return (
        <Stack gap={1}>
            <Typography>
                {t("sign_up")}
            </Typography>
            <form.Field name="username"
                validators={{ onBlur: ({value}) => value === '' ? t("required") : undefined}}
                children={(field) => {
                    return (
                        <TextField 
                            label={t("username")} 
                            error={!field.state.meta.isValid}
                            helperText={field.state.meta.errors.join()}
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={() => field.handleBlur()}
                        />
                    )
                }}
            />
            <form.Field name="email"
                validators={{ onBlur: ({value}) => value === '' ? t("required") : undefined}}
                children={(field) => {
                    return (
                        <TextField 
                            label={t("email")} 
                            error={!field.state.meta.isValid}
                            helperText={field.state.meta.errors.join()}
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={() => field.handleBlur()}
                        />
                    )
                }}
            />
            <form.Field name="password"
                validators={{ onBlur: ({value}) => value === '' ? t("required") : undefined}}
                children={(field) => {
                    return (
                        <TextField 
                            label={t("password")} 
                            error={!field.state.meta.isValid}
                            helperText={field.state.meta.errors.join()}
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={() => field.handleBlur()}
                        />
                    )
                }}
            />
            <Typography variant="body2">
                {t("already_have_an_account")} {' '}
                <Link
                    component="button"
                    onClick={() => navigate('/login')}
                    underline="hover"
                >
                    {t("log_in")}
                </Link>
            </Typography>
            <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                    <Button aria-disabled={!canSubmit} loading={isSubmitting} onClick={async () => {
                        const validationErrors = await form.validateAllFields("blur");
                        if(validationErrors.length === 0) {
                            await form.handleSubmit();
                            navigate("/");
                            form.reset();
                        }
                    }}
                    variant="contained">
                        {t("sign_up")}
                    </Button>)
                } />
        </Stack>
    )
}