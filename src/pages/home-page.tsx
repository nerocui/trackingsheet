import Typography from "@mui/material/Typography";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import { TrackableList } from "../components/trackable-list";
import { useCallback, useState } from "react";
import { Box } from "@mui/system";
import { AddNewDialog } from "../components/add-new-dialog";
import { addTrackable } from "../hooks/useFirebase";
import { useAuth } from "../router/private-route";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import { AccountDialog } from "../components/account-dialog";
import IconButton from "@mui/material/IconButton";
import AccountIcon from "@mui/icons-material/AccountCircle";

export const HomePage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [addNewDialogOpen, setAddNewDialogOpen] = useState(false);
  const [accountDialogOpen, setAccountDialogOpen] = useState(false);
  const handleAddNewDialogClose = useCallback(() => {
    setAddNewDialogOpen(false);
  }, [setAddNewDialogOpen]);
  const handleAccountDialogClose = useCallback(() => {
    setAccountDialogOpen(false);
  }, [setAccountDialogOpen]);

  const onAddItem = useCallback(async (url: string) => {
    await addTrackable(url);
    setAddNewDialogOpen(false);
  }, [addTrackable]);

  const onChangePassword = useCallback((password: string) => {
    auth.changePassword(password, handleAccountDialogClose);
  }, [auth, handleAccountDialogClose]);

  const onLogout = useCallback(() => {
    auth.signout(() => navigate('/signin'));
  }, [auth, navigate]);

  return (
    <Box>
      <AddNewDialog
        open={addNewDialogOpen}
        onAdd={onAddItem}
        handleClose={handleAddNewDialogClose}
      />
      <AccountDialog
        open={accountDialogOpen}
        onChangePassword={onChangePassword}
        onLogout={onLogout}
        handleClose={handleAccountDialogClose}
      />
      <Stack>
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Tracking Sheets
            </Typography>
            <IconButton
              color='inherit'
              aria-label='account'
              onClick={() => setAccountDialogOpen(true)}>
              <AccountIcon/>
            </IconButton>
          </Toolbar>
        </AppBar>
        <TrackableList/>
        <Fab
          color="primary"
          aria-label="add"
          style={{
            position: 'absolute',
            bottom: '2rem',
            right: '2rem'
          }}
          onClick={() => setAddNewDialogOpen(true)}
        >
          <AddIcon/>
        </Fab>
      </Stack>
    </Box>
  );
};
