<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthorStore } from "@/store/author";
import { usePostStore } from "@/store/post";
import PostItem from "../../components/PostItem.vue";

const route = useRoute();
const { getPostAuthor } = storeToRefs(useAuthorStore());
const { fetchAuthors } = useAuthorStore();
const { post, loading, error } = storeToRefs(usePostStore());
const { fetchPost } = usePostStore();

useAsyncData("fetchData", async () => {
  if (import.meta.env.SSR) {
    await fetchAuthors();
  }
});
await fetchPost(route.params.id as string);
</script>

<template>
  <div>
    <p v-if="loading">Loading post...</p>
    <p v-if="error">{{ error.message }}</p>
    <p v-if="post">
      <PostItem :post="post" :author="getPostAuthor"></PostItem>
    </p>
  </div>
</template>
