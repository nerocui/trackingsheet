import { useCallback, useEffect, useState } from "react";
import { fetchTrackables, Trackable } from "../hooks/useFirebase";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const TrackableList = () => {
	const [trackables, setTrackables] = useState<Trackable[] | null>(null);
  const getTrackables = useCallback(async () => {
    const items = await fetchTrackables();
    setTrackables(items);
  }, [setTrackables]);
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
                    <Button>Start Tracking</Button>
                    <Button>View</Button>
                  </CardActions>
                </CardContent>
              </Card>
            );
          })}
      </Grid>
	);
};

export { TrackableList };
