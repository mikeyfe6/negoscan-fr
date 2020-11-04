import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"

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
    <p>{data.strapiNegosite.biografie}</p>
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
