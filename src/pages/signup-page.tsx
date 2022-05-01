import { TextField, Button, Box, Stack, Paper, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { useCallback } from "react";
import { useAuth } from "../router/private-route";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Link from '@mui/material/Link';

interface IFormInput {
	email: string;
	password: string;
	confirmPassword: string;
}

export const SignupPage = () => {
	const { control, handleSubmit } = useForm<IFormInput>();
	const { signup } = useAuth();
	const navigate = useNavigate();

	const onSignedin = useCallback(() => {
		navigate("/trackingsheet");
	}, [navigate]);

	const onSubmit: SubmitHandler<IFormInput> = useCallback(
		async ({ email, password, confirmPassword }) => {
			if (
				!!email && 
				email !== "" && 
				!!password && 
				password !== "" && 
				!!confirmPassword && 
				confirmPassword === password) {
				signup(email, password, onSignedin);
			}
		},
		[signup]
	);

	return (
		<Container
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				height: "100vh",
			}}
		>
			<Box
				style={{
					maxWidth: "40rem",
					minWidth: "20rem",
				}}
			>
				<Paper
					elevation={3}
					style={{
						padding: "2rem",
						borderRadius: "4px",
					}}
				>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Stack spacing={2}>
							<Typography
								variant='h6'
								component='div'
							>
								Sign Up
							</Typography>
							<Controller
								name="email"
								control={control}
								defaultValue=""
								render={({ field }) => (
									<TextField
										label="email"
										variant="outlined"
										value={field.value}
										onChange={field.onChange}
									/>
								)}
							/>
							<Controller
								name="password"
								control={control}
								defaultValue=""
								render={({ field }) => (
									<TextField
										label="password"
										type="password"
										variant="outlined"
										value={field.value}
										onChange={field.onChange}
									/>
								)}
							/>
							<Controller
								name="confirmPassword"
								control={control}
								defaultValue=""
								render={({ field }) => (
									<TextField
										label="confirm password"
										type="password"
										variant="outlined"
										value={field.value}
										onChange={field.onChange}
									/>
								)}
							/>
							<Button type="submit" variant="contained">
								Sign Up
							</Button>
							<Link
								component="button"
								variant="body2"
								onClick={() => {
									navigate('/trackingsheet/signin');
								}}
							>
								Sign In
							</Link>
						</Stack>
					</form>
				</Paper>
			</Box>
		</Container>
	);
};
