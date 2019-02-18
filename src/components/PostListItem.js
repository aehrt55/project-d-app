import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import HeartSolid from '../icons/HeartSolid'

export const Container = styled.li`
  &:not(:last-child) {
    border-bottom: 1px solid #999;
  }
  &:hover {
    background-color: #f7f7f7;
  }
`

export const StyledLink = styled(Link)`
  height: 2em;
  padding: 0 1em;
  display: flex;
  align-items: center;
`

export const Title = styled.div`
  flex: 1 1 auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const Likes = styled.div`
  flex: 0 0 2.5em;
  text-align: right;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const PostListItem = ({ id, title, likes }) => (
  <Container key={id}>
    <StyledLink to={`/posts/${id}`}>
      <Title>{title}</Title>
      <Likes>
        <HeartSolid />
        {likes}
      </Likes>
    </StyledLink>
  </Container>
)
PostListItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
}

export default PostListItem
