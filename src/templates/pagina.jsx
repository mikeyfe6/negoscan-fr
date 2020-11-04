import React from "react"
import { Link, graphql } from "gatsby"
import Reactmarkdown from "react-markdown"
import Img from "gatsby-image"
import Layout from "../components/layout"

import "../styles/global.scss"

const NegositeTemplate = ({ data }) => (
  <Layout>
    <h1>{data.strapiNegosite.profiel}</h1>
    <p>
      by{" "}
      <Link to={`/gebruiker/User_${data.strapiNegosite.medium.id}`}>
        {data.strapiNegosite.medium.username}
      </Link>
    </p>
    <Img fluid={data.strapiNegosite.avatar.childImageSharp.fluid} />
    <Reactmarkdown
      source={data.strapiNegosite.biografie}
      className="paginaIndex"
      escapeHtml={false}
    />
  </Layout>
)

export default NegositeTemplate

export const query = graphql`
  query NegositeTemplate($id: String!) {
    strapiNegosite(id: { eq: $id }) {
      profiel
      biografie
      avatar {
        childImageSharp {
          fluid(maxWidth: 500) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      medium {
        id
        username
      }
    }
  }
`
