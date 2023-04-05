<script setup lang="ts">
import { storeToRefs } from "pinia";
import { usePostStore } from "@/store/post";

const { posts, loading, error } = storeToRefs(usePostStore());
const { fetchPosts } = usePostStore();

useAsyncData("fetchData", async () => {
  await fetchPosts();
});
</script>

<template>
  <main>
    <p v-if="loading">Loading posts...</p>
    <p v-if="error">Error loading posts... {{ error.message }}</p>
    <template v-if="posts">
      <div v-for="post in posts" :key="post.id">
        <NuxtLink :to="`/post/${post.id}`">{{ post.title }}</NuxtLink>
        <p>{{ post.body }}</p>
      </div>
    </template>
  </main>
</template>
