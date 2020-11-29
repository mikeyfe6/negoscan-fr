import React, { useState, useRef } from "react"
import axios from "axios"
import { navigate } from "@reach/router"

import SEO from "../seo"
import { setUser } from "../../services/auth"

import loginStyles from "../../styles/modules/loginStyles.module.scss"

import servImage from "../../images/server.png"

const apiURL = process.env.GATSBY_BASE_URL

const ErrorMessage = ({ text }) => {
  return (
    <div className={loginStyles.logerror}>
      <span>{text}</span>
    </div>
  )
}

const LoadingMessage = ({ text }) => {
  return (
    <div className={loginStyles.loadingmsg}>
      <span>{text}</span>
    </div>
  )
}

export default () => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)
  const usernameRef = useRef()
  const passwordRef = useRef()

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const { data } = await axios.post(`${apiURL}/auth/local`, {
        identifier: usernameRef.current.value,
        password: passwordRef.current.value,
      })
      setUser(data)
      setLoading("Aan het laden")
      setError(null)
      navigate("/admin/account")
    } catch {
      setLoading(null)
      setError("Verkeerde invoer, probeer 't opnieuw")
      setTimeout(() => setError(null), 5000)
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
        className={`${loginStyles.container} ${loginStyles.negoform}`}
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
                className={loginStyles.negoinput}
              />
            </label>
          </div>
          {error && <ErrorMessage text={error} />}
          {loading && <LoadingMessage text={loading} />}
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
