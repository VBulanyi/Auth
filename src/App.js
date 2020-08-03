import React, { Component } from 'react'
import Layout from './hoc/Layout/Layout'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import Auth from './containers/Auth/Auth'
import Users from './containers/Users/Users'
import Logout from './components/Logout/Logout'
import { connect } from 'react-redux'
import { autoLogin } from './store/actions/auth'

class App extends Component {

  componentDidMount() {
    this.props.autoLogin()
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={Auth} />
        <Redirect to={'/'} />
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path={'/logout'} component={Logout} />
          <Route path="/" exact component={Users} />
          <Redirect to={'/'} />
        </Switch>
      )
    }

    return (
      <Layout>
        {routes}
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
