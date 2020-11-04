import React from "react"
import Reactmarkdown from "react-markdown"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

const UserTemplate = ({ data }) => (
  <Layout>
    <h1>{data.strapiUser.username}</h1>
    <ul>
      {data.strapiUser.gebruikers.map(gebruiker => (
        <li key={gebruiker.id}>
          <h2>
            <Link to={`/Negosite_${gebruiker.id}`}>{gebruiker.profiel}</Link>
          </h2>
          <Reactmarkdown source={gebruiker.biografie} />
        </li>
      ))}
    </ul>
  </Layout>
)

export default UserTemplate

export const query = graphql`
  query UserTemplate($id: String!) {
    strapiUser(id: { eq: $id }) {
      id
      username
      gebruikers {
        id
        profiel
        biografie
      }
    }
  }
`
