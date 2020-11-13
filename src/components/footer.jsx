import React from "react"
import { Link } from "gatsby"

import footerStyles from "../styles/modules/footerStyles.module.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Footer = () => (
  <footer
    className={`${footerStyles.footer} ${footerStyles.bgDark} ${footerStyles.py5}`}
  >
    <div
      className={`${footerStyles.container} ${footerStyles.grid} ${footerStyles.grid3}`}
    >
      <div>
        <h1>Negoscan</h1>
        <p>Copyright &copy; 2020</p>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>{" "}
          </li>
          <li>
            <Link to="/docs">Docs</Link>{" "}
          </li>
          <li>
            <Link to="/admin/login">Inloggen/Registeren</Link>{" "}
          </li>
        </ul>
      </nav>
      <div className={footerStyles.social}>
        <Link to="#">
          {" "}
          <FontAwesomeIcon icon="coffee" size="2x" color="#72be72" />
        </Link>
        <Link to="#">
          {" "}
          <FontAwesomeIcon icon="coffee" size="2x" color="#72be72" />
        </Link>
        <Link to="#">
          {" "}
          <FontAwesomeIcon icon="coffee" size="2x" color="#72be72" />
        </Link>
        <Link to="#">
          {" "}
          <FontAwesomeIcon icon="coffee" size="2x" color="#72be72" />
        </Link>
      </div>
    </div>
  </footer>
)

export default Footer
