import React, { useState, useRef } from "react"
import axios from "axios"
import { navigate } from "@reach/router"

import SEO from "../seo"
import { setUser } from "../../services/auth"

import loginStyles from "../../styles/modules/loginStyles.module.scss"

import servImage from "../../images/server.png"

const ErrorMessage = ({ text }) => {
  return (
    <div className={loginStyles.logerror}>
      <title>info icon</title>

      <span>{text}</span>
    </div>
  )
}

export default () => {
  const [error, setError] = useState(null)
  const usernameRef = useRef()
  const passwordRef = useRef()

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const { data } = await axios.post("http://localhost:1337/auth/local", {
        identifier: usernameRef.current.value,
        password: passwordRef.current.value,
      })
      setUser(data)
      setError(null)
      navigate("/admin/account")
    } catch {
      setError("Errorr MF'er")
    }
  }

  return (
    <div>
      <SEO title="Login" />
      <section
        className={`${loginStyles.docsHead} ${loginStyles.bgPrimary} ${loginStyles.py3}`}
      >
        <div className={`${loginStyles.container} ${loginStyles.grid}`}>
          <div>
            <h1 className={loginStyles.xl}>Login / Register</h1>
            <p className={loginStyles.lead}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam quo
              quae assumenda.
            </p>
          </div>
          <img src={servImage} alt="" />
        </div>
      </section>

      <form
        onSubmit={handleSubmit}
        className={`${loginStyles.container} ${loginStyles.p5} ${loginStyles.negoform}`}
      >
        <fieldset>
          <legend className={`${loginStyles.p1}`}>
            Vul hier je gegevens in...
          </legend>
          <div className={`${loginStyles.formControl} ${loginStyles.p1}`}>
            <label htmlFor="username">
              Username <br />
              <input
                ref={usernameRef}
                type="text"
                name="username"
                id="username"
                size="50"
                className={loginStyles.negoinput}
              />
            </label>
          </div>
          <div className={`${loginStyles.formControl} ${loginStyles.p1}`}>
            <label htmlFor="password">
              Password <br />
              <input
                ref={passwordRef}
                type="password"
                name="password"
                id="password"
                size="50"
                className={loginStyles.negoinput}
              />
            </label>
          </div>
          {error && <ErrorMessage text={error} />}
        </fieldset>
        <br />
        <div>
          <input
            type="submit"
            value="Login"
            className={`${loginStyles.btn} ${loginStyles.btnPrimary}`}
          />
        </div>
        <div>
          <p>Nog geen account, klik hier om aan te melden..</p>
        </div>
      </form>
    </div>
  )
}
