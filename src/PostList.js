import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'
import LatestPosts from './LatestPosts'
import TopPosts from './TopPosts'

export const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  pointer-events: ${({ active }) => (active ? 'none' : 'auto')};
  color: ${({ active, theme }) => (active ? 'white' : theme.textColor)};
  border: 1px solid ${({ theme }) => theme.secondaryColor};
  background-color: ${({ active, theme }) =>
    active ? theme.secondaryColor : 'white'};
  height: 2em;
  padding: 0 1em;
`

/* eslint-disable react/no-children-prop */
export const TabLink = ({ to, exact, children }) => (
  <Route
    path={to}
    exact={exact}
    children={({ match }) => (
      <StyledLink to={to} active={match !== null}>
        {children}
      </StyledLink>
    )}
  />
)
/* eslint-enable react/no-children-prop */
TabLink.propTypes = {
  to: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  children: PropTypes.node.isRequired,
}
TabLink.defaultProps = {
  exact: false,
}

export const Container = styled.main`
  padding: 3em 1.5em;
`

export const Navbar = styled.nav`
  display: flex;
  align-items: center;
  margin-bottom: 2em;
`

export const NewPostLink = styled(Link)`
  display: flex;
  align-items: center;
  color: white;
  background-color: ${({ theme }) => theme.primaryColor};
  height: 2em;
  padding: 0 1em;
  margin-right: auto;
`

const PostList = () => (
  <Container>
    <Navbar>
      <NewPostLink to="/posts/new">New</NewPostLink>
      <TabLink exact to="/">
        Latest posts
      </TabLink>
      <TabLink exact to="/top">
        Popular posts
      </TabLink>
    </Navbar>
    <Switch>
      <Route exact path="/" component={LatestPosts} />
      <Route exact path="/top" component={TopPosts} />
    </Switch>
  </Container>
)

export default PostList
