import React from "react"
import { Link } from "gatsby"

import cloudStyles from "../styles/modules/cloudStyles.module.scss"

import cloudImage from "../images/cloud.png"

const Cloud = () => (
  <section
    className={`${cloudStyles.cloud} ${cloudStyles.bgPrimary} ${cloudStyles.my2} ${cloudStyles.py2}`}
  >
    <div className={`${cloudStyles.container} ${cloudStyles.grid}`}>
      <div className={cloudStyles.textCenter}>
        <h2 className={cloudStyles.lg}>Go Online!</h2>
        <p className={`${cloudStyles.lead} ${cloudStyles.my1}`}>
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Reprehenderit nam, omnis commodi molestias, odio eligendi est.{" "}
        </p>
        <Link to="/" className={`${cloudStyles.btn} ${cloudStyles.btnDark}`}>
          Lees Meer
        </Link>
      </div>
      <img src={cloudImage} alt="" />
    </div>
  </section>
)

export default Cloud
