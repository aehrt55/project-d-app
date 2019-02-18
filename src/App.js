import React, { Fragment } from 'react'
import { Switch, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import * as theme from './theme'
import GlobalStyle from './GlobalStyle'
import Header from './Header'
import PrivateRoute from './PrivateRoute'
import PostList from './PostList'
import PostDetail from './PostDetail'
import PostEditor from './PostEditor'
import Login from './Login'

export const App = () => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <GlobalStyle />
      <Header />
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/posts/new" component={PostEditor} />
        <Route path="/posts/:postId" component={PostDetail} />
        <Route component={PostList} />
      </Switch>
    </Fragment>
  </ThemeProvider>
)

export default App
