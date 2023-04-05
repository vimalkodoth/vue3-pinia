<script lang="ts" setup>
defineProps(["author", "posts"]);
</script>

<template>
  <div>
    <h1>{{ author?.name }}</h1>
    <p>{{ posts?.length }} posts written.</p>
    <p v-for="post in posts" :key="post.id">
      <NuxtLink :to="`/post/${post.id}`">{{ post.title }}</NuxtLink>
    </p>
  </div>
</template>
