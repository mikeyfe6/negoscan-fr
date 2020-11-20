import React, { useState, useRef, useEffect } from "react"
import axios from "axios"

import { navigate } from "@reach/router"
import { getUser, logout } from "../../services/auth"

import accountStyles from "../../styles/modules/accountStyles.module.scss"

import noavatar from "../../images/noavatar.png"

const apiURL = process.env.GATSBY_BASE_URL

export default () => {
  const gatsbyUser = getUser()
  const apiImage = gatsbyUser.user.gebruiker.avatar.url
  console.log(gatsbyUser)

  // AVATAR CHANGE
  const [image, setImage] = useState()
  const [preview, setPreview] = useState(apiImage)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef()
  const [color, setColor] = useState()

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

  const onRadioChange = e => {
    setColor({
      color: e.target.value,
    })
  }

  console.log(color)

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

  // CHANGE BACKGROUND
  function changeHeadingBg(klasse) {
    document.getElementById("iphone-bg").className = klasse
  }

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
        <div
          style={{
            position: "relative",
          }}
        >
          {loading && (
            <div style={{ color: "white" }}>Profielavatar Geupload</div>
          )}
          <img
            src={preview}
            alt=""
            className={accountStyles.avatarImage}
            id="avatar-image"
          />
          <form onSubmit={handleSubmit}>
            {" "}
            <button
              className={accountStyles.btn}
              onClick={event => {
                event.preventDefault()
                fileInputRef.current.click()
              }}
            >
              {" "}
              Add image
            </button>
            <button
              className={accountStyles.btn}
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
            <button className={accountStyles.btn} type="submit">
              Submit
            </button>
            <br />
            <br />
          </form>
        </div>
        <p>
          <b>USERNAME :</b>
          {gatsbyUser.user.gebruiker.profiel}
        </p>
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
        <p>
          {" "}
          <b>EMAIL :</b> {gatsbyUser.user.email}
        </p>
        <br />
        <ul
          style={{ display: "flex", justifyContent: "space-around" }}
          className={accountStyles.pickColor}
        >
          <li>
            <label>
              <input
                type="radio"
                value="red"
                checked={color === "red"}
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
          </li>

          <li className={accountStyles.chooseColor}>
            <label>
              <input
                type="radio"
                value="yellow"
                checked={color === "yellow"}
                onChange={onRadioChange}
                onClick={event => {
                  changeHeadingBg(accountStyles.yellowstyle)
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
                value="gray"
                checked={color === "gray"}
                onChange={onRadioChange}
                onClick={event => {
                  changeHeadingBg(accountStyles.graystyle)
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
                value="pink"
                checked={color === "pink"}
                onChange={onRadioChange}
                onClick={event => {
                  changeHeadingBg(accountStyles.pinkstyle)
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
                value="black"
                checked={color === "black"}
                onChange={onRadioChange}
                onClick={event => {
                  changeHeadingBg(accountStyles.blackstyle)
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
                value="brown"
                checked={color === "brown"}
                onChange={onRadioChange}
                onClick={event => {
                  changeHeadingBg(accountStyles.brownstyle)
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
