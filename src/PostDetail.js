import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { mapProps, branch, renderComponent, compose } from 'recompose'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost'
import BackButton from './components/BackButton'
import LodingIndicator from './LoadingIndicator'
import ErrorMessage from './ErrorMessage'
import LikePostButton from './LikePostButton'

export const Container = styled.main`
  padding: 3em 1.5em;
`

const PostDetail = ({
  postId,
  title,
  content,
  author: { name: authorName },
  hasLiked,
}) => (
  <Container>
    <BackButton to="/" inline>
      Back
    </BackButton>
    <h2>{title}</h2>
    <p>{content}</p>
    <p>author: {authorName}</p>
    <LikePostButton liked={hasLiked} postId={postId} />
  </Container>
)
PostDetail.propTypes = {
  postId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  hasLiked: PropTypes.bool.isRequired,
}

export const GET_POST_DETAIL = gql`
  query PostDetail($id: String!) {
    post(id: $id) {
      title
      content
      author {
        name
      }
      hasLiked
    }
  }
`

export const enhance = compose(
  graphql(GET_POST_DETAIL, {
    options: ({
      match: {
        params: { postId },
      },
    }) => ({
      variables: {
        id: postId,
      },
    }),
  }),
  branch(({ data: { loading } }) => loading, renderComponent(LodingIndicator)),
  branch(({ data: { error } }) => error, renderComponent(ErrorMessage)),
  mapProps(({ data: { post }, match: { params: { postId } } }) => ({
    ...post,
    postId,
  })),
)

export default enhance(PostDetail)
