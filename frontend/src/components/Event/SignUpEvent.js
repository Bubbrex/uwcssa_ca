import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";

import GroupIcon from "@mui/icons-material/Group";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "block",
    marginTop: "3rem",
    height: "85vh",
  },
  title: {
    minWidth: "40%",
    maxWidth: "100%",
    paddingTop: "1rem",
    paddingBottom: "1rem",
    textAlign: "center",
    [theme.breakpoints.up("sm")]: {
      marginBottom: "5rem",
    },
  },
  boxChoice: {
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function EventSignUp() {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Container size="lg">
        <Box>
          <Breadcrumbs aria-label="breadcrumb">
            <span style={{ cursor: "not-allowed" }}>
              <Button color="inherit" component={Link} to="/">
                主页
              </Button>
            </span>
            <span style={{ cursor: "not-allowed" }}>
              <Button color="inherit" component={Link} to="/event">
                活动
              </Button>
            </span>
            <Typography>{""}</Typography>
          </Breadcrumbs>
        </Box>
        <Box className={classes.title}>
          <Typography variant="h4">活动报名</Typography>
        </Box>

        <Grid container spacing={4} className={classes.boxChoice}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper>
              <IconButton
                style={{
                  margin: "0 auto",
                  display: "flex",
                  flexDirection: "column",
                  height: "200px",
                  borderRadius: "0",
                }}
                size="large"
                component={Link}
                to="/event/eventSignUp/individual" //{`/event/${event.id}/eventSignUp/individual`}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <PersonIcon />
                </Avatar>
                <Typography gutterBottom variant="h5">
                  个人
                </Typography>
              </IconButton>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper>
              <IconButton
                style={{
                  margin: "0 auto",
                  display: "flex",
                  flexDirection: "column",
                  height: "200px",
                  borderRadius: "0",
                }}
                size="large"
                component={Link}
                to="/event/eventSignUp/group"
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <GroupIcon />
                </Avatar>
                <Typography gutterBottom variant="h5">
                  团体
                </Typography>
              </IconButton>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
