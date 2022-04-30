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

export type AccountDialogProps = {
  open: boolean,
  onChangePassword: (password: string) => void,
  onLogout: () => void,
  handleClose: () => void,
}

interface IAccountSettingsFormInput {
	newPassword: string,
  confirmNewPassword: string,
}

const AccountDialog = ({ open, onChangePassword, handleClose, onLogout }: AccountDialogProps) => {
  const { control, handleSubmit } = useForm<IAccountSettingsFormInput>();
  const onSubmit: SubmitHandler<IAccountSettingsFormInput> = React.useCallback(({ newPassword, confirmNewPassword }) => {
    if (
      !!newPassword &&
      newPassword !== '' &&
      !!confirmNewPassword &&
      newPassword === confirmNewPassword
    ) {
      onChangePassword(newPassword);
    }
  }, []);
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
						Account Settings
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
            <Stack spacing={2}>
              <Typography
                sx={{ ml: 2, flex: 1 }}
                variant='h6'
                component='div'
              >
                Change Password
              </Typography>
              <Controller
                name='newPassword'
                control={control}
                defaultValue=''
                render={({field}) => <TextField
                  label='new password'
                  type='password'
                  variant='outlined'
                  value={field.value}
                  onChange={field.onChange}
                />}
              />
              <Controller
                name='confirmNewPassword'
                control={control}
                defaultValue=''
                render={({field}) => <TextField
                  label='confirm new password'
                  type='password'
                  variant='outlined'
                  value={field.value}
                  onChange={field.onChange}
                />}
              />
              <Button type='submit' variant='contained'>
                Submit
              </Button>
              <Button onClick={onLogout}>
                Logout
              </Button>
            </Stack>
          </form>
        </Box>
      </Box>
    </Dialog>
  );
};

export { AccountDialog };
