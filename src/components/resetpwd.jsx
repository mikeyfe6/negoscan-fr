import React, { useState, useRef } from "react"
import axios from "axios"
import { navigate } from "@reach/router"

import loginStyles from "../styles/modules/loginStyles.module.scss"
import resetStyles from "../styles/modules/resetStyles.module.scss"

const apiURL = process.env.GATSBY_BASE_URL

const ErrorMessage = ({ text }) => {
  return (
    <div className={resetStyles.logerror}>
      <span>{text}</span>
    </div>
  )
}

const LoadingMessage = ({ text }) => {
  return (
    <div className={resetStyles.loadingmsg}>
      <span>{text}</span>
    </div>
  )
}

export default () => {
  const confCodeRef = useRef()
  const passwordResetRef = useRef()
  const confPasswordResetRef = useRef()

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)

  const handleSubmitRegister = async e => {
    e.preventDefault()

    if (passwordResetRef !== confPasswordResetRef) {
      setError("Wachtwoorden zijn niet gelijk, probeer 't opnieuw")
      setTimeout(() => setError(null), 5000)
    } else {
      try {
        await axios.post(`${apiURL}/auth/reset-password`, {
          code: confCodeRef.current.value,
          password: passwordResetRef.current.value,
          passwordConfirmation: confPasswordResetRef.current.value,
        })
        setLoading("Aan het laden")
        setError(null)
        navigate("/admin/login")
      } catch {
        setLoading(null)
        setError("Verkeerde invoer, probeer 't opnieuw")
        setTimeout(() => setError(null), 5000)
      }
    }

    // try {
    //   await axios.post(`${apiURL}/auth/reset-password`, {
    //     code: confCodeRef.current.value,
    //     password: passwordResetRef.current.value,
    //     passwordConfirmation: confPasswordResetRef.current.value,
    //   })
    //   setLoading("Aan het laden")
    //   setError(null)
    //   navigate("/admin/login")
    // } catch {
    //   setLoading(null)
    //   setError("Verkeerde invoer, probeer 't opnieuw")
    //   setTimeout(() => setError(null), 5000)
    // }
  }

  return (
    <>
      <form onSubmit={handleSubmitRegister} className={resetStyles.inputRes}>
        <input
          ref={confCodeRef}
          size="35"
          type="text"
          name="code"
          placeholder="Verificatiecode"
          //   pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          //   title="Moet op z'n minst 1 nummer, 1 hoofdletter, 1 klein letter en 8 karakters lang zijn."
        />{" "}
        <br />
        <input
          ref={passwordResetRef}
          size="35"
          type="password"
          name="password"
          placeholder="Voer een nieuw wachtwoord in"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Moet op z'n minst 1 nummer, 1 hoofdletter, 1 klein letter en 8 karakters lang zijn."
        />{" "}
        <br />
        <input
          ref={confPasswordResetRef}
          size="35"
          type="password"
          name="confirmpassword"
          placeholder="Voer jouw nieuwe wachtwoord opnieuw in"
          //   pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          //   title="Moet op z'n minst 1 nummer, 1 hoofdletter, 1 klein letter en 8 karakters lang zijn."
        />{" "}
        <br />
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
