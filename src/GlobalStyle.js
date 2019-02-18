import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  a {
    color: inherit;
    text-decoration: none;
  }
  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
  }
  body {
    color: #353c58;
  }
  [type="button"], [type="reset"], [type="submit"] {
    appearance: none;
    cursor: pointer;
  }
`
