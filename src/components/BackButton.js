import styled from 'styled-components'
import { Link } from 'react-router-dom'

export default styled(Link)`
  display: ${({ inline }) => (inline ? 'inline-flex' : 'flex')};
  align-items: center;
  justify-content: center;
  padding: 0 1em;
  height: 2em;
  background-color: ${({ theme }) => theme.inactiveColor};
`
