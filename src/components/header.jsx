import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"

import headerStyles from "../styles/modules/headerStyles.module.scss"
import negoLogo from "../../static/Negoscan-logo.png"

const Header = () => (
  <header className={headerStyles.navbar}>
    <div className={`${headerStyles.container} ${headerStyles.flex}`}>
      <img src={negoLogo} alt="" style={{ width: "100px" }} />
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/docs">Docs</Link>
          </li>
          <li>
            <Link to="/admin/login">Login / Register</Link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
