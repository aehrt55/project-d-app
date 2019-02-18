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

export const GET_LATEST_POSTS = gql`
  query LatestPosts($skip: Int!, $limit: Int!) {
    latestPosts(skip: $skip, limit: $limit) {
      id
      title
      likes
    }
  }
`

export const enhance = compose(
  graphql(GET_LATEST_POSTS, {
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
    ({ data: { latestPosts } }) => latestPosts.length === 0,
    renderNothing,
  ),
  mapProps(({ data: { latestPosts } }) => ({
    posts: latestPosts,
  })),
)

export default enhance(PostList)
