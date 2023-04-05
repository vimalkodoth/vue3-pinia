<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useCommentStore } from "@/store/comment";
import CommentItem from "./CommentItem.vue";

defineProps(["post", "author"]);

const { getPostComments } = storeToRefs(useCommentStore());
const { fetchComments } = useCommentStore();

fetchComments();
</script>
<template>
  <div>
    <div>
      <h2>{{ post.title }}</h2>
      <p v-if="author">
        Written by:
        <NuxtLink :to="`/author/${author.username}`">{{
          author.name
        }}</NuxtLink>
        |
        <span>Comments: {{ getPostComments.length }}</span>
      </p>
      <p>{{ post.body }}</p>
    </div>
    <hr />
    <h3>Comments:</h3>
    <comment-item :comments="getPostComments"></comment-item>
  </div>
</template>
