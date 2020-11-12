import React, { useState, useRef } from "react"
import axios from "axios"
import { navigate } from "@reach/router"

import SEO from "../seo"
import { setUser } from "../../services/auth"

const ErrorMessage = ({ text }) => {
  return (
    <div>
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
    <main>
      <SEO title="Login" />
      {error && <ErrorMessage text={error} />}
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Loginsysteem</legend>
          <div>
            <label htmlFor="username">
              Username
              <input
                ref={usernameRef}
                type="text"
                name="username"
                id="username"
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password
              <input
                ref={passwordRef}
                type="password"
                name="password"
                id="password"
              />
            </label>
          </div>
        </fieldset>
        <div>
          <input type="submit" value="Login" />
        </div>
        <div>
          <p>Weet niet wat dit betekent, maar denk inloggen..</p>
        </div>
        <div>
          <p>Nog geen account, klik hier om aan te melden..</p>
        </div>
      </form>
    </main>
  )
}
