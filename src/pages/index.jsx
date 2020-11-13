import React from "react"
// import Reactmarkdown from "react-markdown"
import { graphql } from "gatsby"
// Link,

// import Img from "gatsby-image"

import Layout from "../components/layout"
// import Image from "../components/image"

import Showcase from "../components/showcase"
import Stats from "../components/stats"
import Cli from "../components/cli"
import Cloud from "../components/cloud"
import Languages from "../components/languages"

import SEO from "../components/seo"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    {/* <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p> */}
    <Showcase />
    <Stats />
    <Cli />
    <Cloud />
    <Languages />
    {/* <ul>
      {data.allStrapiNegosite.edges.map(document => (
        <li key={document.node.id}>
          <h2>
            <Link to={`/${document.node.id}`}>{document.node.profiel}</Link>
          </h2>
          <Reactmarkdown source={document.node.biografie} />
          <Img fixed={document.node.avatar.childImageSharp.fixed} />
        </li>
      ))}
    </ul> */}
    {/*<div> <Image /> </div>*/}
    {/* <Link to="/admin/login/">Inloggen / Registreren</Link> <br />
    <Link to="/using-typescript/">Go to "Using TypeScript"</Link> */}
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
