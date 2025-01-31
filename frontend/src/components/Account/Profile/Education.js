import {
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import Create from "./Education/Create";
import Edit from "./Education/Edit";
import EditIcon from "@mui/icons-material/Edit";
import { makeStyles } from "@mui/styles";
import { usePermit } from "../../../Hooks/usePermit";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "960px",
    marginBlock: "1rem",
  },
  card: {
    paddingInline: "1rem",
    paddingTop: "1rem",
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
  },
  cardContent: {
    marginInline: "1rem",
  },
  school: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default function Education({ user, userAuth, ownerID }) {
  const classes = useStyles();
  const [editOpen, setEditOpen] = useState(false);
  const [education, setEducation] = useState({
    degree: "",
    description: "",
    endDate: "",
    fieldOfStudy: "",
    grade: "",
    id: "",
    school: "",
    startDate: "",
  });
  const isPermit = usePermit(ownerID, "admin");
  const handleEditClickOpen = (education) => {
    setEditOpen(true);
    setEducation(education);
  };
  const handleEditClose = () => {
    setEditOpen(false);
  };

  const [createOpen, setCreateOpen] = useState(false);
  const handleCreateClickOpen = () => {
    setCreateOpen(true);
  };
  const handleCreateClose = () => {
    setCreateOpen(false);
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <Box className={classes.title}>
          <Typography variant="h6" sx={{ m: 1, fontWeight: "600" }}>
            教育经历
          </Typography>
          {isPermit && (
            <IconButton
              aria-label="create"
              onClick={handleCreateClickOpen}
              size="large"
              color="info"
            >
              <AddIcon />
            </IconButton>
          )}
        </Box>
        {isPermit && (
          <Create
            createOpen={createOpen}
            handleCreateClose={handleCreateClose}
            username={user.username}
          />
        )}
        {user.userEducations.items.map((education) => {
          const {
            degree,
            description,
            endDate,
            fieldOfStudy,
            grade,
            id,
            school,
            startDate,
          } = education;
          return (
            <div key={id}>
              <CardContent>
                <div className={classes.school}>
                  <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
                    {school}
                  </Typography>
                  {isPermit && (
                    <IconButton
                      aria-label="edit"
                      color="info"
                      size="small"
                      onClick={(e) => handleEditClickOpen(education)}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                </div>
                <Typography variant="subtitle2" sx={{}}>
                  {degree} {" - "} {fieldOfStudy} {" - "} {grade}
                </Typography>
                <Typography
                  sx={{ mb: 1.5 }}
                  variant="subtitle2"
                  color="text.secondary"
                >
                  {startDate && startDate.slice(0, 7)} -{" "}
                  {endDate && endDate.slice(0, 7)}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mb: 2 }}
                  component="span"
                  style={{ whiteSpace: "pre" }}
                >
                  {description}
                </Typography>
                <Divider />
              </CardContent>
            </div>
          );
        })}
      </Card>
      <Edit
        editOpen={editOpen}
        education={education}
        handleEditClose={handleEditClose}
      />
    </div>
  );
}
