<template>
    <div class="container-sm">
        <main class="mx-auto mt-5" style="max-width: 480px">
            <h1 class="mb-4 text-center">New Post</h1>
            <form v-on:submit.prevent>
                <div class="row mb-4">
                    <div class="col-2 text-end">
                        <label for="title" class="col-form-label">Title</label>
                    </div>
                    <div class="col-10">
                        <input
                            id="title"
                            class="form-control"
                            type="text"
                            name="title"
                            placeholder="Title"
                            v-model="title"
                        />
                    </div>
                </div>
                <div class="row mb-4">
                    <div class="col-2 text-end">
                        <label for="content" class="col-form-label"
                            >Content</label
                        >
                    </div>
                    <div class="col-10">
                        <textarea
                            id="content"
                            class="form-control"
                            name="content"
                            rows="4"
                            placeholder="Content"
                            v-model="content"
                        ></textarea>
                    </div>
                </div>
                <div class="text-center">
                    <button type="submit" class="btn btn-primary" @click="post">
                        Publish
                    </button>
                </div>
            </form>
        </main>
    </div>
</template>

<script>
import { isAuthenticated, getCurrentUser } from "../auth";
import { postBlog } from "../api";

export default {
    methods: {
        created() {
            if (!isAuthenticated()) {
                this.$router.push("/login");
            }
        },
        async post() {
            const user = getCurrentUser();
            try {
                const blog = await postBlog({
                    userId: user.userId,
                    title: this.title,
                    content: this.content,
                    blogStatus: "PUBLIC",
                });
                this.$router.push(`/blog/${blog.blogId}`);
            } catch {}
        },
    },
};
</script>