import React from 'react'
import styled, { css } from 'styled-components'
import { branch, renderComponent, compose } from 'recompose'
import { Link } from 'react-router-dom'
import withUser from './withUser'
import { enhance as linkToLogin } from './LinkToLogin'
import LodingIndicator from './LoadingIndicator'

export const Container = styled.header`
  background-color: #1d127d;
  color: white;
  display: flex;
  align-items: center;
  height: 4em;
  width: 100%;
  padding: 0 1.5em;
`

export const Title = styled.h1`
  font-size: 2em;
`

export const Nav = styled.nav`
  margin-left: auto;
`

export const NavMixin = css`
  margin-left: 1.5em;
`

export const NavLink = styled(Link)`
  ${NavMixin}
`

export const LogoutNavLink = styled.a`
  ${NavMixin}
`

export const LogoutNavItem = () => (
  <LogoutNavLink href="/api/auth/logout">Logout</LogoutNavLink>
)

export const UserNavLink = compose(
  withUser({
    props: ({ data: { me, networkStatus } }) => ({
      userLoading: networkStatus < 7,
      me,
    }),
  }),
  branch(({ userLoading }) => userLoading, renderComponent(LodingIndicator)),
  branch(({ me }) => !!me, renderComponent(LogoutNavItem)),
  linkToLogin,
)(NavLink)

export const Header = () => (
  <Container>
    <Title>Project D</Title>
    <Nav>
      <UserNavLink>Login</UserNavLink>
    </Nav>
  </Container>
)

export default Header
