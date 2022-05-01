import { Stack, TextField, Toolbar } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type AddNewDialogProps = {
	open: boolean,
	onAdd: (url: string) => void,
	handleClose: () => void,
};

interface IAddNewFormInput {
	url: string,
}

const AddNewDialog = ({open, onAdd, handleClose} : AddNewDialogProps) => {
	const { control, handleSubmit } = useForm<IAddNewFormInput>();

	const onSubmit: SubmitHandler<IAddNewFormInput> = React.useCallback(({ url }) => {
		if (!!url && url !== '') {
			onAdd(url);
		}
	}, [onAdd])

	return (
		<Dialog
			fullScreen
			open={open}
			onClose={handleClose}
			TransitionComponent={Transition}
		>
			<AppBar position="relative">
				<Toolbar>
					<IconButton
						edge='start'
						color='inherit'
						onClick={handleClose}
						aria-label='close'
					>
						<CloseIcon/>
					</IconButton>
					<Typography
						sx={{ ml: 2, flex: 1 }}
						variant='h6'
						component='div'
					>
						Add New Item
					</Typography>
				</Toolbar>
			</AppBar>
			<Box
				style={{
					height: '100%',
					padding: '2rem',
					alignItems: 'stretch',
					alignContent: 'stretch',
					justifyContent: 'center'
				}}	
			>
				<Box
					style={{
						alignSelf: 'center',
						width: '100%',
					}}
				>
					<form
						onSubmit={handleSubmit(onSubmit)}
					>
						<Stack
							spacing={2}
						>
							<Typography
								variant='body1'
								component='div'
								aria-label='add-new-description'
							>
								New items added will be picked up by the service in a few minutes.
							</Typography>
							<Controller
								name='url'
								control={control}
								defaultValue=''
								render={({field}) => <TextField
									label='URL'
									variant='outlined'
									value={field.value}
									onChange={field.onChange}/>
								}
							/>
							<Button
								type='submit'
								variant='contained'
							>
								Add
							</Button>
						</Stack>
					</form>
				</Box>
			</Box>
		</Dialog>
	)
}

export { AddNewDialog };

