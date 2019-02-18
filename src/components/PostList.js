import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import PostListItem from './PostListItem'

export const Container = styled.ul`
  margin: 0 auto;
  max-width: 30em;
  border: 1px solid #999;
`

const PostList = ({ posts }) => (
  <Container>
    {posts.map(post => (
      <PostListItem key={post.id} {...post} />
    ))}
  </Container>
)
PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape(PostListItem.propTypes)),
}

export default PostList
