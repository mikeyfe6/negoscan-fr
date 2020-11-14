// import { Link } from "gatsby"

import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import Reactmarkdown from "react-markdown"

import languagesStyles from "../styles/modules/languagesStyles.module.scss"

// TODO: count toevoegen

import Img from "gatsby-image"

const Languages = () => {
  const data = useStaticQuery(graphql`
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
  `)

  return (
    <section className={languagesStyles.languages}>
      <h2
        className={`${languagesStyles.md} ${languagesStyles.textCenter} ${languagesStyles.my2}`}
      >
        Join the club!
      </h2>
      <div className={`${languagesStyles.container} `}>
        <ul className={languagesStyles.flex}>
          {data.allStrapiNegosite.edges.map(document => (
            <li key={document.node.id} className={languagesStyles.card}>
              <h2>
                <Link to={`/${document.node.id}`}>{document.node.profiel}</Link>
              </h2>
              <Reactmarkdown source={document.node.biografie} />
              <Img fixed={document.node.avatar.childImageSharp.fixed} />
            </li>
          ))}
        </ul>{" "}
      </div>
    </section>
  )
}

export default Languages
