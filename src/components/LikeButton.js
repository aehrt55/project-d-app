import styled from 'styled-components'
import { branch, renderComponent, compose } from 'recompose'
import HeartRegular from '../icons/HeartRegular'
import HeartSolid from '../icons/HeartSolid'

const iconStyler = Icon => styled(Icon)`
  cursor: pointer;
  color: ${({ theme, inactive }) =>
    inactive ? theme.inactiveColor : theme.secondaryColor};
`

export const enhance = compose(
  iconStyler,
  branch(({ liked }) => liked, renderComponent(HeartSolid)),
)

export default enhance(HeartRegular)
