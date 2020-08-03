import React from 'react';
import classes from './User.css'

const User = props => {
    return (
        <div className={classes.User}>
            <h2>Name: {props.username}</h2>
            <p>Id: {props.id}</p>
            <p>Last Name: {props.last_name}</p>
            <p>First Name: {props.first_name}</p>
            <p>Is active: {props.is_active}</p>
            <p>Is Superuser: {props.is_superuser}</p>
            <p>Last login: {props.last_login}</p>
        </div>
    )
}

export default User;
