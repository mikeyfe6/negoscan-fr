// import { Link } from "gatsby"

import React from "react"

import languagesStyles from "../styles/modules/languagesStyles.module.scss"

// TODO: count toevoegen

import nodeImg from "../images/node.png"
import pytImg from "../images/python.png"
import cshImg from "../images/csharp.png"
import rubyImg from "../images/ruby.png"
import phpImg from "../images/php.png"
import scalaImg from "../images/scala.png"
import clojImg from "../images/clojure.png"

const Languages = () => (
  <section className={languagesStyles.languages}>
    <h2
      className={`${languagesStyles.md} ${languagesStyles.textCenter} ${languagesStyles.my2}`}
    >
      Supported Languages
    </h2>
    <div className={`${languagesStyles.container} ${languagesStyles.flex}`}>
      <div className={languagesStyles.card}>
        <h4>Node.js</h4>
        <img src={nodeImg} alt="" />
      </div>
      <div className={languagesStyles.card}>
        <h4>Node.js</h4>
        <img src={pytImg} alt="" />
      </div>
      <div className={languagesStyles.card}>
        <h4>Node.js</h4>
        <img src={cshImg} alt="" />
      </div>
      <div className={languagesStyles.card}>
        <h4>Node.js</h4>
        <img src={rubyImg} alt="" />
      </div>
      <div className={languagesStyles.card}>
        <h4>Node.js</h4>
        <img src={phpImg} alt="" />
      </div>
      <div className={languagesStyles.card}>
        <h4>Node.js</h4>
        <img src={scalaImg} alt="" />
      </div>
      <div className={languagesStyles.card}>
        <h4>Node.js</h4>
        <img src={clojImg} alt="" />
      </div>
    </div>
  </section>
)

export default Languages
