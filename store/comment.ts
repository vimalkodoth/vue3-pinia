import { defineStore } from 'pinia'
import { usePostStore } from './post'

type Comment = {
  postId: string
  id: string
  name: string
  email: string
  body: string
}

type CommentStoreProps = {
  comments: Comment[]
}

export const useCommentStore = defineStore({
  id: 'comment',
  state: (): CommentStoreProps => ({
    comments: []
  }),
  getters: {
    getPostComments: (state) => {
      const postStore = usePostStore()
      return state.comments.filter((comment) => comment?.postId === postStore.post?.id)
    }
  },
  actions: {
    async fetchComments() {
      const response = await fetch('https://jsonplaceholder.typicode.com/comments')
      this.comments = (await response.json()) as Comment[]
    }
  }
})
