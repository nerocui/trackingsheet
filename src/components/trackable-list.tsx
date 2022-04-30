import { useCallback, useEffect, useState } from "react";
import { deleteItem, fetchTrackables, startTracking, stopTracking, Trackable } from "../hooks/useFirebase";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { IconButton } from "@mui/material";
import TrashIcon from "@mui/icons-material/Delete";
import { DeleteDialog } from "./delete-dialog";

const TrackableList = () => {
	const [trackables, setTrackables] = useState<Trackable[] | null>(null);
  const getTrackables = useCallback(async () => {
    const items = await fetchTrackables();
    setTrackables(items);
  }, [setTrackables]);

	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [deleteItemId, setDeleteItemId] = useState<string|null>(null);

	const handleDeleteDialogClose = useCallback(() => {
		setDeleteDialogOpen(false);
	}, [setDeleteDialogOpen]);

	const onDeleteTrackables = useCallback(async () => {
		if (!!deleteItemId) {
			await deleteItem(deleteItemId, getTrackables);
			setDeleteItemId(null);
			setDeleteDialogOpen(false);
		}
	}, [deleteItemId, deleteItem, setDeleteItemId, setDeleteDialogOpen]);

	const onStartingDeleteTrackable = useCallback((id: string) => {
		setDeleteItemId(id);
		setDeleteDialogOpen(true);
	}, [setDeleteItemId, setDeleteDialogOpen])

  useEffect(() => {
    if (!trackables) {
      getTrackables();
    }
  }, [getTrackables]);
	return (
		<Grid
				container
				spacing={2}
				justifyContent="center"
				style={{ marginTop: '1rem' }}	
			>
				<DeleteDialog
					open={deleteDialogOpen}
					handleClose={handleDeleteDialogClose}
					onDelete={onDeleteTrackables}
				/>
        {trackables &&
          trackables.map((item) => {
            return (
              <Card style={{ width: "20rem" }} key={item.id}>
                <CardMedia
                  component="img"
                  height="140"
                  image={item.thumbnailUrl}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.name}
                  </Typography>
                  <Typography
										variant="body2"
										color="text.secondary"
									>
                    {item.description}
                  </Typography>
                  <CardActions>
										{
											item.tracking ?
											<Button
												onClick={() => stopTracking(item.id, getTrackables)}
											>
												Stop Tracking
											</Button>
											:
											<Button
												onClick={() => startTracking(item.id, getTrackables)}
											>
												Start Tracking
											</Button>
										}
                    <Button
											onClick={() => window.open(item.url)}
										>
											View
										</Button>
										<IconButton
											color='error'
											aria-label='delete'
											onClick={() => onStartingDeleteTrackable(item.id)}
										>
											<TrashIcon/>
										</IconButton>
                  </CardActions>
                </CardContent>
              </Card>
            );
          })}
      </Grid>
	);
};

export { TrackableList };
