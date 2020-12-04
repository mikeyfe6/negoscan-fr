import React from "react"
import { graphql } from "gatsby"
import Reactmarkdown from "react-markdown"
import Img from "gatsby-image"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

// NEGO TEMPLATE
import ProfLayout from "../components/proflayout"

import profStyles from "../styles/modules/profStyles.module.scss"

const NegositeTemplate = ({ data }) => {
  // useEffect(() => {
  //   function hideDiv(elem) {
  //     if (elem.href === "")
  //       document.getElementById("hideDiv").style.display = "none"
  //     else document.getElementById("hideDiv").style.display = "block"
  //   }
  //   hideDiv()
  // }, [])

  return (
    <ProfLayout>
      <Img
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
      />
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
        <ul className={profStyles.profLinks}>
          <li
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
          </li>

          <li
            style={{
              border: `3px solid ${data.strapiNegosite.linklook}`,
              padding: "1rem 10rem",
              borderRadius: "20px",
              marginBottom: "2rem",
            }}
          >
            <a
              href={`https://${data.strapiNegosite.sociallinks.facebook}`}
              rel="noopener noreferrer"
              target="_blank"
              className="proflink"
            >
              {data.strapiNegosite.sociallinks.facebook}
            </a>
          </li>

          <li
            style={{
              border: `3px solid ${data.strapiNegosite.linklook}`,
              padding: "1rem 10rem",
              borderRadius: "20px",
              marginBottom: "2rem",
            }}
          >
            <a
              href={`https://${data.strapiNegosite.sociallinks.twitter}`}
              rel="noopener noreferrer"
              target="_blank"
              className="proflink"
            >
              {data.strapiNegosite.sociallinks.twitter}
            </a>
          </li>
        </ul>
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
        {/* 
        <p>
          by{" "}
          <Link to={`/gebruiker/User_${data.strapiNegosite.website.id}`}>
            {data.strapiNegosite.website.username}
          </Link>
        </p> */}
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
