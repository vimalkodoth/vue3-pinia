import { defineStore } from "pinia";

type Post = {
  userId: string;
  id: string;
  title: string;
  body: string;
};

type PostProps = {
  posts: null | Post[];
  post: null | Post;
  loading: boolean;
  error: null | Error;
};

export const usePostStore = defineStore({
  id: "post",
  state: (): PostProps => ({
    posts: [],
    post: null,
    loading: false,
    error: null,
  }),
  getters: {
    getPostsPerAuthor: (state) => {
      return (authorId: string) =>
        state.posts?.filter((post) => post.userId === authorId);
    },
  },
  actions: {
    async fetchPosts() {
      this.posts = [];
      this.loading = true;
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        this.posts = await response.json();
      } catch (error: unknown) {
        if (error instanceof Error) {
          this.error = error;
        }
      } finally {
        this.loading = false;
      }
    },

    async fetchPost(id: string) {
      this.post = null;
      this.loading = true;
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        this.post = await response.json();
      } catch (error: unknown) {
        if (error instanceof Error) {
          this.error = error;
        }
      } finally {
        this.loading = false;
      }
    },
  },
});
