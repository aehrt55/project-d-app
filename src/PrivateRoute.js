import { withProps, branch, renderComponent, compose } from 'recompose'
import { Redirect, Route } from 'react-router-dom'
import withUser from './withUser'
import LodingIndicator from './LoadingIndicator'

export const RedirectToLoging = withProps(({ location }) => ({
  to: {
    pathname: '/login',
    state: { from: location, back: { pathname: '/' } },
  },
}))(Redirect)

export const enhance = compose(
  withUser(),
  branch(
    ({ data: { networkStatus } }) => networkStatus < 7,
    renderComponent(LodingIndicator),
  ),
  branch(({ data: { me } }) => !me, renderComponent(RedirectToLoging)),
)

export default enhance(Route)
