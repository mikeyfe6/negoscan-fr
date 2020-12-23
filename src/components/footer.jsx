import React from "react"
// import { Link } from "gatsby"

import footerStyles from "../styles/modules/footerStyles.module.scss"

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Footer = () => (
  <footer
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
    }}
  >
    <div className={footerStyles.footerCont}>
      Copyright {new Date().getFullYear()} © All rights Reserved. Powered by
      {` `}
      <a href="https://gimmix.nl" rel="noopener noreferrer" target="_blank">
        {""}
        <b> Gimmix </b>
      </a>
      <img
        src="https://i.postimg.cc/rsf0PJv0/Gx-FAVICON-X.png"
        alt=""
        style={{ width: "25px" }}
      />
    </div>
  </footer>
)

export default Footer
