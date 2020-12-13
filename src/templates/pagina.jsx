import React, { useLayoutEffect, useState } from "react"
import { graphql, Link } from "gatsby"
// import Reactmarkdown from "react-markdown"
import axios from "axios"

import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa"

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

      if (!res.data.gebruiker.avatar) {
        return setAvatar(noavatar)
      } else {
        setAvatar(res.data.gebruiker.avatar.url)
      }
    }
    getLinks()
  }, [data.strapiNegosite.website.id])

  return (
    <ProfLayout>
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
            >
              <FaFacebookF size="2.25em" />
            </a>

            <a
              href={`https://${twLink}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <FaTwitter size="2.25em" />
            </a>

            <a
              href={`https://${igLink}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <FaInstagram size="2.25em" />
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
  query NegositeTemplate($id: String!) {
    strapiNegosite(id: { eq: $id }) {
      profiel
      biografie
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
