import Button from "@mui/material/Button";
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

export const HomePage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogClose = useCallback(() => {
    setDialogOpen(false);
  }, [setDialogOpen]);

  const onAddItem = useCallback(async (url: string) => {
    await addTrackable(url);
    setDialogOpen(false);
  }, [addTrackable]);

  return (
    <Box>
      <AddNewDialog
        open={dialogOpen}
        onAdd={onAddItem}
        handleClose={handleDialogClose}
      />
      <Stack>
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Tracking Sheets
            </Typography>
            <Button
              color="inherit"
              onClick={() => auth.signout(() => navigate('/signin'))}
            >
              Logout
            </Button>
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
          onClick={() => setDialogOpen(true)}
        >
          <AddIcon/>
        </Fab>
      </Stack>
    </Box>
  );
};
