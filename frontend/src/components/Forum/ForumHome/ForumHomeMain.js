import {
  Box,
  Button,
  Grid,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import {
  fetchForumPosts,
  fetchForumTopics,
} from "../../../redux/reducers/forumSlice";
import { useDispatch, useSelector } from "react-redux";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ForumHomeDialog from "./ForumHomeDialog";
// import ForumIndexSportLight from "./ForumIndexSportLight";
import ForumHomeTopic from "./ForumHomeTopic";
import { Link } from "react-router-dom";

export default function ForumHomeMain() {
  const { userAuth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const {
    forumTopics,
    fetchForumTopicsStatus,
    // forumPosts,
    fetchForumPostsStatus,
  } = useSelector((state) => state.forum);

  useEffect(() => {
    if (fetchForumTopicsStatus === "idle" || undefined) {
      dispatch(fetchForumTopics());
    }
    if (fetchForumPostsStatus === "idle" || undefined) {
      dispatch(fetchForumPosts());
    }
  }, [dispatch, fetchForumTopicsStatus, fetchForumPostsStatus]);
  // console.log("forumPosts", forumPosts);
  // console.log("forumTopics", forumTopics);
  return (
    <div>
      <Box sx={{ p: 1, width: "100%", backgroundColor: "grey" }}>
        <Box
          sx={{
            textAlign: "center",
            fontWeight: 400,
            mt: 2,
            mb: 1,
          }}
        >
          <Typography
            variant="h5"
            color="text.primary"
            component={Link}
            to={`/`}
            sx={{
              textDecorationLine: "none",
              "&: hover": { color: "primary.main" },
            }}
          >
            UWCSSA
          </Typography>
          <Typography
            variant="h5"
            color="text.primary"
            component={Link}
            to={`/forum`}
            sx={{
              textDecorationLine: "none",
              "&: hover": { color: "primary.main" },
            }}
          >
            论坛
          </Typography>
        </Box>
        {/* <Divider /> */}
        {/* forum type link */}
        {Object.keys(forumTopics).length === 0 ? (
          <Skeleton
            sx={{ mt: 2 }}
            variant="text"
            animation="wave"
            width={1080}
            height={28}
          />
        ) : (
          <Paper elevation={0} sx={{ mt: 2 }}>
            <Grid
              container
              spacing={0}
              sx={{ justifyContent: "space-between" }}
            >
              {forumTopics.map((forumTopic) => {
                return (
                  <div key={forumTopic.id}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2">
                        <Button
                          variant="text"
                          color="primary"
                          component={Link}
                          to={`/forum/${forumTopic.id}`}
                        >
                          {forumTopic.name}
                          <ArrowForwardIcon />
                        </Button>
                      </Typography>
                    </Grid>
                  </div>
                );
              })}
            </Grid>
          </Paper>
        )}
        {/* <ForumIndexSportLight /> */}
        {Object.keys(forumTopics).length === 0 ? (
          <Skeleton
            sx={{ mt: 2 }}
            variant="text"
            animation="wave"
            width={1080}
            height={28}
          />
        ) : (
          <Box>
            {userAuth.isAuthenticated && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  pr: 2,
                  mt: 3,
                }}
              >
                <ForumHomeDialog forumTopics={forumTopics} />
              </Box>
            )}
          </Box>
        )}
        <ForumHomeTopic forumTopics={forumTopics} />
      </Box>
    </div>
  );
}