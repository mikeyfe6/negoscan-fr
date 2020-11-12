import React from "react"
import Reactmarkdown from "react-markdown"
import { Link, graphql } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import Img from "gatsby-image"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <FontAwesomeIcon icon="coffee" size="2x" color="#FFCC00" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <ul>
      {data.allStrapiNegosite.edges.map(document => (
        <li key={document.node.id}>
          <h2>
            <Link to={`/${document.node.id}`}>{document.node.profiel}</Link>
          </h2>
          <Reactmarkdown source={document.node.biografie} />
          <Img fixed={document.node.avatar.childImageSharp.fixed} />
        </li>
      ))}
    </ul>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/admin/login/">Inloggen / Registreren</Link> <br />
    <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
  </Layout>
)

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    allStrapiNegosite {
      edges {
        node {
          id
          profiel
          biografie
          avatar {
            childImageSharp {
              fixed(width: 200, height: 125) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }
`
