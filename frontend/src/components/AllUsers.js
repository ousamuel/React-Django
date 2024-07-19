"use client";
import React, { Component, useEffect } from "react";
import axios from "axios";
import { Image, Avatar } from "@nextui-org/react";

let DB_HOST = process.env.NEXT_PUBLIC_DB;

export default class AllUsers extends Component {
  state = {
    users: [],
  };

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = () => {
    console.log(DB_HOST);
    axios.get(`${DB_HOST}/users/`).then((res) => {
      const users = res.data;
      console.log(res.data);
      this.setState({ users });
    });
  };
  componentDidUpdate(prevProps) {
    if (prevProps.refreshUsers !== this.props.refreshUsers) {
      this.fetchUsers();
    }
  }

  handleDelete = (id) => {
    axios.delete(`${DB_HOST}/users/${id}/`).then((res) => this.fetchUsers());
  };
  render() {
    return (
      <div>

      <div className="flex justify-center py-4">
        {this.state.users.map((user) => (
          <a className='m-2'href={user.linkedin}>
            <Avatar name={user.name} />
          </a>
        ))}
        </div>
      </div>
    );
  }
}
