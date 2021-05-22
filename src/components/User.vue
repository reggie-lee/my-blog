<template>
    <div class="container-sm">
        <main class="mx-auto mt-5" style="max-width: 480px">
            <h1 class="mb-4 text-center">User Profile</h1>
            <form>
                <div class="row mb-4">
                    <div class="col-3 text-end">
                        <label for="username" class="col-form-label"
                            >Username</label
                        >
                    </div>
                    <div class="col-9">
                        <div class="input-group">
                            <span class="input-group-text">@</span>
                            <input
                                id="username"
                                class="form-control"
                                type="text"
                                name="username"
                                placeholder="Username"
                                :value="username"
                            />
                        </div>
                    </div>
                </div>
                <div class="row mb-4">
                    <div class="col-3 text-end">
                        <label for="email" class="col-form-label">Email</label>
                    </div>
                    <div class="col-9">
                        <input
                            id="email"
                            class="form-control"
                            type="email"
                            name="email"
                            placeholder="Email"
                            :value="email"
                        />
                    </div>
                </div>
            </form>
        </main>
    </div>
</template>

<script>
import { isAuthenticated } from "../auth";

export default {
    created() {
        if (!isAuthenticated()) {
            this.$router.push("/login");
        }
    },
    data() {
        return {
            username: this.$route.params.username,
            email: "admin@example.com",
        };
    },
};
</script>
