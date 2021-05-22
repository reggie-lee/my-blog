<template>
    <div class="container-xxl blog-layout">
        <aside class="grid-sidebar">
            <nav id="blog-toc" class="blog-toc collapse text-muted text-center">
                <ul id="blog-nav">
                    <li class="border-bottom pb-2 my-2">Table of Contents</li>
                    <li v-for="section of sections" :key="section.id">
                        <a :href="`${section.id}`">{{ section.title }}</a>
                    </li>
                </ul>
            </nav>
        </aside>
        <main class="mt-4 grid-main">
            <div id="section-title" class="blog-title">
                <h1>{{ title }}</h1>
            </div>
            <div id="blog-content" class="blog-content" v-html="markdown"></div>
        </main>
    </div>
</template>

<script>
import { getBlogByBid } from "../api";
import marked from "marked";

/* try {
    new Gumshoe("#blog-nav a", { offset: 60 });
} catch {} */

export default {
    data() {
        return {
            sections: [],
            title: "",
            content: "",
        };
    },
    mounted() {
        const bid = parseInt(this.$route.params.bid);
        getBlogByBid(bid)
            .catch(() => {
                this.$router.push("/notfound");
            })
            .then((blog) => {
                this.title = blog.title;
                this.content = marked(blog.content);
            });
    },
    computed: {
        markdown() {
            const self = this;
            const renderer = {
                heading(text, level) {
                    if (level === 2) {
                        const escapedText = text
                            .toLowerCase()
                            .replace(/[^\w]+/g, "-");
                        const id = `#section-${escapedText}`;
                        self.sections.push({
                            id,
                            title: text,
                        });
                        return `<h${level} id="${id}">${text}</h${level}>`;
                    } else {
                        return `<h${level}>${text}</h${level}>`;
                    }
                },
            };
            marked.use({ renderer });
            return marked(this.content);
        },
    },
};
</script>