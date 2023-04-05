import { defineStore } from "pinia";
import { usePostStore } from "./post";

type Author = {
  id: string;
  name: string;
  username: string;
  email: string;
  address: string;
  phone: string;
  website: string;
  company: string;
};

type AuthorProps = {
  authors: Author[];
};
export const useAuthorStore = defineStore({
  id: "author",
  state: (): AuthorProps => ({
    authors: [],
  }),
  getters: {
    getPostAuthor: (state) => {
      const postStore = usePostStore();
      return state.authors.find(
        (author) => author.id === postStore.post?.userId
      );
    },
  },
  actions: {
    async fetchAuthors() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      this.authors = await response.json();
    },
  },
});
