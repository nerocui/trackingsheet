import { TextField, Button, Box, Stack, Paper, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { useCallback } from 'react';
import { useAuth } from '../router/private-route';
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import Link from '@mui/material/Link';

interface IFormInput {
	email: string,
	password: string,
}

export const SigninPage = () => {
	const { control, handleSubmit } = useForm<IFormInput>();
	const { signin } = useAuth();
	const navigate = useNavigate();

	const onSignedin = useCallback(() => {
		navigate('/');
	}, [navigate]);

	const onSubmit: SubmitHandler<IFormInput> = useCallback(({email, password}) => {
		if (!!email && email !== '' && !!password && password !== '') {
			signin(email, password, onSignedin);
		}
	}, [signin]);

	return (
		<Container
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100vh'
			}}>
			<Box
				style={{
					maxWidth: '40rem',
					minWidth: '20rem'
				}}>
				<Paper
					elevation={3}
					style={{
						padding: '2rem',
						borderRadius: '4px',
					}}>
					<form
						onSubmit={handleSubmit(onSubmit)}>
						<Stack spacing={2}>
							<Typography
								variant='h6'
								component='div'
							>
								Sign In
							</Typography>
							<Controller
								name='email'
								control={control}
								defaultValue=''
								render={({ field }) => <TextField
									label='email'
									variant="outlined"
									value={field.value}
									onChange={field.onChange}/>
								}
							/>
							<Controller
								name='password'
								control={control}
								defaultValue=''
								render={({ field }) => <TextField
									label='password'
									type='password'
									variant="outlined"
									value={field.value}
									onChange={field.onChange}/>
								}
							/>
							<Button type='submit' variant="contained">Login</Button>
							<Link
								component="button"
								variant="body2"
								onClick={() => {
									navigate('/signup');
								}}
							>
								Sign Up
							</Link>
						</Stack>
					</form>
				</Paper>    
			</Box>
		</Container>
	);
};
