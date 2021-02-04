import React, { useLayoutEffect, useState, useEffect } from "react"
import { graphql, Link } from "gatsby"
// import Reactmarkdown from "react-markdown"
import axios from "axios"

import SEO from "../components/seo"

import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa"
import { SiTiktok } from "react-icons/si"

// NEGO TEMPLATE
import ProfLayout from "../components/proflayout"

import profStyles from "../styles/modules/profStyles.module.scss"

import "../styles/themes.scss"

import negoLogo from "../../static/Negoscan-logo.png"

import noavatar from "../images/noavatar.png"

const apiURL = process.env.GATSBY_BASE_URL

const NegositeTemplate = ({ data }) => {
  // useEffect(() => {
  //   function hideDiv(elem) {
  //     if (elem.href === "")
  //       document.getElementById("hideDiv").style.display = "none"
  //     else document.getElementById("hideDiv").style.display = "block"
  //   }
  //   hideDiv()
  // }, [])

  const [color, setColor] = useState("")
  const [avatar, setAvatar] = useState()
  const [username, setUsername] = useState()
  const [links, setLinks] = useState([])

  const [fbLink, setFbLink] = useState("")
  const [twLink, setTwLink] = useState("")
  const [igLink, setIgLink] = useState("")
  const [waLink, setWaLink] = useState("")
  const [tkLink, setTkLink] = useState("")

  useLayoutEffect(() => {
    const getLinks = async () => {
      const res = await axios.get(
        `${apiURL}/users/${data.strapiNegosite.website.id}`
      )
      setColor(res.data.gebruiker.bgfree)
      setLinks(res.data.connections)
      setUsername(res.data.gebruiker.profiel)
      setFbLink(res.data.gebruiker.facebooklink)
      setTwLink(res.data.gebruiker.twitterlink)
      setIgLink(res.data.gebruiker.instagramlink)
      setWaLink(res.data.gebruiker.whatsapplink)
      setTkLink(res.data.gebruiker.tiktoklink)

      if (!res.data.gebruiker.avatar) {
        return setAvatar(noavatar)
      } else {
        setAvatar(res.data.gebruiker.avatar.url)
      }
    }
    getLinks()
  }, [data.strapiNegosite.website.id])

  useEffect(() => {
    var fbhideman = document.getElementById("fbhidesm")
    if (fbLink < 9) {
      fbhideman.style.display = "none"
    } else {
      fbhideman.style.display = "block"
    }
    var twhideman = document.getElementById("twhidesm")
    if (twLink < 9) {
      twhideman.style.display = "none"
    } else {
      twhideman.style.display = "block"
    }
    var ighideman = document.getElementById("ighidesm")
    if (igLink < 9) {
      ighideman.style.display = "none"
    } else {
      ighideman.style.display = "block"
    }
    var wahideman = document.getElementById("wahidesm")
    if (waLink < 9) {
      wahideman.style.display = "none"
    } else {
      wahideman.style.display = "block"
    }
    var tkhideman = document.getElementById("tkhidesm")
    if (tkLink < 9) {
      tkhideman.style.display = "none"
    } else {
      tkhideman.style.display = "block"
    }
  }, [fbLink, twLink, igLink, waLink, tkLink])

  return (
    <ProfLayout>
      <SEO title={username} />
      {/* <Img
        fluid={data.strapiNegosite.background.childImageSharp.fluid}
        style={{
          width: "100vw",
          height: "100vh",
          zIndex: 1,
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          textAlign: "center",
          // opacity: 0.1,
        }}
      /> */}

      <div className={`theme-${color}`}>
        <div className={profStyles.profCenter} style={{ zIndex: 2 }}>
          <img src={avatar} className={profStyles.avatar} alt="avatar" />

          <h1>{username}</h1>
          {/* <Reactmarkdown
            source={data.strapiNegosite.biografie}
            className={profStyles.profielContent}
            escapeHtml={false}
          /> */}

          <ul>
            {links.slice(0, 20).map(link => (
              <li
                key={link.id}
                className={`theme-${color}-links`}
                hidden={!link.visible}
              >
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

          <div className={`theme-${color}-icons`}>
            <a
              href={`https://${fbLink}`}
              rel="noopener noreferrer"
              target="_blank"
              id="fbhidesm"
            >
              <FaFacebookF size="2em" />
            </a>

            <a
              href={`https://${twLink}`}
              rel="noopener noreferrer"
              target="_blank"
              id="twhidesm"
            >
              <FaTwitter size="2em" />
            </a>

            <a
              href={`https://${igLink}`}
              rel="noopener noreferrer"
              target="_blank"
              id="ighidesm"
            >
              <FaInstagram size="2em" />
            </a>

            <a
              href={`https://wa.me/${waLink}`}
              rel="noopener noreferrer"
              target="_blank"
              id="wahidesm"
            >
              <FaWhatsapp size="2em" />
            </a>

            <a
              href={`https://${tkLink}`}
              rel="noopener noreferrer"
              target="_blank"
              id="tkhidesm"
            >
              <SiTiktok size="2em" />
            </a>
          </div>

          <Link to="/">
            <img
              src={negoLogo}
              alt=""
              style={{
                top: "100px",
                position: "relative",
                width: "100px",
              }}
            ></img>
          </Link>

          {/* <p></p>
            by{" "}
            <Link to={`/gebruiker/User_${data.strapiNegosite.website.id}`}>
              {data.strapiNegosite.website.username}
            </Link>
          </p> */}
        </div>
      </div>
    </ProfLayout>
  )
}

export default NegositeTemplate

export const query = graphql`
  query NegositeTemplate($slug: String!) {
    strapiNegosite(slug: { eq: $slug }) {
      profiel
      # biografie
      # background {
      #   childImageSharp {
      #     fluid(maxWidth: 1200) {
      #       ...GatsbyImageSharpFluid
      #     }
      #   }
      # }
      # avatar {
      #   childImageSharp {
      #     fixed(width: 125, height: 125) {
      #       ...GatsbyImageSharpFixed
      #     }
      #   }
      # }
      website {
        id
        username
      }
    }
  }
`
