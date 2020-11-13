import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"

import headerStyles from "../styles/modules/headerStyles.module.scss"

const Header = ({ siteTitle }) => (
  <header className={headerStyles.navbar}>
    <div className={`${headerStyles.container} ${headerStyles.flex}`}>
      <h1 className={headerStyles.logo}>{siteTitle}</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">Over ons</Link>
          </li>
          <li>
            <Link to="/">Login/Register</Link>
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
