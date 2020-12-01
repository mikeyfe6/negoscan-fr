import React, { useState, useRef, useEffect } from "react"
import axios from "axios"
import { FaLock, FaAt, FaUser } from "react-icons/fa"

import { navigate } from "@reach/router"
import { getUser, logout } from "../../services/auth"

import accountStyles from "../../styles/modules/accountStyles.module.scss"

import noavatar from "../../images/noavatar.png"

const apiURL = process.env.GATSBY_BASE_URL

const ErrorMessage = ({ text }) => {
  return (
    <div className={accountStyles.logerror}>
      <span>{text}</span>
    </div>
  )
}

export default () => {
  const gatsbyUser = getUser()
  const apiImage = gatsbyUser.user.gebruiker.avatar.url

  const [image, setImage] = useState()
  const [preview, setPreview] = useState(apiImage)
  const fileInputRef = useRef()
  const [loading, setLoading] = useState(false)

  const linkTitle = useRef()
  const [links, setLinks] = useState([])

  const [error, setError] = useState(null)

  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const [disabledUsername, setDisabledUsername] = useState(true)
  const [disabledEmail, setDisabledEmail] = useState(true)
  const [disabledPassword, setDisabledPassword] = useState(true)

  const [color, setColor] = useState()

  const token = gatsbyUser.jwt

  // AVATAR CHANGE - BEGIN
  function removeHeading() {
    document.getElementById("avatar-image").src = noavatar
    document.getElementById("iphone-avatar").src = noavatar
  }

  // SEND AVATAR - BEGIN
  const handleSubmit = async e => {
    e.preventDefault()

    try {
      setLoading(true)
      setImage(image)
      const data = new FormData()
      data.append("files", image)
      data.append("ref", "negosite") // optional, you need it if you want to link the image to an entry
      data.append("refId", gatsbyUser.user.id) // optional, you need it if you want to link the image to an entry
      data.append("field", "avatar") // optional, you need it if you want to link the image to an entry

      const upload_res = await axios.post(`${apiURL}/upload`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      console.log("Geupload!", upload_res)
      setTimeout(() => setLoading(false), 5000)
    } catch (error) {
      console.log("Niet gelukt!", error)
    }
  }

  useEffect(() => {
    if (image) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(image)
    } else {
      // setPreview(apiImage)
    }
  }, [image, apiImage])

  // UPDATE PROFILE - USERNAME
  const getUsername = async () => {
    const res = await axios.get(
      `${apiURL}/negosites/${gatsbyUser.user.gebruiker.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    setUsername(res.data.profiel)
  }

  useEffect(() => {
    getUsername()
  }, [])

  const setUsernameHandler = e => {
    setUsername(e.target.value)
  }

  const submitUsername = async e => {
    e.preventDefault()

    const params = {
      profiel: username,
    }
    try {
      const res = await axios.put(
        `${apiURL}/negosites/${gatsbyUser.user.gebruiker.id}`,
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setUsername(res.data.profiel)
    } catch (err) {
      console.log(err.message)
      setError("Errorrrr")
      setTimeout(() => setError(null), 5000)
    }
  }

  // UPDATE PROFILE - EMAIL
  const getEmail = async () => {
    const res = await axios.get(
      `${apiURL}/users/${gatsbyUser.user.gebruiker.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    setEmail(res.data.email)
  }

  useEffect(() => {
    getEmail()
  }, [])

  const setEmailHandler = e => {
    setEmail(e.target.value)
  }

  const submitEmail = async e => {
    e.preventDefault()

    const params = {
      email: email,
    }
    try {
      const res = await axios.put(
        `${apiURL}/users/${gatsbyUser.user.gebruiker.id}`,
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setUsername(res.data.email)
    } catch (err) {
      console.log(err.message)
      // setTimeout(() => setError(null), 5000)
    }
  }

  // UPDATE PROFILE - PASSWORD
  const setPasswordHandler = e => {
    setPassword(e.target.value)
  }

  const submitPassword = async e => {
    e.preventDefault()

    const params = {
      password: password,
    }
    try {
      const res = await axios.put(
        `${apiURL}/users/${gatsbyUser.user.gebruiker.id}`,
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log(res)
    } catch (err) {
      console.log(err.message)
      // setTimeout(() => setError(null), 5000)
    }
  }

  // CREATE LINKS - BEGIN
  useEffect(() => {
    getLinks()
  }, [])

  const getLinks = async () => {
    const res = await axios.get(`${apiURL}/connections`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setLinks(res.data)
  }

  const createLink = async () => {
    const params = {
      title: linkTitle.current.value,
    }
    const res = await axios.post(`${apiURL}/connections`, params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const newLinks = [...links, res.data]
    setLinks(newLinks)
  }

  const toggleLink = async (link, checked) => {
    const params = {
      visible: checked,
    }
    const res = await axios.put(`${apiURL}/connections/${link.id}`, params)

    const newLinks = links.map(l => {
      if (l.id === link.id) {
        return res.data
      }
      return l
    })
    setLinks(newLinks)
  }

  // CHANGE BACKGROUND - BEGIN
  // function changeHeadingBg(klasse) {
  //   document.getElementById("iphone-bg").className = klasse
  // }

  const onRadioChange = async e => {
    setColor(e.target.value)

    const params = {
      bgfree: e.target.value,
    }
    await axios
      .put(`${apiURL}/negosites/${gatsbyUser.user.gebruiker.id}`, params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error.response.data.message)
      })
  }

  function changeHeadingBg(color) {
    switch (color) {
      case "geel":
        document.getElementById("iphone-bg").className =
          accountStyles.yellowstyle
        break
      case "grijs":
        document.getElementById("iphone-bg").className = accountStyles.graystyle
        break
      case "roze":
        document.getElementById("iphone-bg").className = accountStyles.pinkstyle
        break
      case "zwart":
        document.getElementById("iphone-bg").className =
          accountStyles.blackstyle
        break
      case "bruin":
        document.getElementById("iphone-bg").className =
          accountStyles.brownstyle
        break
      default:
    }
  }

  useEffect(() => {
    getColor()
  }, [])

  const getColor = async () => {
    const res = await axios.get(
      `${apiURL}/negosites/${gatsbyUser.user.gebruiker.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    setColor(res.data.bgfree)
    changeHeadingBg(res.data.bgfree)
  }

  console.log("bgfreecolor", color)

  return (
    <div className={`${accountStyles.gridContainer} ${accountStyles.card}`}>
      {/* SIDEBAR SIDEBAR SIDEBAR SIDEBAR SIDEBAR */}

      <div
        className={`${accountStyles.Sidebar} ${accountStyles.card}`}
        style={{
          position: "relative",
        }}
      >
        <p
          style={{
            textAlign: "center",
          }}
        >
          Welkom {gatsbyUser.user.username}!
        </p>

        <button
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
          }}
          className={accountStyles.btn}
          href="#"
          onClick={e => {
            e.preventDefault()
            logout(() => navigate("/admin/login"))
          }}
        >
          Logout
        </button>
      </div>

      {/* NAVIGATION NAVIGATION NAVIGATION NAVIGATION NAVIGATION*/}
      <div className={`${accountStyles.Navigation} ${accountStyles.card}`}>
        {" "}
        NAVIGATION
      </div>

      {/* PREVIEW PREVIEW PREVIEW PREVIEW PREVIEW */}
      <div className={`${accountStyles.Preview} ${accountStyles.card}`}>
        <div className={accountStyles.iphoneFrame}>
          {" "}
          <img
            src={preview}
            alt=""
            className={accountStyles.iphoneAvatar}
            id="iphone-avatar"
          />
          <div
            id="iphone-bg"
            className={accountStyles.iphoneBackground}
            style={{
              position: "relative",
              width: "100vh",
              height: "100%",
              zindex: 1,
            }}
          />
          <div>
            <ul className={accountStyles.iphoneLinks}>
              {links.map(link => (
                <li
                  key={link.id}
                  style={{ background: "red" }}
                  className={accountStyles.iphoneLink}
                >
                  {link.title}
                </li>
              ))}
            </ul>
          </div>
          {/* <img
            src={gatsbyUser.user.gebruiker.background.url}
            alt=""
            className={accountStyles.iphoneBg}
          />{" "} */}
        </div>
      </div>

      {/* DASHBOARD DASHBOARD DASHBOARD DASHBOARD DASHBOARD */}
      <div
        className={`${accountStyles.Dashboard} ${accountStyles.p3} ${accountStyles.card}`}
      >
        <br />
        <div className={accountStyles.avatarformcont}>
          {loading && (
            <div style={{ color: "green" }}>Profielavatar Geupload</div>
          )}

          <form onSubmit={handleSubmit} className={accountStyles.formavatar}>
            <img
              src={preview}
              alt=""
              className={accountStyles.avatarImage}
              id="avatar-image"
            />{" "}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <button
                className={`${accountStyles.btn} ${accountStyles.addBtn}`}
                onClick={event => {
                  event.preventDefault()
                  fileInputRef.current.click()
                }}
              >
                {" "}
                Add image
              </button>
              <button
                className={`${accountStyles.btn} ${accountStyles.btnLight} ${accountStyles.resetBtn}`}
                type="reset"
                onClick={event => {
                  removeHeading()
                  event.preventDefault()
                }}
              >
                Reset
              </button>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={event => {
                  const file = event.target.files[0]
                  if (file && file.type.substring(0, 5) === "image") {
                    setImage(file)
                  } else {
                    setImage(null)
                  }
                }}
              />
              <button
                className={`${accountStyles.btn} ${accountStyles.btnSecondary} ${accountStyles.submitBtn}`}
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>

          <div className={accountStyles.profileInfo}>
            <form onSubmit={submitUsername}>
              <p>
                <label htmlFor="username">
                  <FaUser
                    size="1.25em"
                    style={{
                      position: "relative",
                      top: "7.5px",
                      right: "5px",
                      marginRight: "5px",
                    }}
                  />
                  <input
                    onChange={setUsernameHandler}
                    value={username}
                    type="text"
                    disabled={disabledUsername}
                    name="username"
                    id="username"
                    className={accountStyles.profileInput}
                  />
                </label>
                <button
                  style={{
                    marginRight: "5px",
                    paddingTop: "7.5px",
                    paddingBottom: "7.5px",
                  }}
                  className={`${accountStyles.btn} ${accountStyles.btnLight}`}
                  type="button"
                  onClick={() => setDisabledUsername(false)}
                >
                  Edit
                </button>
                <button
                  className={`${accountStyles.btn} ${accountStyles.btnSecondary}`}
                  type="submit"
                  style={{
                    paddingTop: "7.5px",
                    paddingBottom: "7.5px",
                  }}
                >
                  Save Username
                </button>

                {error && <ErrorMessage text={error} />}
              </p>
            </form>

            <form onSubmit={submitEmail}>
              <p>
                <label htmlFor="email">
                  <FaAt
                    size="1.25em"
                    style={{
                      position: "relative",
                      top: "7.5px",
                      right: "5px",
                      marginRight: "5px",
                    }}
                  />
                  <input
                    onChange={setEmailHandler}
                    value={email}
                    type="email"
                    disabled={disabledEmail}
                    name="email"
                    id="email"
                    className={accountStyles.profileInput}
                  />
                </label>
                <button
                  style={{
                    marginRight: "5px",
                    paddingTop: "7.5px",
                    paddingBottom: "7.5px",
                  }}
                  className={`${accountStyles.btn} ${accountStyles.btnLight}`}
                  type="button"
                  onClick={() => setDisabledEmail(false)}
                >
                  Edit
                </button>
                <button
                  className={`${accountStyles.btn} ${accountStyles.btnSecondary} ${accountStyles.submitBtn}`}
                  type="submit"
                  style={{
                    paddingTop: "7.5px",
                    paddingBottom: "7.5px",
                  }}
                >
                  Save Email
                </button>
                {error && <ErrorMessage text={error} />}
              </p>
            </form>

            <form onSubmit={submitPassword}>
              <div>
                <label htmlFor="password">
                  <FaLock
                    size="1.25em"
                    style={{
                      position: "relative",
                      top: "7.5px",
                      right: "5px",
                      marginRight: "5px",
                    }}
                  />
                  <input
                    onChange={setPasswordHandler}
                    value={password}
                    placeholder="*********"
                    type="password"
                    disabled={disabledPassword}
                    name="password"
                    id="password"
                    className={accountStyles.profileInput}
                  />
                </label>
                <button
                  style={{
                    marginRight: "5px",
                    paddingTop: "7.5px",
                    paddingBottom: "7.5px",
                  }}
                  className={`${accountStyles.btn} ${accountStyles.btnLight}`}
                  type="button"
                  onClick={() => setDisabledPassword(false)}
                >
                  Edit
                </button>
                <button
                  className={`${accountStyles.btn} ${accountStyles.btnSecondary} ${accountStyles.submitBtn}`}
                  type="submit"
                  style={{
                    paddingTop: "7.5px",
                    paddingBottom: "7.5px",
                  }}
                >
                  Update Password
                </button>
                {error && <ErrorMessage text={error} />}
              </div>
            </form>
          </div>

          <br />
        </div>
        <br /> <br /> <br />
        <p>
          <b>COLOR BORDERS :</b> {gatsbyUser.user.gebruiker.linklook}
        </p>
        <p>
          <b>FACEBOOK :</b> {gatsbyUser.user.gebruiker.sociallinks.facebook}
        </p>
        <p>
          <b>TWITTER :</b> {gatsbyUser.user.gebruiker.sociallinks.twitter}
        </p>
        <p>
          {" "}
          <b>INSTAGRAM :</b> {gatsbyUser.user.gebruiker.sociallinks.instagram}
        </p>
        <br />
        <div>
          <h2>Link list:</h2>
          <ul>
            {links.map(link => (
              <li key={link.id} className={accountStyles.card}>
                <input
                  type="checkbox"
                  checked={link.visible}
                  onChange={e => toggleLink(link, e.target.checked)}
                />
                {link.title}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <input type="text" placeholder="title" ref={linkTitle} />
          <button
            onClick={event => {
              createLink()
              event.preventDefault()
            }}
          >
            Create a link
          </button>
        </div>
        <br />
        <br />
        <ul
          style={{ display: "flex", justifyContent: "space-around" }}
          className={accountStyles.pickColor}
        >
          {/* <li>
            <label>
              <input
                type="radio"
                value="roze"
                checked={color === "roze"}
                onChange={onRadioChange}
                onClick={event => {
                  changeHeadingBg(accountStyles.redstyle)
                  event.preventDefault()
                }}
                style={{ display: "none" }}
              />
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  background: "red",
                  border: "solid 1px black",
                  borderRadius: "10px",
                }}
              ></div>
            </label>
          </li> */}

          <li className={accountStyles.chooseColor}>
            <label>
              <input
                type="radio"
                value="geel"
                checked={color === "geel"}
                onChange={onRadioChange}
                onClick={event => {
                  changeHeadingBg("geel")
                  event.preventDefault()
                }}
                style={{ display: "none" }}
              />
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  background: "yellow",
                  border: "solid 1px black",
                  borderRadius: "10px",
                }}
              ></div>
            </label>
          </li>

          <li className={accountStyles.chooseColor}>
            <label>
              <input
                type="radio"
                value="grijs"
                checked={color === "grijs"}
                onChange={onRadioChange}
                onClick={event => {
                  changeHeadingBg("grijs")
                  event.preventDefault()
                }}
                style={{ display: "none" }}
              />
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  background: "gray",
                  border: "solid 1px black",
                  borderRadius: "10px",
                }}
              ></div>
            </label>
          </li>

          <li className={accountStyles.chooseColor}>
            <label>
              <input
                type="radio"
                value="roze"
                checked={color === "roze"}
                onChange={onRadioChange}
                onClick={event => {
                  changeHeadingBg("roze")
                  event.preventDefault()
                }}
                style={{ display: "none" }}
              />
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  background: "pink",
                  border: "solid 1px black",
                  borderRadius: "10px",
                }}
              ></div>
            </label>
          </li>

          <li className={accountStyles.chooseColor}>
            <label>
              <input
                type="radio"
                value="zwart"
                checked={color === "zwart"}
                onChange={onRadioChange}
                onClick={event => {
                  changeHeadingBg("zwart")
                  event.preventDefault()
                }}
                style={{ display: "none" }}
              />
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  background: "black",
                  border: "solid 1px black",
                  borderRadius: "10px",
                }}
              ></div>
            </label>
          </li>

          <li className={accountStyles.chooseColor}>
            <label>
              <input
                type="radio"
                value="bruin"
                checked={color === "bruin"}
                onChange={onRadioChange}
                onClick={event => {
                  changeHeadingBg("bruin")
                  event.preventDefault()
                }}
                style={{ display: "none" }}
              />
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  background: "brown",
                  border: "solid 1px black",
                  borderRadius: "10px",
                }}
              ></div>
            </label>
          </li>
        </ul>
      </div>

      {/* LINK LINK LINK LINK LINK */}

      <div className={`${accountStyles.Link} ${accountStyles.card}`}>LINK</div>
    </div>
  )
}
