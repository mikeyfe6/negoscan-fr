import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"

import SEO from "../components/seo"
import loginStyles from "../styles/modules/loginStyles.module.scss"

import servImage from "../images/server.png"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <section
      className={`${loginStyles.docsHead} ${loginStyles.bgPrimary} ${loginStyles.py3}`}
    >
      <div className={`${loginStyles.container} ${loginStyles.grid}`}>
        <div>
          <h1 className={loginStyles.xl}>Negoscan.me</h1>
          <p className={loginStyles.lead}>
            Klik{" "}
            <Link to="/admin/login" className={loginStyles.link}>
              hier
            </Link>{" "}
            om in te loggen..
          </p>
        </div>
        <img src={servImage} alt="" />
      </div>
    </section>
    <div className={loginStyles.indexBg} />
  </Layout>
)

export default IndexPage
