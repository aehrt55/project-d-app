import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

export const GET_ME = gql`
  query Me {
    me {
      id
      name
    }
  }
`

export default (config = {}) => graphql(GET_ME, config)
