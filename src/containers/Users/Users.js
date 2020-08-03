import React, { Component } from 'react'
import classes from './Users.css'
import Loader from '../../components/UI/Loader/Loader'
import User from '../../components/User/User'
import Input from '../../components/UI/Input/Input'
import { connect } from 'react-redux'
import { getUsers } from '../../store/actions/users';

class Users extends Component {

  constructor(props) {
    super(props);
    this.state = { users: this.props.users };
  }

  searchHandler = (event) => {
    this.setState({
      users: this.props.users.filter(user => user.username.toLowerCase().includes(event.target.value.toLowerCase()))
    })
  }

  renderUsers = () => {
    return this.state.users.sort((a, b) => a.id > b.id ? 1 : -1).map(user => {
      return (
        <User
          key={user.id}
          username={user.username}
          id={user.id}
          last_name={user.last_name}
          first_name={user.first_name}
          is_active={user.is_active}
          is_superuser={user.is_superuser}
          last_login={user.last_login}
        />
      )
    })
  }

  componentDidMount() {
    this.props.getUsers()
  }

  componentDidUpdate(prevProps) {
    if (this.props.users !== prevProps.users) {
      this.setState({ users: this.props.users });
    }
  }

  render() {
    return (
      <div className={classes.Users}>
        <h1>Список пользователей</h1>
        <Input
          placeholder={'Поиск по имени пользователя'}
          onChange={(event) => this.searchHandler(event)}
          type={'text'}
          className={classes}
        />
        {
          this.props.loading && this.props.users.length !== 0
            ? <Loader />
            :
            <div className={classes.Container}>
              {this.renderUsers()}
            </div>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    users: state.users.users,
    loading: state.users.loading

  }
}

function mapDispatchToProps(dispatch) {
  return {
    getUsers: () => dispatch(getUsers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)