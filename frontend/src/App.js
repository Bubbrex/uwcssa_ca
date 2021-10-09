import { Provider, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Amplify from "aws-amplify";
import ArticleDetail from "./containers/ArticleDetail";
import ArticleListing from "./containers/ArticleListing";
import ArticlesPreview from "./containers/staff/Article/ArticlesPreview";
import Career from "./containers/Career";
import ContactUs from "./containers/ContactUs";
import Dashboard from "./containers/account/Dashboard";
import EmailConfirm from "./containers/authentication/EmailConfirm";
import Footer from "./containers/Footer";
import ForgotPassword from "./containers/authentication/ForgotPassword";
import Forum from "./containers/Forum";
import ForumPost from "./components/Forum/CurdTesting/ForumPost";
import ForumPostCommentDetail from "./components/Forum/CurdTesting/ForumPostCommentDetail";
import ForumPostDetail from "./components/Forum/CurdTesting/ForumPostDetail";
import ForumPostList from "./components/Forum/CurdTesting/ForumPostList";
import ForumTopic from "./components/Forum/CurdTesting/ForumTopic";
import GraphQLTesting from "./containers/GraphQLTesting";
import Header from "./containers/Header";
import Home from "./containers/Home";
import MyAccount from "./containers/account/MyAccount";
import PostArticle from "./containers/staff/Article/PostArticle";
import PostUwcssaJob from "./containers/staff/UwcssaJob/PostUwcssaJob";
import Profile from "./containers/account/Profile";
import ResetPassword from "./containers/authentication/ResetPassword";
import ScrollToTop from "./Hooks/ScrollToTop";
import SignIn from "./containers/authentication/SignIn";
import SignUp from "./containers/authentication/SignUp";
import Staff from "./containers/staff/Staff";
import UwcssaJobsPreview from "./containers/staff/UwcssaJob/UwcssaJobsPreview";
import awsconfig from "./aws-exports";
import { load_user } from "./redux/actions/authActions";
import { makeStyles } from "@mui/styles";
import { setUserCounts } from "./redux/actions/userActions";
import store from "./redux/store";

const theme = createTheme({
  typography: {
    fontFamily: "Noto Sans SC",
  },
});

Amplify.configure(awsconfig);

const useStyles = makeStyles({
  headerBody: {
    minHeight: `calc(100vh - 220px)`,
    [theme.breakpoints.down("sm")]: {
      minHeight: `calc(100vh - 350px)`,
    },
  },
});

export default function App() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(load_user());
    dispatch(setUserCounts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <ScrollToTop />
          <div className={classes.headerBody}>
            <Header />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/account/dashboard" exact component={Dashboard} />
              <Route
                path="/account/profile/:username"
                exact
                component={Profile}
              />
              <Route path="/account/myAccount" exact component={MyAccount} />
              <Route path="/staff" exact component={Staff} />
              <Route path="/staff/article" exact component={ArticlesPreview} />
              <Route
                path="/staff/uwcssaJob"
                exact
                component={UwcssaJobsPreview}
              />
              <Route
                path="/staff/article/postArticle"
                exact
                component={PostArticle}
              />
              <Route
                path="/staff/uwcssaJob/postUwcssaJob"
                exact
                component={PostUwcssaJob}
              />
              <Route path="/forum" exact component={Forum} />
              <Route path="/forumTopic" exact component={ForumTopic} />
              <Route path="/forumPost" exact component={ForumPost} />
              <Route path="/forumPostList" exact component={ForumPostList} />
              <Route
                path="/forumPost/:forumPostId"
                exact
                component={ForumPostDetail}
              />
              <Route
                path="/forumPost/forumPostComment/:forumPostCommentId"
                exact
                component={ForumPostCommentDetail}
              />
              <Route path="/signIn" exact component={SignIn} />
              <Route path="/signUp" exact component={SignUp} />
              <Route path="/forgotPassword" exact component={ForgotPassword} />
              <Route path="/resetPassword" exact component={ResetPassword} />
              <Route
                path="/emailConfirm/:username"
                exact
                component={EmailConfirm}
              />
              <Route path="/article" exact component={ArticleListing} />
              <Route
                path="/article/:articleId"
                exact
                component={ArticleDetail}
              />
              <Route path="/graphqlTesting" exact component={GraphQLTesting} />
              <Route path="/contactUs" exact component={ContactUs} />
              <Route path="/career" component={Career} />
              <Route>404 Not Found!</Route>
            </Switch>
          </div>
          <Footer />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}
