<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useAuthorStore } from "@/store/author";

const { authors } = storeToRefs(useAuthorStore());
const { fetchAuthors } = useAuthorStore();

fetchAuthors();

useAsyncData("fetchData", async () => {
  await fetchAuthors();
});
</script>

<template>
  <div>
    <template v-if="authors">
      <p v-for="author in authors" :key="author.id">
        <NuxtLink :to="`/author/${author.username}`">{{
          author.name
        }}</NuxtLink>
      </p>
    </template>
  </div>
</template>
