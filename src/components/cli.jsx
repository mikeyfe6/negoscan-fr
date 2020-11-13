// import { Link } from "gatsby"

import React from "react"

import cliStyles from "../styles/modules/cliStyles.module.scss"

// TODO: count toevoegen

import cliImage from "../images/cli.png"

const Cli = () => (
  <section className={cliStyles.cli}>
    <div className={`${cliStyles.container} ${cliStyles.grid}`}>
      <img src={cliImage} alt="" />
      <div className={cliStyles.card}>
        <h3>Easy</h3>
      </div>
      <div className={cliStyles.card}>
        <h3>Deploy in Seconds</h3>
      </div>
    </div>
  </section>
)

export default Cli
