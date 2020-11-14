import React from "react"

import Layout from "../components/layout"

import Showcase from "../components/showcase"
import Stats from "../components/stats"
import Cli from "../components/cli"
import Cloud from "../components/cloud"
import Languages from "../components/languages"

import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Showcase />
    <Stats />
    <Cli />
    <Cloud />
    <Languages />
  </Layout>
)

export default IndexPage
