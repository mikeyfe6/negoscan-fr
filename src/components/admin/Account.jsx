import React from "react"
import { navigate } from "@reach/router"
import { getUser, logout } from "../../services/auth"

export default () => {
  const gatsbyUser = getUser()

  return (
    <div>
      Welkom {gatsbyUser.user.username}!
      <br />
      <br />
      {gatsbyUser.user.email}
      <br />
      <br />
      {gatsbyUser.user.gebruiker.profiel}
      <br />
      <br />
      {gatsbyUser.user.gebruiker.linklook}
      <br />
      <br />
      <img
        src={gatsbyUser.user.gebruiker.avatar.url}
        alt=""
        style={{ width: "100px", height: "100px" }}
      />
      <br />
      <br />
      <img
        src={gatsbyUser.user.gebruiker.background.url}
        alt=""
        style={{ width: "100px", height: "100px" }}
      />
      <button
        href="#"
        onClick={e => {
          e.preventDefault()
          logout(() => navigate("/"))
        }}
      >
        Logout
      </button>
      <br />
    </div>
  )
}
