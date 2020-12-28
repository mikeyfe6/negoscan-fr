import React from "react"
// import { Link } from "gatsby"

import Layout from "../components/layout"

import SEO from "../components/seo"

import loginStyles from "../styles/modules/loginStyles.module.scss"
import resetStyles from "../styles/modules/resetStyles.module.scss"

import servImage from "../images/server.png"

import ResetPassword from "../components/resetpwd"

const IndexPage = () => (
  <Layout>
    <SEO title="Nieuw wachtwoord" />
    <section
      className={`${loginStyles.docsHead} ${loginStyles.bgPrimary} ${loginStyles.py3}`}
    >
      <div className={`${loginStyles.container} ${loginStyles.grid}`}>
        <div>
          <h1 className={loginStyles.md}>Nieuw wachtwoord</h1>
          <p className={loginStyles.lead}>Voer hier je nieuwe wachtwoord in</p>
          <ResetPassword />
        </div>
        <img src={servImage} alt="" />
      </div>
    </section>
    <div className={resetStyles.indexBg} />
  </Layout>
)

export default IndexPage
