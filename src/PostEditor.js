import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { withState, withHandlers, compose } from 'recompose'
import BackButton from './components/BackButton'

export const Container = styled.main`
  padding: 3em 1.5em;
`

export const StyledForm = styled.form`
  margin-top: 2em;
`

export const Field = styled.div`
  display: flex;
  align-items: baseline;
  margin-top: 1em;
`

export const StyledLabel = styled.label`
  flex: 0 0 100px;
`

export const SubmitButton = styled.div.attrs({
  role: 'button',
  type: 'submit',
})`
  margin-top: 1em;
  display: inline-flex;
  align-items: center;
  background-color: ${({ theme }) => theme.primaryColor};
  color: white;
  height: 2em;
  padding: 0 1em;
`

export const PostEditor = ({
  onClick,
  title,
  content,
  onTitleChange,
  onContentChange,
}) => (
  <Container>
    <BackButton to="/" inline>
      Back
    </BackButton>
    <StyledForm>
      <Field>
        <StyledLabel>Title:</StyledLabel>
        <input value={title} onChange={onTitleChange} />
      </Field>
      <Field>
        <StyledLabel>Content:</StyledLabel>
        <textarea value={content} onChange={onContentChange} />
      </Field>
      <SubmitButton onClick={onClick}>Create Post</SubmitButton>
    </StyledForm>
  </Container>
)
PostEditor.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.func.isRequired,
  content: PropTypes.func.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onContentChange: PropTypes.func.isRequired,
}

const CREATE_POST = gql`
  mutation CreatePost($title: String!, $content: String!) {
    createPost(title: $title, content: $content) {
      id
      title
      author {
        id
        name
      }
    }
  }
`

export const enhance = compose(
  withState('title', 'setTitle', ''),
  withState('content', 'setContent', ''),
  graphql(CREATE_POST, {
    name: 'createPost',
    options: {
      refetchQueries: ['LatestPosts'],
      awaitRefetchQueries: true,
    },
  }),
  withHandlers({
    onClick: ({ createPost, title, content, history }) => async event => {
      await createPost({
        variables: {
          title,
          content,
        },
      })
      history.push('/')
    },
    onTitleChange: ({ setTitle }) => ({ target: { value } }) => setTitle(value),
    onContentChange: ({ setContent }) => ({ target: { value } }) =>
      setContent(value),
  }),
)

export default enhance(PostEditor)
