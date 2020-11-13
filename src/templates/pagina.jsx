import React from "react"
import { graphql } from "gatsby"
import Reactmarkdown from "react-markdown"
import Img from "gatsby-image"

// NEGO TEMPLATE
import ProfLayout from "../components/proflayout"

import "../styles/global.scss"

const NegositeTemplate = ({ data }) => {
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
      <div className="centeriteven" style={{ zIndex: 2, position: "relative" }}>
        <Img
          fixed={data.strapiNegosite.avatar.childImageSharp.fixed}
          style={{ borderRadius: "50%" }}
        />

        <h1>{data.strapiNegosite.profiel}</h1>
        <Reactmarkdown
          source={data.strapiNegosite.biografie}
          className="profiel-content"
          escapeHtml={false}
        />

        <p
          className="links"
          style={{ border: `1px solid ${data.strapiNegosite.linklook}` }}
        >
          {data.strapiNegosite.sociallinks.instagram}{" "}
        </p>
        <p className="links">{data.strapiNegosite.sociallinks.facebook}</p>
        <p className="links">{data.strapiNegosite.sociallinks.twitter}</p>
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
          fixed(width: 100) {
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
