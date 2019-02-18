import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { mapProps, compose } from 'recompose'
import BackButton from './components/BackButton'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: calc(100vh - 4em);
  width: 100%;
  max-width: 250px;
  margin: 0 auto;
`

export const FacebookLoginButton = styled.a`
  background-color: #4267b2;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2em;
  margin-bottom: 1.5em;
`

export const Login = ({ redirectUri, back }) => {
  console.log(back)
  return (
    <Container>
      <FacebookLoginButton
        href={`/api/auth/facebook?redirectUri=${redirectUri}`}
      >
        Login with Facebook
      </FacebookLoginButton>
      <BackButton to={back}>Back</BackButton>
    </Container>
  )
}
Login.propTypes = {
  redirectUri: PropTypes.string.isRequired,
  back: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string,
  }).isRequired,
}

export const enhance = compose(
  mapProps(props => {
    console.log(props)
    return props
  }),
  mapProps(({ location: { state } }) => ({
    back: (state && (state.back || state.from)) || { pathname: '/' },
    redirectUri: state
      ? encodeURI(`${state.from.pathname}${state.from.search}`)
      : '/',
  })),
)

export default enhance(Login)
