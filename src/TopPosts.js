import {
  mapProps,
  branch,
  renderComponent,
  renderNothing,
  compose,
} from 'recompose'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost'
import PostList from './components/PostList'
import Loading from './LoadingIndicator'
import ErrorMessage from './ErrorMessage'

export const GET_TOP_POST_LIKES = gql`
  query TopPostLikes($skip: Int!, $limit: Int!) {
    topPostLikes(skip: $skip, limit: $limit) {
      count
      post {
        id
        title
      }
    }
  }
`

export const enhance = compose(
  graphql(GET_TOP_POST_LIKES, {
    options: {
      variables: {
        skip: 0,
        limit: 10,
      },
    },
  }),
  branch(({ data: { loading } }) => loading, renderComponent(Loading)),
  branch(({ data: { error } }) => error, renderComponent(ErrorMessage)),
  branch(
    ({ data: { topPostLikes } }) => topPostLikes.length === 0,
    renderNothing,
  ),
  mapProps(({ data: { topPostLikes } }) => ({
    posts: topPostLikes.map(({ count, post: { id, title } }) => ({
      id,
      title,
      likes: count,
    })),
  })),
)

export default enhance(PostList)
