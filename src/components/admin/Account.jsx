import React from "react"
import { navigate } from "@reach/router"
import { getUser, logout } from "../../services/auth"

import accountStyles from "../../styles/modules/accountStyles.module.scss"

export default () => {
  const gatsbyUser = getUser()

  return (
    <div
      classname={`${accountStyles.checkums} ${accountStyles.p5} ${accountStyles.flex}`}
    >
      <div classname={accountStyles.checkums}>
        Welkom {gatsbyUser.user.username}!
        <br />
        <br />
        {gatsbyUser.user.email}
        <br />
        <br />
        {gatsbyUser.user.gebruiker.profiel}
        <br />
        <br />
        <div className={accountStyles.textings}>
          {gatsbyUser.user.gebruiker.linklook}
        </div>
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
      <div className={accountStyles.textings}>laaa</div>
    </div>
  )
}
