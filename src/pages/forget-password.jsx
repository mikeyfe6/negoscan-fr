import React from "react"
// import { Link } from "gatsby"

import Layout from "../components/layout"

import SEO from "../components/seo"

import loginStyles from "../styles/modules/loginStyles.module.scss"
import forgetStyles from "../styles/modules/forgetStyles.module.scss"

import servImage from "../images/server.png"

import ForgetPassword from "../components/forgetpwd"

const IndexPage = () => (
  <Layout>
    <SEO title="Wachtwoord vergeten" />
    <section
      className={`${loginStyles.docsHead} ${loginStyles.bgPrimary} ${loginStyles.py3}`}
    >
      <div className={`${loginStyles.container} ${loginStyles.grid}`}>
        <div>
          <h1 className={loginStyles.md}>Wachtwoord vergeten</h1>
          <p className={loginStyles.lead}>
            Voer hier je emailadress in <ForgetPassword />
          </p>
        </div>
        <img src={servImage} alt="" />
      </div>
    </section>
    <div className={forgetStyles.indexBg} />
  </Layout>
)

export default IndexPage
