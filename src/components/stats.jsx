import React from "react"

import statsStyles from "../styles/modules/statsStyles.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

// TODO: count toevoegen

const Stats = () => (
  <section className={statsStyles.stats}>
    <div className={statsStyles.container}>
      <h3
        className={`${statsStyles.statsHeading} ${statsStyles.textCenter} ${statsStyles.my1}`}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus sed
        repellendus molestias incidunt, doloremque eligendi quam nemo. Explicabo
        quisquam vitae deleniti officiis ipsa perferendis nemo distinctio libero
        excepturi, possimus aut!
      </h3>

      <div
        className={`${statsStyles.grid} ${statsStyles.grid3} ${statsStyles.textCenter} ${statsStyles.my4}`}
      >
        <div>
          <FontAwesomeIcon icon="coffee" size="3x" color="#72be72" />
          <h3>10,349,405</h3>
          <p className={statsStyles.textSecondary}>Profielen</p>
        </div>
        <div>
          <FontAwesomeIcon icon="coffee" size="3x" color="#72be72" />
          <h3>5 sec geleden...</h3>
          <p className={statsStyles.textSecondary}>
            Laatste profiel aangemaakt
          </p>
        </div>
        <div>
          <FontAwesomeIcon icon="coffee" size="3x" color="#72be72" />
          <h3>122,434,123</h3>
          <p className={statsStyles.textSecondary}>Algemene paginahits</p>
        </div>
      </div>
    </div>
  </section>
)

export default Stats
