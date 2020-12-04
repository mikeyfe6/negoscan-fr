import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"
import Reactmarkdown from "react-markdown"
import axios from "axios"

import Img from "gatsby-image"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

// NEGO TEMPLATE
import ProfLayout from "../components/proflayout"

import profStyles from "../styles/modules/profStyles.module.scss"

import "../styles/themes.scss"

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

  const [links, setLinks] = useState([])
  const [color, setColor] = useState("")

  useEffect(() => {
    const getLinks = async () => {
      const res = await axios.get(
        `${apiURL}/users/${data.strapiNegosite.website.id}`
      )
      setColor(res.data.gebruiker.bgfree)
      setLinks(res.data.connections)
      console.log(res)
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
        <div
          className={profStyles.profCenter}
          style={{ zIndex: 2, position: "relative" }}
        >
          <Img
            fixed={data.strapiNegosite.avatar.childImageSharp.fixed}
            className={profStyles.avatar}
          />

          <h1>{data.strapiNegosite.profiel}</h1>
          <Reactmarkdown
            source={data.strapiNegosite.biografie}
            className={profStyles.profielContent}
            escapeHtml={false}
          />

          <ul>
            {links.map(document => (
              <li key={document.id} className={`theme-${color}-links`}>
                {document.title}
              </li>
            ))}
          </ul>

          {/* <li
            style={{
              border: `3px solid ${data.strapiNegosite.linklook}`,
              padding: "1rem 10rem",
              borderRadius: "20px",
              marginBottom: "2rem",
            }}
          >
            <a
              href={`https://${data.strapiNegosite.sociallinks.instagram}`}
              rel="noopener noreferrer"
              target="_blank"
              className="proflink"
            >
              {data.strapiNegosite.sociallinks.instagram}
            </a>
          </li> */}

          <ul
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <li>
              <FontAwesomeIcon icon="coffee" size="3x" color="#72be72" />
            </li>
            <li>
              <FontAwesomeIcon icon="coffee" size="3x" color="#72be72" />
            </li>
            <li>
              <FontAwesomeIcon icon="coffee" size="3x" color="#72be72" />
            </li>
          </ul>

          {/* <p>
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
      linklook
      sociallinks {
        facebook
        twitter
        instagram
      }
      background {
        childImageSharp {
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      avatar {
        childImageSharp {
          fixed(width: 125, height: 125) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      website {
        id
        username
      }
    }
  }
`
