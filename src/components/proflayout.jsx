/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
// import { useStaticQuery, graphql } from "gatsby"

const ProfLayout = ({ children }) => {
  //   const data = useStaticQuery(graphql`
  //     query SiteTitleQuery {
  //       site {
  //         siteMetadata {
  //           title
  //         }
  //       }
  //     }
  //   `)

  return (
    <>
      {/* <div siteTitle={data.site.siteMetadata?.title || `Title`} /> */}
      <div id="page-container">
        <div id="content-wrap">
          <main>{children}</main>
        </div>
        <footer id="footer" style={{ textAlign: "center", zIndex: 2 }}>
          <Link to="/">terug</Link>
        </footer>
      </div>
    </>
  )
}

ProfLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ProfLayout
