import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"

import headerStyles from "../styles/modules/headerStyles.module.scss"
import negoLogo from "../../static/Negoscan-logo.png"

const Header = () => (
  <header className={headerStyles.navbar}>
    <div className={`${headerStyles.container} ${headerStyles.flex}`}>
      <Link to="/">
        <img src={negoLogo} alt="" style={{ width: "100px" }} />
      </Link>
      <nav>
        <ul>
          <li>
            <a
              href="https://negoscan.store"
              rel="noopener noreferrer"
              target="_blank"
            >
              <b>Store</b>
            </a>
          </li>
          <li>
            <Link to="/admin/login">Login</Link>
          </li>
          <li>
            <Link to="/admin/account">Account</Link>
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
