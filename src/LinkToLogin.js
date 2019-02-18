import { mapProps, compose } from 'recompose'
import { Link, withRouter } from 'react-router-dom'
import omit from 'lodash/omit'

export const enhance = compose(
  withRouter,
  mapProps(({ location, ...props }) => ({
    ...omit(props, ['match', 'history']),
    to: {
      pathname: '/login',
      state: { from: location },
    },
  })),
)

export default enhance(Link)
