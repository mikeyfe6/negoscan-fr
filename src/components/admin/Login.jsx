import React, { useState, useRef } from "react"
import { useStaticQuery, graphql } from "gatsby"
import axios from "axios"
import { navigate } from "@reach/router"

import useDigitInput from "react-digit-input"

// import SEO from "../seo"
import { setUser } from "../../services/auth"

import loginStyles from "../../styles/modules/loginStyles.module.scss"

import servImage from "../../images/server.png"

import negoLogo from "../../../static/Negoscan-logo.png"

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
  const vericode = useStaticQuery(graphql`
    query NegoCode {
      allStrapiNegosite {
        edges {
          node {
            negocode
          }
        }
      }
    }
  `)

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)

  const usernameRef = useRef()
  const passwordRef = useRef()
  // const storecodeRef = useRef()

  const usernameRegRef = useRef()
  const emailRegRef = useRef()
  const passwordRegRef = useRef()

  const [value, onChange] = useState("")
  const digits = useDigitInput({
    acceptedCharacters: /^[0-9]$/,
    length: 7,
    value,
    onChange,
  })

  // const signUpButton = document.getElementById("signUp")
  // const signInButton = document.getElementById("signIn")

  const signUpHandler = e => {
    const container = document.getElementById("container")
    container.classList.add(loginStyles.rightPanelActive)
    e.preventDefault()
  }

  const signInHandler = e => {
    const container = document.getElementById("container")
    container.classList.remove(loginStyles.rightPanelActive)
    e.preventDefault()
  }

  const handleSubmitLogin = async e => {
    e.preventDefault()

    let negocodes = vericode.allStrapiNegosite.edges.map(
      edge => edge.node.negocode
    )

    if (negocodes.includes(parseInt(value))) {
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
    setError("Onjuiste invoer!")
    setTimeout(() => setError(null), 5000)
  }

  const handleSubmitRegister = async e => {
    e.preventDefault()

    try {
      const { data } = await axios.post(`${apiURL}/auth/local/register`, {
        username: usernameRegRef.current.value,
        email: emailRegRef.current.value,
        password: passwordRegRef.current.value,
      })
      // let negoData = new FormData()
      // formData.append("key1", "value1")
      // formData.append("key2", "value2")

      await axios.post(
        `${apiURL}/negosites`,
        {
          profiel: usernameRegRef.current.value,
        },
        {
          headers: {
            Authorization: `Bearer ${data.jwt}`,
          },
        }
      )

      axios.post(
        "https://api.netlify.com/build_hooks/5fa20c6490bf4b2b591bf2e1",
        {
          headers: {
            Authorization: `Bearer ${data.jwt}`,
          },
        }
      )

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
      <section
        className={`${loginStyles.docsHead} ${loginStyles.bgPrimary} ${loginStyles.py3}`}
      >
        <div className={`${loginStyles.container} ${loginStyles.grid}`}>
          <div>
            <h1 className={loginStyles.xl}>Login / Register</h1>
          </div>
          <img src={servImage} alt="" />
        </div>
      </section>
      <div className={loginStyles.indexBg} />

      <div className={loginStyles.superContainer}>
        <div className={loginStyles.container} id="container">
          <div
            className={`${loginStyles.formContainer} ${loginStyles.signUpContainer}`}
          >
            <img
              src={negoLogo}
              alt=""
              style={{
                width: "50%",
                display: "block",
                margin: "50% auto",
              }}
            />
            <form onSubmit={handleSubmitRegister} style={{ display: "none" }}>
              <h1 style={{ fontSize: "1.5em" }}> Maak een account aan</h1>
              {/* <div className={loginStyles.socialContainer}>
                <a href="" className="social">
                  <i>icon</i>
                </a>
                <a href="" className="social">
                  <i>icon</i>
                </a>
                <a href="" className="social">
                  <i>icon</i>
                </a>
              </div> */}
              <span>vul je email/adress in en kies een wachtwoord</span>
              <input
                ref={usernameRegRef}
                type="text"
                name="usernameReg"
                pattern="[^\s]+"
                placeholder="gebruikersnaam"
              />
              <input
                ref={emailRegRef}
                type="email"
                name="emailReg"
                placeholder="email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              />
              <input
                ref={passwordRegRef}
                type="password"
                name="passwordreg"
                placeholder="wachtwoord"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Moet op z'n minst 1 nummer, 1 hoofdletter, 1 klein letter en 8 karakters lang zijn."
              />
              {error && <ErrorMessage text={error} />}
              {loading && <LoadingMessage text={loading} />}
              <button style={{ cursor: "pointer" }}>Sign Up</button>
            </form>
          </div>
          <div
            className={`${loginStyles.formContainer} ${loginStyles.signInContainer}`}
          >
            <form onSubmit={handleSubmitLogin}>
              <h1> Inloggen </h1>
              {/* <div className={loginStyles.socialContainer}>
                <a href="" className="social">
                  <i>icon</i>
                </a>
                <a href="" className="social">
                  <i>icon</i>
                </a>
                <a href="" className="social">
                  <i>icon</i>
                </a>
              </div> */}
              <span>gebruik je account</span>
              <input
                ref={usernameRef}
                type="text"
                name="username"
                placeholder="email / gebruikersnaam"
                required
              />
              <input
                ref={passwordRef}
                type="password"
                name="password"
                placeholder="wachtwoord"
                required
              />
              {/* <input
                ref={storecodeRef}
                type="text"
                name="storecode"
                placeholder="storecode"
                pattern="\d{1,9}"
              /> */}

              <div
                className={loginStyles.storeCode}
                style={{
                  display: "flex",
                  // flexWrap: "wrap",
                  gap: "7.5px",
                }}
              >
                <input inputMode="decimal" {...digits[0]} />
                <input inputMode="decimal" {...digits[1]} />
                <input inputMode="decimal" {...digits[2]} />
                <input inputMode="decimal" {...digits[3]} />
                <input inputMode="decimal" {...digits[4]} />
                <input inputMode="decimal" {...digits[5]} />
                <input inputMode="decimal" {...digits[6]} />
              </div>
              <b>
                {" "}
                <span>store code</span>
              </b>
              <br />
              {/* <pre>
                <code>"{value}"</code>
              </pre> */}

              {error && <ErrorMessage text={error} />}
              {loading && <LoadingMessage text={loading} />}
              {/* <a href="#">Forget your password</a> */}
              <button style={{ cursor: "pointer" }}>Log in</button>
            </form>
          </div>
          <div className={loginStyles.overlayContainer}>
            <div className={loginStyles.overlay}>
              <div
                className={`${loginStyles.overlayPanel} ${loginStyles.overlayLeft}`}
              >
                <h1 className={loginStyles.signUpTitle}>Welkom</h1>
                <p className={loginStyles.signUpText}>
                  Hier kan je je registeren <br />
                  <br /> Lorem ipsum dolor, sit amet consectetur adipisicing
                  elit. Maiores nihil corporis dolores eaque delectus. <br />
                  <br />
                  Al een account? klik hieronder..
                </p>

                <button
                  style={{ cursor: "pointer" }}
                  className={loginStyles.ghost}
                  id="signIn"
                  onClick={signInHandler}
                >
                  Naar 'Inloggen'
                </button>
              </div>
              <div
                className={`${loginStyles.overlayPanel} ${loginStyles.overlayRight}`}
              >
                <h1 className={loginStyles.signUpTitle}>Welkom Terug</h1>
                <p className={loginStyles.signUpText}>
                  Hier kan je inloggen <br />
                  <br />
                  Lorem ipsum dolor sit amet consectetur apersonal info Lorem,
                  ipsum dolor sit amet consectetur adipisicing elit. <br />
                  <br />
                  Nog geen account? Klik hieronder..
                </p>
                <button
                  style={{ cursor: "pointer" }}
                  className={loginStyles.ghost}
                  id="signUp"
                  onClick={signUpHandler}
                >
                  Naar 'Registreren'
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
