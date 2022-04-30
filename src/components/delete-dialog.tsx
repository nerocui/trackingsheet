import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export type DeleteDialogProps = {
  open: boolean,
  handleClose: () => void,
  onDelete: () => void,
}

const DeleteDialog = ({ open, handleClose, onDelete }: DeleteDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle id="alert-dialog-title">
        Delete this item?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Once item is deleted, it's no longer tracked. You can add it back later with the same URL.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant='outlined'
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          variant='outlined'
          color='error'
          onClick={onDelete} autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export { DeleteDialog };
