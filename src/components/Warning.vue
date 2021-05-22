<template>
    <div
        class="modal fade"
        id="warning"
        tabindex="-1"
        aria-labelledby="warningModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="warningModalLabel">Warning</h5>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body">
                    Do you really want to delete this post?
                </div>
                <div class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                    >
                        Close
                    </button>
                    <button
                        @click="deletePost(bid)"
                        type="button"
                        class="btn btn-danger"
                    >
                        Delete {{ bid }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            bid: 0,
        };
    },
    mounted() {
        this.$el.addEventListener("show.bs.modal", (event) => {
            const button = event.relatedTarget;
            const bid = parseInt(button.getAttribute("data-bid"));
            this.bid = bid;
        });
    },
    methods: {
        deletePost(bid) {
            console.log("delete Post", bid);
            this.$router.go();
        },
    },
};
</script>