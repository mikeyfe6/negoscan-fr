import React, { useState, useRef, useEffect, useLayoutEffect } from "react"
import axios from "axios"
import {
  FaLock,
  FaAt,
  FaUser,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaTrash,
  FaRegEdit,
  FaRegUserCircle,
} from "react-icons/fa"

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

const DoThis = ({ text }) => {
  return (
    <div className={accountStyles.linkErrorStyle}>
      <span>{text}</span>
    </div>
  )
}

export default () => {
  const [userId, setUserId] = useState("")

  const [image, setImage] = useState()
  const [preview, setPreview] = useState()
  const fileInputRef = useRef()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [linkError, setLinkError] = useState(null)

  const [profile, setProfile] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [disabledProfile, setDisabledProfile] = useState(true)
  const [disabledUsername, setDisabledUsername] = useState(true)
  const [disabledEmail, setDisabledEmail] = useState(true)
  const [disabledPassword, setDisabledPassword] = useState(true)

  const [fbLink, setFbLink] = useState("")
  const [twLink, setTwLink] = useState("")
  const [igLink, setIgLink] = useState("")

  const [disabledFbLink, setDisabledFbLink] = useState(true)
  const [disabledTwLink, setDisabledTwLink] = useState(true)
  const [disabledIgLink, setDisabledIgLink] = useState(true)

  const linkTitle = useRef()
  const hyperLink = useRef()
  const [links, setLinks] = useState([])

  const [editLink, setEditLink] = useState("")
  const [editHyperLink, setEditHyperLink] = useState("")

  const [color, setColor] = useState()

  const gatsbyUser = getUser()
  const token = gatsbyUser.jwt

  useLayoutEffect(() => {
    const getUserId = async () => {
      const res = await axios.get(`${apiURL}/users/${gatsbyUser.user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setUserId(res.data.gebruiker.id)
    }
    getUserId()
  }, [gatsbyUser.user.id, token])

  // AVATAR CHANGE <--------------------------------------------------------------------------------> AVATAR CHANGE //
  const removeHeading = () => {
    document.getElementById("avatar-image").src = noavatar
    document.getElementById("iphone-avatar").src = noavatar
  }

  // SEND AVATAR <--------------------------------------------------------------------------------> SEND AVATAR //
  const handleSubmit = async e => {
    e.preventDefault()

    try {
      setLoading(true)
      setImage(image)
      const data = new FormData()
      data.append("files", image)
      data.append("ref", "negosite") // optional, you need it if you want to link the image to an entry
      data.append("refId", userId) // optional, you need it if you want to link the image to an entry
      data.append("field", "avatar") // optional, you need it if you want to link the image to an entry

      const res = await axios.post(`${apiURL}/upload`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
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
      const res = await axios.get(`${apiURL}/negosites/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (res.data.avatar == null) {
        return setPreview(noavatar)
      } else {
        setPreview(res.data.avatar.url)
      }
    }
    getAvatarImage()
  }, [userId, token])

  // UPDATE PROFILENAME <--------------------------------------------------------------------------------> UPDATE PROFILENAME //
  const setProfileHandler = e => {
    setProfile(e.target.value)
  }

  const submitProfile = async e => {
    e.preventDefault()

    const params = {
      username: profile,
    }
    try {
      const res = await axios.put(
        `${apiURL}/users/${gatsbyUser.user.id}`,
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setProfile(res.data.username)
      setDisabledProfile(true)
    } catch (err) {
      console.log(err.message)
      // setTimeout(() => setError(null), 5000)
    }
  }

  useEffect(() => {
    const getProfile = async () => {
      const res = await axios.get(`${apiURL}/users/${gatsbyUser.user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setProfile(res.data.username)
    }
    getProfile()
  }, [gatsbyUser.user.id, token])

  // UPDATE USERNAME <--------------------------------------------------------------------------------> UPDATE USERNAME //

  const setUsernameHandler = e => {
    setUsername(e.target.value)
  }

  const submitUsername = async e => {
    e.preventDefault()

    const params = {
      profiel: username,
    }
    try {
      const res = await axios.put(`${apiURL}/negosites/${userId}`, params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setError(null)
      setUsername(res.data.profiel)
      setDisabledUsername(true)
    } catch (err) {
      console.log(err.message)
      setError("Errorrrr B")
      setTimeout(() => setError(null), 5000)
    }
  }

  useEffect(() => {
    const getUsername = async () => {
      const res = await axios.get(`${apiURL}/negosites/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setUsername(res.data.profiel)
    }
    getUsername()
  }, [userId, token])

  // UPDATE EMAIL <--------------------------------------------------------------------------------> UPDATE EMAIL //
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
        `${apiURL}/users/${gatsbyUser.user.id}`,
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setEmail(res.data.email)
      setDisabledEmail(true)
    } catch (err) {
      console.log(err.message)
      // setTimeout(() => setError(null), 5000)
    }
  }

  useEffect(() => {
    const getEmail = async () => {
      const res = await axios.get(`${apiURL}/users/${gatsbyUser.user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setEmail(res.data.email)
    }
    getEmail()
  }, [gatsbyUser.user.id, token])

  // UPDATE FBLINK <--------------------------------------------------------------------------------> UPDATE FBLINK //
  const setFbHandler = e => {
    setFbLink(e.target.value)
  }

  const submitFB = async e => {
    e.preventDefault()

    const params = {
      facebooklink: fbLink,
    }
    try {
      const res = await axios.put(`${apiURL}/negosites/${userId}`, params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setFbLink(res.data.facebooklink)
      setDisabledFbLink(true)
    } catch (err) {
      console.log(err.message)
      // setTimeout(() => setError(null), 5000)
    }
  }

  useEffect(() => {
    const getFbLink = async () => {
      const res = await axios.get(`${apiURL}/negosites/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setFbLink(res.data.facebooklink)
    }
    getFbLink()
  }, [userId, token])

  // UPDATE TWLINK <--------------------------------------------------------------------------------> UPDATE TWLINK //
  const setTwHandler = e => {
    setTwLink(e.target.value)
  }

  const submitTW = async e => {
    e.preventDefault()

    const params = {
      twitterlink: twLink,
    }
    try {
      const res = await axios.put(`${apiURL}/negosites/${userId}`, params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setTwLink(res.data.twitterlink)
      setDisabledTwLink(true)
    } catch (err) {
      console.log(err.message)
      // setTimeout(() => setError(null), 5000)
    }
  }

  useEffect(() => {
    const getTwLink = async () => {
      const res = await axios.get(`${apiURL}/negosites/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setTwLink(res.data.twitterlink)
    }
    getTwLink()
  }, [userId, token])

  // UPDATE IGLINK <--------------------------------------------------------------------------------> UPDATE IGLINK //
  const setIgHandler = e => {
    setIgLink(e.target.value)
  }

  const submitIG = async e => {
    e.preventDefault()

    const params = {
      instagramlink: igLink,
    }
    try {
      const res = await axios.put(`${apiURL}/negosites/${userId}`, params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setIgLink(res.data.instagramlink)
      setDisabledIgLink(true)
    } catch (err) {
      console.log(err.message)
      // setTimeout(() => setError(null), 5000)
    }
  }

  useEffect(() => {
    const getIgLink = async () => {
      const res = await axios.get(`${apiURL}/negosites/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setIgLink(res.data.instagramlink)
    }
    getIgLink()
  }, [userId, token])

  // UPDATE PASSWORD <--------------------------------------------------------------------------------> UPDATE PASSWORD //
  const setPasswordHandler = e => {
    setPassword(e.target.value)
  }

  const submitPassword = async e => {
    e.preventDefault()

    const params = {
      password: password,
    }
    try {
      await axios.put(`${apiURL}/users/${gatsbyUser.user.id}`, params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setDisabledPassword(true)
    } catch (err) {
      console.log(err.message)
      // setTimeout(() => setError(null), 5000)
    }
  }

  // CREATE LINKS <--------------------------------------------------------------------------------> CREATE LINKS //
  const createLink = async () => {
    if (
      (!linkTitle.current.value && !hyperLink.current.value) ||
      /^\s*$/.test(linkTitle.current.value && hyperLink.current.value)
    ) {
      return [
        setLinkError("Posten mislukt, voer de titel of link correct door.."),
        setTimeout(() => setLinkError(null), 5000),
      ]
    }

    const params = {
      title: linkTitle.current.value,
      hyperlink: hyperLink.current.value,
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
    const res = await axios.put(`${apiURL}/connections/${link.id}`, params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

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

  const handleEditLink = async e => {
    setEditLink(e.target.value)
  }

  const handleEditHyperLink = async e => {
    setEditHyperLink(e.target.value)
  }

  const editTheLink = async link => {
    if (!editLink || /^\s*$/.test(editLink)) {
      return [
        setLinkError("Updaten mislukt, voer de titel correct door.."),
        setTimeout(() => setLinkError(null), 5000),
      ]
    }

    const params = {
      title: editLink,
    }
    const res = await axios.put(`${apiURL}/connections/${link.id}`, params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const newLinks = links.map(el => {
      if (el.id === link.id) {
        return res.data
      }
      return el
    })
    setLinks(newLinks)
    setEditLink("")
  }

  const editTheHyperLink = async link => {
    if (!editHyperLink || /^\s*$/.test(editHyperLink)) {
      return [
        setLinkError("Updaten mislukt, voer de link correct door.."),
        setTimeout(() => setLinkError(null), 5000),
      ]
    }

    const params = {
      hyperlink: editHyperLink,
    }
    const res = await axios.put(`${apiURL}/connections/${link.id}`, params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const newLinks = links.map(el => {
      if (el.id === link.id) {
        return res.data
      }
      return el
    })
    setLinks(newLinks)
    setEditHyperLink("")
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

  // CHANGE BACKGROUND <--------------------------------------------------------------------------------> CHANGE BACKGROUND //
  const onRadioChange = async e => {
    setColor(e.target.value)

    const params = {
      bgfree: e.target.value,
    }
    await axios
      .put(`${apiURL}/negosites/${userId}`, params, {
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

  const changeHeadingBg = color => {
    var c = document.getElementById("iphone-linklook").children
    var i

    switch (color) {
      case "geel":
        document.getElementById("iphone-username").className =
          accountStyles.yellowstyleUsername
        document.getElementById("iphone-iconlook").className =
          accountStyles.yellowstyleIcons
        document.getElementById("iphone-bg").className =
          accountStyles.yellowstyle
        for (i = 0; i < c.length; i++) {
          c[i].className = accountStyles.yellowstyleLinks
        }
        break
      case "grijs":
        document.getElementById("iphone-username").className =
          accountStyles.graystyleUsername
        document.getElementById("iphone-iconlook").className =
          accountStyles.graystyleIcons
        document.getElementById("iphone-bg").className = accountStyles.graystyle
        for (i = 0; i < c.length; i++) {
          c[i].className = accountStyles.graystyleLinks
        }
        break
      case "roze":
        document.getElementById("iphone-username").className =
          accountStyles.pinkstyleUsername
        document.getElementById("iphone-iconlook").className =
          accountStyles.pinkstyleIcons
        document.getElementById("iphone-bg").className = accountStyles.pinkstyle
        for (i = 0; i < c.length; i++) {
          c[i].className = accountStyles.pinkstyleLinks
        }
        break
      case "zwart":
        document.getElementById("iphone-username").className =
          accountStyles.blackstyleUsername
        document.getElementById("iphone-iconlook").className =
          accountStyles.blackstyleIcons
        document.getElementById("iphone-bg").className =
          accountStyles.blackstyle
        for (i = 0; i < c.length; i++) {
          c[i].className = accountStyles.blackstyleLinks
        }
        break
      case "bruin":
        document.getElementById("iphone-username").className =
          accountStyles.brownstyleUsername
        document.getElementById("iphone-iconlook").className =
          accountStyles.brownstyleIcons
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
      const res = await axios.get(`${apiURL}/negosites/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setColor(res.data.bgfree)
      changeHeadingBg(res.data.bgfree)
    }
    getColor()
    changeHeadingBg()
  }, [userId, token, links])

  // function changeHeadingBg(klasse) {
  //   document.getElementById("iphone-bg").className = klasse
  // }

  return (
    <div className={`${accountStyles.gridContainer} ${accountStyles.card}`}>
      {/* SIDEBAR SIDEBAR SIDEBAR SIDEBAR SIDEBAR <--------------------------------------------------------------------------------> SIDEBAR SIDEBAR SIDEBAR SIDEBAR SIDEBAR */}

      <div
        className={`${accountStyles.Sidebar} ${accountStyles.card}`}
        style={{
          position: "relative",
        }}
      >
        <h5
          style={{
            textAlign: "center",
            fontSize: "0.9em",
          }}
        >
          Welkom {gatsbyUser.user.username}!
        </h5>

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

      {/* NAVIGATION NAVIGATION NAVIGATION NAVIGATION NAVIGATION <--------------------------------------------------------------------------------> NAVIGATION NAVIGATION NAVIGATION NAVIGATION NAVIGATION */}
      <div className={`${accountStyles.Navigation} ${accountStyles.card}`}>
        {" "}
        NAVIGATION
      </div>

      {/* PREVIEW PREVIEW PREVIEW PREVIEW PREVIEW <--------------------------------------------------------------------------------> PREVIEW PREVIEW PREVIEW PREVIEW PREVIEW */}
      <div className={`${accountStyles.Preview} ${accountStyles.card}`}>
        <div className={accountStyles.iphoneFrame}>
          {" "}
          <img
            src={preview}
            alt=""
            className={accountStyles.iphoneAvatar}
            id="iphone-avatar"
          />
          <p id="iphone-username" className={accountStyles.iphoneUsername}>
            {username}
          </p>
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
              {links.slice(0, 5).map(link => (
                <li key={link.id} id={`link${link.id}`} hidden={!link.visible}>
                  <a
                    href={`https://${link.hyperlink}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className={accountStyles.iphoneSocials} id="iphone-iconlook">
            <a
              href={`https://${fbLink}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <FaFacebookF size="1.75em" />
            </a>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a
              href={`https://${twLink}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <FaTwitter size="1.75em" />
            </a>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a
              href={`https://${igLink}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <FaInstagram size="1.75em" />
            </a>
          </div>
          {/* <img
            src={gatsbyUser.user.gebruiker.background.url}
            alt=""
            className={accountStyles.iphoneBg}
          />{" "} */}
        </div>
      </div>

      {/* DASHBOARD DASHBOARD DASHBOARD DASHBOARD DASHBOARD <--------------------------------------------------------------------------------> DASHBOARD DASHBOARD DASHBOARD DASHBOARD DASHBOARD */}
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
                  Profielfoto Geupload
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
                <FaRegUserCircle
                  size="1.25em"
                  style={{
                    position: "relative",
                    top: "5px",
                    marginRight: "5px",
                  }}
                />
                <input
                  onChange={setUsernameHandler}
                  value={username}
                  type="text"
                  maxLength="15"
                  disabled={disabledUsername}
                  name="username"
                  id="username"
                  className={accountStyles.profileInput}
                />
              </label>
              <FaRegEdit
                size="1.1em"
                style={{
                  position: "relative",
                  top: "5px",
                  right: "10px",
                  cursor: "pointer",
                }}
                onClick={() => setDisabledUsername(false)}
              />
              <button
                className={`${accountStyles.btn}`}
                type="submit"
                style={{
                  paddingTop: "7.5px",
                  paddingBottom: "7.5px",
                }}
              >
                Save Profile Name
              </button>

              {error && <ErrorMessage text={error} />}
            </form>

            <form onSubmit={submitProfile}>
              <p>
                <label htmlFor="email">
                  <FaUser
                    size="1.25em"
                    style={{
                      position: "relative",
                      top: "5px",
                      marginRight: "5px",
                    }}
                  />
                  <input
                    onChange={setProfileHandler}
                    value={profile}
                    type="text"
                    disabled={disabledProfile}
                    name="text"
                    id="profile"
                    className={accountStyles.profileInput}
                  />
                </label>
                <FaRegEdit
                  size="1.1em"
                  style={{
                    position: "relative",
                    top: "5px",
                    right: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => setDisabledProfile(false)}
                />
                <button
                  className={`${accountStyles.btn} ${accountStyles.btnSecondary} ${accountStyles.submitBtn}`}
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
                      top: "5px",
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
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    className={accountStyles.profileInput}
                  />
                </label>
                <FaRegEdit
                  size="1.1em"
                  style={{
                    position: "relative",
                    top: "5px",
                    right: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => setDisabledEmail(false)}
                />
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
                      top: "5px",
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
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
                  />
                </label>
                <FaRegEdit
                  size="1.1em"
                  style={{
                    position: "relative",
                    top: "5px",
                    right: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => setDisabledPassword(false)}
                />
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
        </div>

        <br />
        <hr
          style={{
            border: "1px solid #35748d",
            opacity: "0.5",
          }}
        />
        <br />
        <div className={accountStyles.socialCont}>
          <form onSubmit={submitFB} className={accountStyles.socialForm}>
            <div>
              <label htmlFor="fblink">
                <FaFacebookF
                  size="1.1em"
                  className={accountStyles.socialIcons}
                />
                :
                <input
                  onChange={setFbHandler}
                  value={fbLink}
                  type="text"
                  disabled={disabledFbLink}
                  name="fblink"
                  id="fblink"
                  className={accountStyles.socialInput}
                />
              </label>
            </div>
            <div className={accountStyles.socialButtons}>
              <button
                className={`${accountStyles.btn} ${accountStyles.btnSecondary} ${accountStyles.submitBtn}`}
                type="submit"
                style={{
                  paddingTop: "7.5px",
                  paddingBottom: "7.5px",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                }}
              >
                Save Facebook
              </button>
              <FaRegEdit
                size="1.1em"
                style={{
                  position: "relative",
                  top: "5px",
                  left: "10px",
                  cursor: "pointer",
                }}
                onClick={() => setDisabledFbLink(false)}
              />
            </div>
            {error && <ErrorMessage text={error} />}
          </form>
          <form onSubmit={submitTW} className={accountStyles.socialForm}>
            <div>
              <label htmlFor="twlink">
                <FaTwitter size="1.1em" className={accountStyles.socialIcons} />
                :
                <input
                  onChange={setTwHandler}
                  value={twLink}
                  type="text"
                  disabled={disabledTwLink}
                  name="twlink"
                  id="twlink"
                  className={accountStyles.socialInput}
                />
              </label>
            </div>
            <div className={accountStyles.socialButtons}>
              <button
                className={`${accountStyles.btn} ${accountStyles.btnSecondary} ${accountStyles.submitBtn}`}
                type="submit"
                style={{
                  paddingTop: "7.5px",
                  paddingBottom: "7.5px",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                }}
              >
                Save Twitter
              </button>
              <FaRegEdit
                size="1.1em"
                style={{
                  position: "relative",
                  top: "5px",
                  left: "10px",
                  cursor: "pointer",
                }}
                onClick={() => setDisabledTwLink(false)}
              />
            </div>
            {error && <ErrorMessage text={error} />}
          </form>
          <form onSubmit={submitIG} className={accountStyles.socialForm}>
            <div>
              <label htmlFor="iglink">
                <FaInstagram
                  size="1.1em"
                  className={accountStyles.socialIcons}
                />
                :
                <input
                  onChange={setIgHandler}
                  value={igLink}
                  type="text"
                  disabled={disabledIgLink}
                  name="iglink"
                  id="iglink"
                  className={accountStyles.socialInput}
                />
              </label>
            </div>
            <div className={accountStyles.socialButtons}>
              <button
                className={`${accountStyles.btn} ${accountStyles.btnSecondary} ${accountStyles.submitBtn}`}
                type="submit"
                style={{
                  paddingTop: "7.5px",
                  paddingBottom: "7.5px",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                }}
              >
                Save Instagram
              </button>
              <FaRegEdit
                size="1.1em"
                style={{
                  position: "relative",
                  top: "5px",
                  left: "10px",
                  cursor: "pointer",
                }}
                onClick={() => setDisabledIgLink(false)}
              />
            </div>
            {error && <ErrorMessage text={error} />}
          </form>
        </div>
        <br />
        <br />
        <hr style={{ border: "1px solid #d8e6d8" }} />
        <br />
        <br />
        <br />
        <br />
        <div>
          <div className={accountStyles.linkCont}>
            <h3>Title:</h3>
            <input
              className={accountStyles.linkInput}
              type="text"
              size="35"
              placeholder="vul titel in"
              ref={linkTitle}
              minLength="5"
              required
            />
            <h3>Hyperlink:</h3>
            <input
              className={accountStyles.linkInput}
              type="url"
              size="35"
              placeholder="voer hyperlink in"
              ref={hyperLink}
              minLength="5"
              required
            />
            <button
              className={accountStyles.btn}
              onClick={event => {
                createLink()
                event.preventDefault()
              }}
            >
              Create a link
            </button>
            <button
              className={accountStyles.btn}
              style={{ background: "red" }}
              onClick={event => {
                linkTitle.current.value = ""
                hyperLink.current.value = ""
                event.preventDefault()
              }}
            >
              Clear
            </button>
          </div>
          {linkError && <DoThis text={linkError} />}
          <br />
          <br />
          <ul>
            {links.map(link => (
              <li
                key={link.id}
                className={`${accountStyles.linksCont} ${accountStyles.card}`}
              >
                <div>
                  <p className={accountStyles.updateLinkShow}>{link.title}</p>
                  <input
                    className={accountStyles.editInput}
                    id={`editlink${link.id}`}
                    type="text"
                    size="30"
                    value={editLink[link]}
                    onChange={handleEditLink}
                    placeholder="edit title"
                    minLength="5"
                    required
                  />
                </div>
                <button
                  className={accountStyles.updateLink}
                  onClick={event => {
                    editTheLink({
                      id: link.id,
                      value: editLink,
                    })
                    event.preventDefault()
                  }}
                >
                  Update Link
                </button>
                <div>
                  <b>
                    <p className={accountStyles.updateUpdateLinkShow}>
                      {link.hyperlink}
                    </p>{" "}
                  </b>
                  <input
                    className={accountStyles.editInput}
                    id={`hyperlink${link.id}`}
                    type="url"
                    size="30"
                    value={editHyperLink[link]}
                    onChange={handleEditHyperLink}
                    placeholder="edit hyperlink"
                    minLength="5"
                    required
                  />
                </div>
                <button
                  className={accountStyles.updateLink}
                  onClick={event => {
                    editTheHyperLink({
                      id: link.id,
                      value: editHyperLink,
                    })
                    event.preventDefault()
                  }}
                >
                  Update Hyperlink
                </button>
                <FaTrash
                  className={accountStyles.trashBtn}
                  onClick={event => {
                    deleteLink(link)
                    event.preventDefault()
                  }}
                >
                  Delete Link
                </FaTrash>
                <div className={accountStyles.inputCont}>
                  <input
                    type="checkbox"
                    id={`checkbox${link.id}`}
                    checked={link.visible}
                    onChange={e => toggleLink(link, e.target.checked)}
                  />
                  <span className={accountStyles.checkmark}></span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <br />
        <br />
        <br />
        <h2 style={{ textAlign: "center" }}>
          <b>
            <u
              style={{
                textDecoration: "underline",
                textDecorationColor: "#35748d",
              }}
            >
              Kies Thema
            </u>
          </b>
        </h2>
        <br />

        <ul className={accountStyles.pickColor}>
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
        <br />
        <br />
      </div>

      {/* LINK LINK LINK LINK LINK <--------------------------------------------------------------------------------> LINK LINK LINK LINK LINK */}

      <div className={`${accountStyles.Link} ${accountStyles.card}`}>LINK</div>
    </div>
  )
}
