<template>
    <header
        class="navbar navbar-expand-md navbar-light navbar-shadow bg-light sticky-top"
    >
        <nav class="container-fluid">
            <router-link class="navbar-brand" to="/">
                <img
                    src="../assets/logo.svg"
                    alt="My Blog"
                    width="40"
                    height="32"
                />
            </router-link>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto">
                    <li
                        class="nav-item"
                        v-for="route of routes"
                        :key="route.path"
                    >
                        <router-link
                            :class="{
                                'nav-link': true,
                                active: isActive(route.to),
                            }"
                            :to="route.to"
                        >
                            {{ route.text }}
                        </router-link>
                    </li>
                    <li class="nav-item" v-if="authed">
                        <a class="nav-link" @click="logout" href="">Log Out</a>
                    </li>
                </ul>
                <form class="d-flex">
                    <input
                        class="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                </form>
            </div>
        </nav>
    </header>
</template>

<script>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { isAuthenticated, clearCurrentUser } from "../auth";

export default {
    setup() {
        const authed = isAuthenticated();
        const routes = (() => {
            if (authed) {
                return [
                    { to: "/", text: "Home" },
                    { to: "/newpost", text: "New Post" },
                    { to: "/profile", text: "Profile" },
                ];
            } else {
                return [
                    { to: "/", text: "Home" },
                    { to: "/login", text: "Login" },
                    { to: "/signup", text: "Sign Up" },
                ];
            }
        })();
        const router = useRouter();
        const activeRoute = computed(() => router.currentRoute.value.path);
        const isActive = (path) => path === activeRoute.value;
        return { authed, isActive, routes };
    },
    methods: {
        logout() {
            clearCurrentUser();
        },
    },
};
</script>
