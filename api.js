
export function formatDate(timestamp) {
    return new Date(timestamp).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

/** @param {Response} resp */
async function unwrap(resp) {
    if (resp.status == 401) {
        window.location.href = "/login";
    }
    if (!resp.ok) {
        throw resp;
    }
    const json = await resp.json();
    if (typeof json.code !== "number"
        || typeof json.msg !== "string") {
        throw json;
    }
    if (json.code != 200) {
        console.error(`${json.code}: ${json.msg}`);
        throw [json.code, json.msg];
    }
    return json.data;
}

function urlWithParams(url, params) {
    if (typeof params !== "undefined")
        return url.toString() + "?" + new URLSearchParams(params).toString();
    else
        return url.toString();
}

/**
 * @param {"GET" | "POST" | "PUT" | "DELETE"} method
 * @param {string} url
 * @param {Record<string, string|number|null|Array>} [body]
 */
async function api(method, url, body) {
    let req;
    switch (method) {
        case "DELETE":
        case "GET": {
            req = fetch(`/api/${urlWithParams(url, body)}`, {
                method: "GET",
                credentials: "same-origin",
                headers: {
                    "Accept": "application/json",
                },
            });
        } break;
        default: {
            req = fetch(`/api/${url}`, {
                method: "POST",
                credentials: "same-origin",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: typeof body !== "undefined"
                    ? JSON.stringify(body)
                    : undefined,
            });
        }
    }
    return unwrap(await req);
}

/**
 * @param {{
 *  username: string,
 *  password: string,
 * }} creds
 * @returns {Promise<number>}
 */
export function login(creds) {
    return api("POST", "login", {
        username: creds.username,
        pwd: creds.password,
    });
}

/**
 * @typedef {{
 *  userId: number,
 *  username: string,
 *  userIdentity: "BLOGGER" | "ADMIN",
 *  userSite: string | null,
 *  avatar: string | null,
 *  email: string,
 *  postCount: number,
 *  collectionCount: number,
 *  likeCount: number,
 *  following: number,
 *  followed: number,
 *  isDelete: number,
 * }} User
 */

/**
 * @param {{
 *  username: string,
 *  password: string,
 *  email: string,
 * }} creds
 * @returns {Promise<User>}
 */
export function signUp(creds) {
    return api("POST", "join", {
        username: creds.username,
        password: creds.password,
        userIdentity: "BLOGGER",
        // age: 0,
        // gender: "unknown",
        email: creds.email,
    });
}

/**
 * @returns {Promise<User>}
 */
export function getUser(username) {
    return api("GET", `users/username`, { username });
}

/**
 * @param {{
 *  userId: number,
 *  username: string,
 *  usersite: string,
 *  avatar: string,
 *  email: string,
 * }} user
 */
export function updateUser(user) {
    return api("PUT", "users/user", user);
}

/**
 * @typedef {{
 *  blogId: number,
 *  userId: number,
 *  title: string,
 *  content: string,
 *  readNum: number,
 *  likeNum: number,
 *  commentNum: number,
 *  collectionNum: number,
 *  isDelete: number,
 *  gmtCreate: number,
 *  gmtModified: number,
 * }} Blog
 * @typedef {{
 *  pageNum: number,
 *  pageSize: number,
 *  totalSize: number,
 *  totalPages: number,
 *  content: Blog[],
 * }} Blogs
 */

/**
 * @returns {Promise<Blogs>}
 */
export function getBlogs(page, size) {
    return api("GET", "blogs/square", {
        page,
        size,
    });
}

/**
 * @returns {Promise<Blogs>}
 */
export function getBlogsByUid(page, size, userId) {
    return api("GET", "blogs/u/blog", {
        page,
        size,
        userId,
    });
}

/**
 * @returns {Promise<Blog>}
 */
export function getBlogByTitle(title) {
    return api("GET", `blogs/title`, { title });
}

/**
 * @returns {Promise<Blog>}
 */
export function getBlogByBid(bid) {
    return api("GET", "blogs/id", { bid });
}

/**
 * @param {{
 *  userId: number,
 *  title: string,
 *  content: string,
 * }} blog
 * @returns {Promise<Blog>}
 */
export function postBlog(blog) {
    return api("POST", "blogs/blog", blog);
}

/**
 * @param {{
 *  uid: number,
 *  bid: number,
 *  title: string,
 *  content: string,
 * }} blog 
 */
export function updateBlog(blog) {
    return api("PUT", "blogs/blog", blog);
}

export function deleteBlog(uid, bid) {
    return api("DELETE", "blogs/blog", { uid, bid });
}

/**
 * @typedef {{
 *  blogId: number,
 *  commentId: number,
 *  content: string,
 *  gmtCreate: number,
 *  parentCommentId: 0 | number,
 *  parentUsername: null | string,
 *  replyComments: Comment[],
 *  username: string,
 * }} Comment
 */

/**
 * @returns {Promise<Comment[]>}
 */
export function getCommentsByBid(bid) {
    return api("GET", `comments/b`, { bid });
}

/**
 * @param {{
 *  blogId: number,
 *  username: string,
 *  content: string,
 *  parentCommentId: 0 | number,
 * }} comment
 */
export function postComment(comment) {
    return api("POST", "comments/comment", comment);
}

export function likeBlog(bid, uid) {
    return api("POST", "likes/like", { bid, uid });
}

export function unlikeBlog(bid, uid) {
    return api("DELETE", "likes/like", { bid, uid });
}
