<template>
    <main class="form-login">
        <form v-on:submit.prevent class="text-center">
            <h1 class="h3 mb-3 fw-normal">Sign Up</h1>
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
                    class="form-control input-middle"
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    v-model="email"
                />
                <label for="email">Email</label>
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
                Sign Up
            </button>
        </form>
    </main>
</template>

<script>
import { signUp } from "../api";
import { isAuthenticated } from "../auth";

export default {
    created() {
        if (isAuthenticated()) {
            this.$router.push("/");
        }
    },
    methods: {
        async submit() {
            try {
                await signUp({
                    username: this.username,
                    password: this.password,
                    email: this.email,
                });
            } catch {
                return;
            }
            this.$router.push("/login");
        },
    },
};
</script>