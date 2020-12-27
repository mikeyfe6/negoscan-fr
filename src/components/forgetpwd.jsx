import React, { useState, useRef } from "react"
import axios from "axios"
import { navigate } from "@reach/router"

import loginStyles from "../styles/modules/loginStyles.module.scss"
import forgetStyles from "../styles/modules/forgetStyles.module.scss"

const apiURL = process.env.GATSBY_BASE_URL

const ErrorMessage = ({ text }) => {
  return (
    <div className={forgetStyles.logerror}>
      <span>{text}</span>
    </div>
  )
}

const LoadingMessage = ({ text }) => {
  return (
    <div className={forgetStyles.loadingmsg}>
      <span>{text}</span>
    </div>
  )
}

export default () => {
  const emailResetRef = useRef()

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)

  const handleSubmitRegister = async e => {
    e.preventDefault()

    try {
      await axios.post(`${apiURL}/auth/forgot-password`, {
        email: emailResetRef.current.value,
      })
      setLoading("Aan het laden")
      setError(null)
      navigate("/reset-password")
    } catch {
      setLoading(null)
      setError("Verkeerde invoer, probeer 't opnieuw")
      setTimeout(() => setError(null), 5000)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmitRegister} className={forgetStyles.inputRes}>
        <input
          ref={emailResetRef}
          type="email"
          name="emailRes"
          placeholder="email"
          style={{ textTransform: "lowercase" }}
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
        />
        <button
          className={`${loginStyles.btn} ${loginStyles.addBtn}`}
          style={{
            cursor: "pointer",
            paddingTop: "3px",
            paddingBottom: "3px",
          }}
        >
          Verstuur
        </button>
        {error && <ErrorMessage text={error} />}
        {loading && <LoadingMessage text={loading} />}
      </form>
    </>
  )
}
