<template>
    <article>
        <header>
            <p>
                <router-link
                    class="h1 text-dark"
                    :to="{ name: 'blog', params: { bid } }"
                    >{{ title }}</router-link
                >
                <span class="ms-1 text-muted">
                    <router-link
                        class="text-muted"
                        :to="{ name: 'user', params: { username: author } }"
                        >@{{ author }}</router-link
                    >
                    on
                    <time :datetime="timestamp">{{ date }}</time>
                </span>
            </p>
        </header>
        <div>
            <p>
                {{ summary }}
            </p>
        </div>
        <footer class="h6 text-muted">
            <div class="row">
                <div class="col">
                    <span class="bi-heart"> Like</span>
                </div>
                <div class="col">
                    <span class="bi-pencil-square"> Edit</span>
                </div>
                <div class="col">
                    <span
                        class="bi-trash"
                        data-bs-toggle="modal"
                        data-bs-target="#warning"
                        :data-bid="bid"
                    >
                        Delete</span
                    >
                </div>
            </div>
        </footer>
    </article>
</template>

<script>
export default {
    props: {
        bid: Number,
        title: String,
        author: String,
        timestamp: Number,
        summary: String,
        likes: Number,
        views: Number,
    },
    data() {
        const date = new Date(this.timestamp).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
        return {
            date,
        };
    },
};
</script>