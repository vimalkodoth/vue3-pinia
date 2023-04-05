<script lang="ts" setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useAuthorStore } from "@/store/author";
import { usePostStore } from "@/store/post";
import AuthorItem from "../../components/AuthorItem.vue";

const route = useRoute();

const { authors } = storeToRefs(useAuthorStore());
const { getPostsPerAuthor } = storeToRefs(usePostStore());
const { fetchPosts } = usePostStore();
const { fetchAuthors } = useAuthorStore();

const getAuthorByUserName = computed(() =>
  authors.value.find((author) => author.username === route.params.username)
);

useAsyncData("fetchData", async () => {
  if (import.meta.env.SSR) {
    await fetchAuthors();
  }
  await fetchPosts();
});
</script>
<template>
  <div>
    <AuthorItem
      :author="getAuthorByUserName"
      :posts="getPostsPerAuthor(getAuthorByUserName?.id ?? '')"
    ></AuthorItem>
  </div>
</template>
