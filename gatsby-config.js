module.exports = {
  siteMetadata: {
    siteUrl: `https://negoscan.netlify.app`,
    title: `Negoscan`,
    description: `Een veilige en duurzame oplossing voor het delen van contactinformatie, ook op anderhalve meter afstand.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: process.env.DEPLOY_URL
          ? "https://negoscan-database.herokuapp.com"
          : "http://localhost:1337",
        contentTypes: [`negosite`, `user`, `negocode`],
        markdownImages: {
          typesToParse: {
            negosite: ["biografie"],
          },
        },
        queryLimit: 1000,
        loginData: {
          identifier: "",
          password: "",
        },
      },
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/admin/*`] },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: `white`,
        // Disable the loading spinner.
        // showSpinner: false,
      },
    },
    `gatsby-plugin-netlify`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sass`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Negoscan`,
        short_name: `Negoscan`,
        description: `Een veilige en duurzame oplossing voor het delen van contactinformatie, ook op anderhalve meter afstand.`,
        start_url: `/`,
        background_color: `#a9a9a9`,
        lang: `nl`,
        theme_color: `#16b7f2`,
        display: `standalone`,
        icon: "src/images/Negoscan-logo.png",
        icon_options: {
          purpose: `any maskable`,
        },
        crossOrigin: `use-credentials`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
