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

  const [image, setImage] = useState()
  const [preview, setPreview] = useState()
  const fileInputRef = useRef()
  const [loading, setLoading] = useState(false)

  const linkTitle = useRef()
  const [newLink, setNewLink] = useState()

  const [links, setLinks] = useState([])

  const [error, setError] = useState(null)

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [disabledUsername, setDisabledUsername] = useState(true)
  const [disabledEmail, setDisabledEmail] = useState(true)
  const [disabledPassword, setDisabledPassword] = useState(true)

  const [color, setColor] = useState()

  const token = gatsbyUser.jwt

  // AVATAR CHANGE
  function removeHeading() {
    document.getElementById("avatar-image").src = noavatar
    document.getElementById("iphone-avatar").src = noavatar
  }

  // SEND AVATAR
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

      const res = await axios.post(`${apiURL}/upload`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      console.log("Geupload!", res)
      setTimeout(() => setLoading(false), 5000)
      setPreview(image)
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
    }
  }, [image])

  useEffect(() => {
    const getAvatarImage = async () => {
      const res = await axios.get(
        `${apiURL}/negosites/${gatsbyUser.user.gebruiker.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setPreview(res.data.avatar.url)
    }
    getAvatarImage()
  }, [gatsbyUser.user.gebruiker.id, token])

  // UPDATE PROFILE - USERNAME

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

  useEffect(() => {
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
    getUsername()
  }, [gatsbyUser.user.gebruiker.id, token])

  // UPDATE PROFILE - EMAIL

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
      setEmail(res.data.email)
    } catch (err) {
      console.log(err.message)
      // setTimeout(() => setError(null), 5000)
    }
  }

  useEffect(() => {
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
    getEmail()
  }, [gatsbyUser.user.gebruiker.id, token])

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

  // CREATE LINKS
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

    const newLinks = links.map(el => {
      if (el.id === link.id) {
        return res.data
      }
      return el
    })
    setLinks(newLinks)
  }

  const deleteLink = async link => {
    await axios.delete(`${apiURL}/connections/${link.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setLinks(links.filter(el => el.id !== link.id))
  }

  // const handleNewLinkChange = e => {
  // }

  const handleNewLink = link => {
    setNewLink(link)
  }

  const editLink = async (e, link) => {
    // console.log("shows newlinks", newLinks)
    // const params = {
    //   title: editlinkTitle.current.value,
    // }
    // const res = await axios.put(`${apiURL}/connections/${link.id}`, params, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // })
    // console.log(res)
    // setLinks(res.data.title)
  }

  useEffect(() => {
    const getLinks = async () => {
      const res = await axios.get(`${apiURL}/connections`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setLinks(res.data)
    }
    getLinks()
  }, [token])

  // CHANGE BACKGROUND
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
    var c = document.getElementById("iphone-linklook").children
    var i
    switch (color) {
      case "geel":
        document.getElementById("iphone-bg").className =
          accountStyles.yellowstyle
        for (i = 0; i < c.length; i++) {
          c[i].className = accountStyles.yellowstyleLinks
        }
        break
      case "grijs":
        document.getElementById("iphone-bg").className = accountStyles.graystyle
        for (i = 0; i < c.length; i++) {
          c[i].className = accountStyles.graystyleLinks
        }
        break
      case "roze":
        document.getElementById("iphone-bg").className = accountStyles.pinkstyle
        for (i = 0; i < c.length; i++) {
          c[i].className = accountStyles.pinkstyleLinks
        }
        break
      case "zwart":
        document.getElementById("iphone-bg").className =
          accountStyles.blackstyle
        for (i = 0; i < c.length; i++) {
          c[i].className = accountStyles.blackstyleLinks
        }
        break
      case "bruin":
        document.getElementById("iphone-bg").className =
          accountStyles.brownstyle
        for (i = 0; i < c.length; i++) {
          c[i].className = accountStyles.brownstyleLinks
        }
        break
      default:
    }
  }

  useEffect(() => {
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
    getColor()
    changeHeadingBg()
  }, [gatsbyUser.user.gebruiker.id, token, links])

  // function changeHeadingBg(klasse) {
  //   document.getElementById("iphone-bg").className = klasse
  // }

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
            <ul className={accountStyles.iphoneLinks} id="iphone-linklook">
              {links.map(link => (
                <li key={link.id} className={accountStyles.iphoneLink}>
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
          <form onSubmit={handleSubmit} className={accountStyles.formavatar}>
            <div>
              <img
                src={preview}
                alt=""
                className={accountStyles.avatarImage}
                id="avatar-image"
              />{" "}
              {loading && (
                <div className={accountStyles.loadingComplete}>
                  Profielavatar Geupload
                </div>
              )}
            </div>

            <div className={accountStyles.buttonsenzo}>
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
              <label htmlFor="username">
                <FaUser
                  size="1.5em"
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
            </form>

            <form onSubmit={submitEmail}>
              <p>
                <label htmlFor="email">
                  <FaAt
                    size="1.5em"
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
                    size="1.5em"
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
          <input
            type="text"
            placeholder="title"
            ref={linkTitle}
            minLength="5"
            required
          />
          <button
            onClick={event => {
              createLink()
              event.preventDefault()
            }}
          >
            Create a link
          </button>
          <ul>
            {links.map(link => (
              <li
                key={link.id}
                className={`${accountStyles.linkContainer} ${accountStyles.card}`}
              >
                <input
                  type="checkbox"
                  checked={link.visible}
                  onChange={e => toggleLink(link, e.target.checked)}
                />
                <p> {link.title}</p>
                <div>
                  <input
                    id={link.id}
                    key={link.id}
                    type="text"
                    value={newLink}
                    onChange={e => {
                      handleNewLink(e.target.value[link])
                      console.log(e.target.value)
                    }}
                    placeholder="edit title"
                    minLength="5"
                    required
                  />
                  <button
                    onClick={event => {
                      editLink(link)
                      console.log(newLink)
                      event.preventDefault()
                    }}
                  >
                    Edit Link {link.id}
                  </button>
                  <button
                    onClick={event => {
                      deleteLink(link)
                      event.preventDefault()
                    }}
                  >
                    Delete Link {link.id}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <br />
        <br />
        <ul
          style={{ display: "flex", justifyContent: "space-around" }}
          className={accountStyles.pickColor}
        >
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
              <div className={accountStyles.yellowtheme}>
                <div className={accountStyles.yellowlinks} />
                <div className={accountStyles.yellowlinks} />
                <div className={accountStyles.yellowlinks} />
              </div>
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
              <div className={accountStyles.graytheme}>
                <div className={accountStyles.graylinks} />
                <div className={accountStyles.graylinks} />
                <div className={accountStyles.graylinks} />
              </div>
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
              <div className={accountStyles.pinktheme}>
                <div className={accountStyles.pinklinks} />
                <div className={accountStyles.pinklinks} />
                <div className={accountStyles.pinklinks} />
              </div>
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
              <div className={accountStyles.blacktheme}>
                <div className={accountStyles.blacklinks} />
                <div className={accountStyles.blacklinks} />
                <div className={accountStyles.blacklinks} />
              </div>
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
              <div className={accountStyles.browntheme}>
                <div className={accountStyles.brownlinks} />
                <div className={accountStyles.brownlinks} />
                <div className={accountStyles.brownlinks} />
              </div>
            </label>
          </li>
        </ul>
      </div>

      {/* LINK LINK LINK LINK LINK */}

      <div className={`${accountStyles.Link} ${accountStyles.card}`}>LINK</div>
    </div>
  )
}
