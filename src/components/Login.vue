<template>
    <main class="form-login">
        <form v-on:submit.prevent class="text-center">
            <h1 class="h3 mb-3 fw-normal">Log In</h1>
            <div class="form-floating">
                <input
                    class="form-control input-start"
                    name="username"
                    type="text"
                    placeholder="Username"
                    required
                    autofocus
                    v-model="username"
                />
                <label for="username">Username</label>
            </div>
            <div class="form-floating">
                <input
                    class="form-control input-end"
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    v-model="password"
                />
                <label for="password">Password</label>
            </div>
            <button
                class="w-100 btn btn-lg btn-outline-primary"
                type="submit"
                @click="submit"
            >
                Log In
            </button>
        </form>
    </main>
</template>

<script>
import { login, getUser } from "../api";
import { isAuthenticated, setCurrentUser, clearCurrentUser } from "../auth";

export default {
    created() {
        if(isAuthenticated()) {
            this.$router.push("/");
        }
    },
    methods: {
        async submit() {
            try {
                await login({
                    username: this.username,
                    password: this.password,
                });
            } catch {
                return;
            }
            try {
                const user = await getUser(this.username);
                setCurrentUser({
                    userId: user.userId,
                    username: user.username,
                    email: user.email,
                });
            } catch {
                clearCurrentUser();
                return;
            }
            window.location.href = "/";
        },
    },
};
</script>