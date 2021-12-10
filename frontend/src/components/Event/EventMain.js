import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getImage, selectImageById } from "../../redux/reducers/imageSlice";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
// import SignUpRequest from "../Auth/SignUpRequireDialog";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import { useSelector } from "react-redux";

// import LinesEllipsis from "react-lines-ellipsis";

const useStyles = makeStyles((theme) => ({
  actionArea: {
    maxWidth: 300,
    minWidth: 256,
    borderRadius: 16,
    transition: "0.2s",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  cardDetails: {
    maxWidth: 300,
    minWidth: 256,
    borderRadius: 16,
    boxShadow: "none",
    "&:hover": {
      boxShadow: "0 6px 12px 0 #757ce8",
    },
  },
  cardMedia: {
    display: "block",
    marginLeft: "auto",
    marginRight: " auto",
    width: "50%",
  },

  s3image: {
    width: "162px",
    height: "162px",
    borderRadius: "8px",
    objectFit: "cover",
    [theme.breakpoints.down("sm")]: {
      width: "112px",
      height: "112px",
      marginTop: "2.5rem",
    },
  },
  root: {
    maxWidth: "110px",
    minWidth: "100px",
    padding: 0,
  },
  tag: {
    display: "inline-block",
    backgroundColor: "#3f50b5",
    color: "#fff",
    marginBottom: "0.5rem",
    borderRadius: "0 3px 3px 0",
    background: "#FFFFFF",
    // borderLeft: `3px solid #f44336`,
    fontWeight: "bold",
    padding: "8px 16px",
    // margin: spacing(0.5),
  },
  locationIcon: {
    marginRight: 4,
    fontSize: 18,
  },
}));

const EventTag = ({ label }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box className={classes.tag}>{label}</Box>
    </div>
  );
};

export default function EventMain({ event }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [imageURL, setImageURL] = useState(null);

  // console.log("event", event);
  const {
    id,
    content,
    title,
    posterImgS3Key,
    location,
    startDate,
    endDate,
    topic,
  } = event;

  const imgKeys = useSelector((state) =>
    selectImageById(state, posterImgS3Key)
  );

  useEffect(() => {
    const getImages = async () => {
      try {
        const response = await dispatch(
          getImage({ url: [posterImgS3Key], id: posterImgS3Key })
        );
        setImageURL(response.payload.imgUrl);
      } catch (error) {
        console.error("error accessing the Image from s3", error);
        setImageURL(null);
      }
    };
    if (posterImgS3Key && imgKeys === undefined) {
      getImages();
    } else if (posterImgS3Key && imgKeys !== undefined) {
      setImageURL(Object.values(imgKeys.images)[0]);
    } else if (posterImgS3Key === "") {
      setImageURL(
        "https://media-exp1.licdn.com/dms/image/C5603AQHwt3NgA8rYHw/profile-displayphoto-shrink_200_200/0/1616353723146?e=1640822400&v=beta&t=wzrF9eUlq7YnsTg-1cpH4LrYXm2oCCOHHHp0ac1hmgM"
      );
    }
  }, [posterImgS3Key, imgKeys, dispatch]);

  // const userInfo = useSelector((state) => state.userAuth);
  //console.log("imageURL,imgKeys", imageURL, imgKeys);
  return (
    <Grid
      item
      xs={2}
      sm={4}
      md={4}
      key={event.title}
      sx={{ marginBottom: "1rem" }}
    >
      <CardActionArea
        className={classes.actionArea}
        component={Link}
        to={`/event/${id}`}
      >
        <Card className={classes.cardDetails}>
          <Box sx={{ position: "relative" }}>
            <CardMedia component="img" height="194" image={imageURL} />
            {startDate > moment().format() && endDate > moment().format() ? (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                }}
              >
                <EventTag label={"ComingSoon"} />
              </Box>
            ) : (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                }}
              >
                <EventTag label={"InProgress"} />
              </Box>
            )}
            <CardContent>
              <Box
                style={{
                  maxHeight: "30px",
                  overflow: "hidden",
                  marginBottom: "1rem",
                }}
              >
                <Typography
                  variant="subtitle1"
                  style={{
                    wordBreak: "break-word",
                    overflow: "hidden",
                  }}
                >
                  <b>{title}</b>
                </Typography>
              </Box>

              {moment(startDate).format("YYYY") ===
              moment(endDate).format("YYYY") ? (
                <Box
                  color={"grey.700"}
                  display={"flex"}
                  alignItems={"center"}
                  mb={1}
                >
                  <CalendarTodayIcon className={classes.locationIcon} />
                  <Typography variant="subtitle2">
                    {startDate.slice(0, 4)}/{startDate.slice(5, 7)}/
                    {startDate.slice(8, 10)} {startDate.slice(11, 16)} -{" "}
                    {endDate.slice(5, 7)}/{endDate.slice(8, 10)}{" "}
                    {endDate.slice(11, 16)}
                  </Typography>
                </Box>
              ) : (
                <Box
                  color={"grey.700"}
                  display={"flex"}
                  alignItems={"center"}
                  mb={1}
                >
                  <CalendarTodayIcon className={classes.locationIcon} />
                  <Typography variant="subtitle2">
                    {startDate.slice(0, 4)}/{startDate.slice(5, 7)}/
                    {startDate.slice(8, 10)} {startDate.slice(11, 16)} -{" "}
                    {endDate.slice(0, 4)}/{endDate.slice(5, 7)}/
                    {endDate.slice(8, 10)} {endDate.slice(11, 16)}
                  </Typography>
                </Box>
              )}

              {location ? (
                <Box
                  sx={{ overflow: "hidden", height: "30px" }}
                  color={"grey.700"}
                  display={"flex"}
                  alignItems={"center"}
                  mb={1}
                >
                  <Grid container wrap="nowrap" sx={{ my: 1, mx: "auto" }}>
                    <LocationOnIcon className={classes.locationIcon} />
                    <Grid item xs zeroMinWidth>
                      <Typography
                        variant="subtitle2"
                        color="textSecondary"
                        noWrap
                      >
                        {location}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              ) : (
                <Box
                  sx={{ overflow: "hidden", height: "30px" }}
                  color={"grey.700"}
                  display={"flex"}
                  alignItems={"center"}
                  mb={1}
                >
                  <Grid container wrap="nowrap" sx={{ my: 1, mx: "auto" }}>
                    <LocationOnIcon className={classes.locationIcon} />
                    <Grid item xs zeroMinWidth>
                      <Typography variant="subtitle2" color="textSecondary">
                        无
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              )}
              <Box
                sx={{
                  overflow: "hidden",
                  height: "30px",
                  marginBottom: "1rem",
                }}
              >
                <Grid container wrap="nowrap" sx={{ my: 1, mx: "auto" }}>
                  <Grid item xs zeroMinWidth>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {content}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              {topic.name ? (
                <Chip label={topic.name} sx={{ color: "#757de8" }} />
              ) : (
                // <Typography
                //   variant="subtitle2"
                //   color="textSecondary"
                //   gutterBottom
                // >
                //   类别： {topic.name}
                // </Typography>
                <Chip label="无" sx={{ color: "#757de8" }} />
              )}

              {/* 
            <Box
              style={{
                height: "40px",
                overflow: "hidden",
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                style={{
                  wordBreak: "break-word",
                  overflow: "hidden",
                }}
              >
                {content}
              </Typography>
            </Box> */}
            </CardContent>
            {/* <CardActions>
          {userInfo.isAuthenticated ? (
            <Button
              size="small"
              component={Link}
              to={`/event/${event.id}/eventSignUp`}
            >
              报名
            </Button>
          ) : (
            <SignUpRequest />
          )}
        </CardActions> */}
          </Box>
        </Card>
      </CardActionArea>
    </Grid>
  );
}
