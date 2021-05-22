<template>
    <Warning />
    <div class="container-xxl index-layout">
        <aside class="grid-sidebar collapse"></aside>
        <aside class="grid-rightside collapse"></aside>
        <main class="grid-main index-main">
            <Entry v-for="entry in entries" :key="entry.bid" v-bind="entry" />
        </main>
    </div>
</template>

<script>
import Warning from "./Warning.vue";
import Entry from "./Entry.vue";
import { getBlogs } from "../api";

export default {
    components: {
        Warning,
        Entry,
    },
    data() {
        return {
            entries: [],
        };
    },
    mounted() {
        getBlogs(1, 5).then((data) => {
            this.entries = data.content.map((v) => ({
                bid: v.blogId,
                title: v.title,
                author: `${v.userId}`,
                timestamp: v.gmtModified,
                summary: v.content.substr(0, 250),
                likes: v.likeNum,
                views: v.readNum,
            }));
        });
    },
};
</script>