import { Button, Link, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from 'react-router';
import useLoginForm from "../hooks/useLoginForm";

export default function LoginPage() {
    const navigate = useNavigate();
    const form = useLoginForm();
    return (
        <Stack gap={1}>
            <Typography>
                Login
            </Typography>
            <form.Field name="username"
                validators={{ onBlur: ({value}) => value === '' ? "Required" : undefined}}
                children={(field) => {
                    return (
                        <TextField 
                            label={field.name} 
                            error={!field.state.meta.isValid}
                            helperText={field.state.meta.errors.join()}
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={() => field.handleBlur()}
                        />
                    )
                }}
            />
            <form.Field name="password"
                validators={{ onBlur: ({value}) => value === '' ? "Required" : undefined}}
                children={(field) => {
                    return (
                        <TextField 
                            label={field.name} 
                            error={!field.state.meta.isValid}
                            helperText={field.state.meta.errors.join()}
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={() => field.handleBlur()}
                        />
                    )
                }}
            />
            <Typography variant="body2">
                Don't have an account? {' '}
                <Link
                    component="button"
                    onClick={() => navigate('/signup')}
                    underline="hover"
                >
                    Sign up
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
                        Log in
                    </Button>)
                } />
        </Stack>
    )
}