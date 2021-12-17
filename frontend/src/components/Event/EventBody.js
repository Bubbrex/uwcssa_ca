import {
  Alert,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import EventComments from "./EventDetail/Comment/EventComments";
import EventCommentsPost from "./EventDetail/Comment/EventCommentsPost";
import EventIcon from "@mui/icons-material/Event";
import FlagIcon from "@mui/icons-material/Flag";
import ForumIcon from "@mui/icons-material/Forum";
import { Link } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PropTypes from "prop-types";
import Share from "./EventDetail/Share";
import SignUpRequest from "../Auth/SignUpRequireDialog";
import TopicIcon from "@mui/icons-material/Topic";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import { useSelector } from "react-redux";
import SeeMore from "./SeeMore";

const useStyles = makeStyles((theme) => ({
  action: {
    display: "flex",
    justifyContent: "space-around",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "auto",
    },
  },
  join: {
    height: 45,
    margin: 8,
  },
  alert: {
    width: "500px",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
    },
  },
  button: {
    [theme.breakpoints.up("sm")]: {
      width: "150px",
    },
  },
}));
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      {/* 为什么这里要加上typography？？？？ */}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function EventBody({ event }) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const { userAuth } = useSelector((state) => state);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const userInfo = useSelector((state) => state.userAuth);

  const {
    title,
    startDate,
    endDate,
    address,
    content,
    backGroundImgURL,
    posterImgURL,
    qrCodeImgURL,
    topic,
    sponsor,
    eventParticipants,
  } = event;

  return (
    <Box>
      {event.startDate ? (
        <div>
          <Box>
            <div>
              <CardActionArea
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = posterImgURL;
                }}
              >
                <Box
                  sx={{
                    opacity: 1, //如果背景要虚的话下面的主要图片也虚了
                    backgroundImage: `url(${
                      backGroundImgURL
                        ? backGroundImgURL
                        : "https://uwcssabucket53243-master.s3.us-east-2.amazonaws.com/public/no_pic.png"
                    })`,
                    width: "100%",
                    height: "350px",
                    objectFit: "cover",
                  }}
                >
                  <Box
                    component="img"
                    src={
                      posterImgURL
                        ? posterImgURL
                        : "https://uwcssabucket53243-master.s3.us-east-2.amazonaws.com/public/no_pic.png"
                    }
                    maxHeight="100%"
                    maxWidth="100%"
                    sx={{
                      opacity: 1,
                      position: "relative",
                      top: "50%",
                      left: "50%",
                      margin: "auto",
                      transform: `translate(-50%,-50%)`,
                      width: "auto",
                      height: "300px",
                    }}
                  />
                </Box>
              </CardActionArea>
            </div>
            <Box
              sx={{
                display: "flex",
                justifyContent: "left",
                marginBottom: "1rem",
                bgcolor: "#FFFF",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {moment(startDate).format("YYYY") ===
                moment(endDate).format("YYYY") ? (
                  <Typography variant="h6" color="primary" gutterBottom>
                    时间：{startDate.slice(0, 4)}年{startDate.slice(5, 7)}月
                    {startDate.slice(8, 10)}号 {startDate.slice(11, 16)} -{" "}
                    {endDate.slice(5, 7)}月{endDate.slice(8, 10)}号{" "}
                    {endDate.slice(11, 16)}
                  </Typography>
                ) : (
                  <Typography variant="h6" color="primary" gutterBottom>
                    时间：{startDate.slice(0, 4)} 年{startDate.slice(5, 7)}月
                    {startDate.slice(8, 10)}号 {startDate.slice(11, 16)} -{" "}
                    {endDate.slice(0, 4)}年{endDate.slice(5, 7)}月
                    {endDate.slice(8, 10)}号 {endDate.slice(11, 16)}
                  </Typography>
                )}
                <Typography component="div" variant="h5" gutterBottom>
                  <b>{title}</b>
                </Typography>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  component="div"
                  gutterBottom
                >
                  {address.description}
                </Typography>
              </Box>
            </Box>
          </Box>
          <div sx={{ width: "100%" }}>
            <Container
              size="md"
              sx={{ display: "flex", flexWrap: "wrap-reverse" }}
            >
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              >
                <Tabs value={value} onChange={handleChange}>
                  <Tab
                    icon={<EventIcon />}
                    label="活动详情"
                    {...a11yProps(0)}
                  />
                  <Tab
                    icon={<ForumIcon />}
                    label="活动讨论"
                    {...a11yProps(1)}
                  />
                </Tabs>
              </Box>
              {/* 这里有红字，需要改一下 */}
              <Box className={classes.action}>
                <Stack direction="row" spacing={2}>
                  {endDate > moment().format() ? (
                    <div>
                      {userInfo.isAuthenticated ? (
                        <div>
                          {event.eventParticipants.items.some(
                            (item) => item.userID === userAuth.user.username
                          ) === false ? (
                            <Box className={classes.button}>
                              <Button
                                size="large"
                                // variant="outlined"
                                fullWidth
                                sx={{
                                  background:
                                    "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                                  "& > *": {
                                    textTransform: "none !important",
                                  },
                                  border: 0,
                                  boxShadow:
                                    "0 3px 5px 2px rgba(33, 203, 243, .3)",
                                  color: "white",
                                  padding: "0 30px",
                                  borderRadius: "20rem",
                                }}
                                className={classes.join}
                                variant={"contained"}
                                color={"primary"}
                                disableRipple
                                component={Link}
                                to={`/event/${event.id}/eventSignUp`}
                                startIcon={<AppRegistrationIcon />}
                              >
                                报名
                              </Button>
                            </Box>
                          ) : (
                            <Box className={classes.alert}>
                              <Alert severity="success">
                                你已经报过名啦~🥳
                              </Alert>
                            </Box>
                          )}
                        </div>
                      ) : (
                        <SignUpRequest />
                      )}
                    </div>
                  ) : (
                    <Box className={classes.alert}>
                      <Alert severity="info">活动结束啦~🥳</Alert>
                    </Box>
                  )}
                  <Share label={title} />
                </Stack>
              </Box>
            </Container>

            <Box sx={{ width: "100%", bgcolor: "#F9F9F9" }}>
              <TabPanel value={value} index={0}>
                {/* 这里问题挺多的，为什么在tabpanel里面不能加box？？ */}
                <Container size="md">
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid
                      container
                      spacing={{ xs: 2, md: 3 }}
                      columns={{ xs: 6, sm: 8, md: 12 }}
                    >
                      <Grid item xs={6} sm={8} md={8}>
                        <Card>
                          <CardContent>
                            <Typography
                              variant="h5"
                              component="div"
                              gutterBottom
                            >
                              <b>详细信息</b>
                            </Typography>
                            {sponsor ? (
                              <Typography variant="body2" gutterBottom>
                                <FlagIcon
                                  color="action"
                                  sx={{ float: "left", marginRight: "10px" }}
                                />
                                主办方/赞助方： {sponsor}
                              </Typography>
                            ) : null}
                            {address.description ? (
                              <Typography variant="body2" gutterBottom>
                                <LocationOnIcon
                                  color="action"
                                  sx={{ float: "left", marginRight: "10px" }}
                                />
                                {address.description}
                              </Typography>
                            ) : null}
                            {topic.name ? (
                              <Typography variant="body2" gutterBottom>
                                <TopicIcon
                                  color="action"
                                  sx={{
                                    float: "left",
                                    marginRight: "10px",
                                  }}
                                />
                                {topic.name}
                              </Typography>
                            ) : null}
                            {endDate > moment().format() ? (
                              <Typography variant="body2" gutterBottom>
                                <AccessTimeIcon
                                  color="action"
                                  sx={{ float: "left", marginRight: "10px" }}
                                />
                                ComingSoon
                              </Typography>
                            ) : (
                              <Typography variant="body2" gutterBottom>
                                <AccessTimeIcon
                                  color="action"
                                  sx={{ float: "left", marginRight: "10px" }}
                                />
                                正在进行中
                              </Typography>
                            )}
                            <Box sx={{ my: 3 }}>
                              {/* <Typography
                                variant="body1"
                                // sx={{ marginTop: "2rem" }}
                                component="span"
                                style={{
                                  whiteSpace: "pre-wrap",
                                  wordBreak: "break-word",
                                }}
                                gutterBottom
                              >
                                {content}
                              </Typography> */}
                              <SeeMore content={content} />
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid item xs={6} sm={8} md={4}>
                        <Card>
                          <CardContent>
                            <Typography
                              variant="h5"
                              component="div"
                              gutterBottom
                            >
                              <b>参与者</b>
                            </Typography>
                            {eventParticipants.items.length === 0 ? (
                              <Typography
                                variant="h6"
                                sx={{ textAlign: "center" }}
                                gutterBottom
                              >
                                已有0人报名
                              </Typography>
                            ) : (
                              <Typography
                                variant="h6"
                                sx={{ textAlign: "center" }}
                                gutterBottom
                              >
                                已有
                                {eventParticipants.items.reduce(function (
                                  sum,
                                  items
                                ) {
                                  return sum + items.numberOfPeople;
                                },
                                0)}
                                人报名
                              </Typography>
                            )}
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid item xs={6} sm={8} md={8}>
                        <Card>
                          <CardContent>
                            <Typography
                              variant="h5"
                              component="div"
                              gutterBottom
                            >
                              <b>联系方式</b>
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                              如果你对此活动有任何疑问可以扫描以下二维码
                            </Typography>
                            {userInfo.isAuthenticated ? (
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                {qrCodeImgURL ? (
                                  <CardMedia
                                    component="img"
                                    style={{
                                      width: "auto",
                                      maxHeight: "150px",
                                    }}
                                    image={qrCodeImgURL}
                                  />
                                ) : (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <Typography variant="subtitle1">
                                      暂无二维码
                                    </Typography>
                                  </Box>
                                )}
                              </Box>
                            ) : (
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <Typography
                                  variant="subtitle1"
                                  sx={{ marginBottom: "3rem" }}
                                >
                                  需要登入才能扫描哦 ~
                                </Typography>
                              </Box>
                            )}
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                  </Box>
                </Container>
              </TabPanel>
              <TabPanel value={value} index={1} component={"div"}>
                <Card>
                  <CardContent>
                    <EventCommentsPost event={event} />
                    <EventComments event={event} />
                  </CardContent>
                </Card>
              </TabPanel>
            </Box>
          </div>
        </div>
      ) : (
        <div>
          <CircularProgress />
        </div>
      )}
    </Box>
  );
}
