import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import Blog from "./components/Blog.vue";
import User from "./components/User.vue";
import Profile from "./components/Profile.vue";
import NotFound from "./components/NotFound.vue";
import Login from "./components/Login.vue";
import SignUp from "./components/SignUp.vue";
import NewPost from "./components/NewPost.vue";

const routes = [
    {
        path: "/",
        component: Home,
    },
    {
        path: "/profile",
        component: Profile,
    },
    {
        path: "/user/:username",
        name: "user",
        component: User,
    },
    {
        path: "/blog/:bid",
        name: "blog",
        component: Blog,
    },
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/newpost",
        component: NewPost,
    },
    {
        path: "/signup",
        component: SignUp,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    },
];

const history = createWebHistory();

const router = createRouter({
    history,
    routes,
});

export default router;
