import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import {
  withProps,
  branch,
  renderComponent,
  withHandlers,
  nest,
  compose,
} from 'recompose'
import withUser from './withUser'
import { withRouter } from 'react-router-dom'
import LinkToLogin from './LinkToLogin'
import { GET_POST_DETAIL } from './PostDetail'
import LikeButton from './components/LikeButton'

export const LIKE_POST = gql`
  mutation LikePost($postId: String!, $userId: String!) {
    likePost(postId: $postId, userId: $userId)
  }
`

export const UNDO_LIKE_POST = gql`
  mutation UndoLikePost($postId: String!, $userId: String!) {
    undoLikePost(postId: $postId, userId: $userId)
  }
`

export const mutationOptions = ({ postId }) => ({
  update: (proxy, { data: { undoLikePost, likePost } }) => {
    const result = undoLikePost || likePost
    if (!result) {
      return
    }
    const postData = proxy.readQuery({
      query: GET_POST_DETAIL,
      variables: {
        id: postId,
      },
    })
    postData.post.hasLiked = !postData.post.hasLiked
    proxy.writeQuery({
      query: GET_POST_DETAIL,
      variables: {
        id: postId,
      },
      data: postData,
    })
  },
  refetchQueries: ['TopPostLikes', 'LatestPosts'],
})

export const InactiveLikeButton = withProps(() => ({ inactive: true }))(
  LikeButton,
)

export const enhance = compose(
  withRouter,
  withUser(),
  branch(
    ({ data: { me } }) => !me,
    renderComponent(nest(LinkToLogin, InactiveLikeButton)),
  ),
  branch(
    ({ liked }) => liked,
    graphql(UNDO_LIKE_POST, {
      options: mutationOptions,
    }),
    graphql(LIKE_POST, {
      options: mutationOptions,
    }),
  ),
  withHandlers({
    onClick: ({ mutate, postId, data: { me } }) => async () => {
      await mutate({
        variables: {
          postId,
          userId: me.id,
        },
      })
    },
  }),
)

export default enhance(LikeButton)
