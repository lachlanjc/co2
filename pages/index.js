import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import { colors } from '../components/theme'

const Page = ({ now, one, ten }) => (
  <main>
    <Head>
      <title>CO₂</title>
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:site" content="@lachlanjc" />
      <meta
        property="twitter:description"
        content="Track the PPM of CO₂ in the atmosphere."
      />
      <meta property="og:title" content="CO₂" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://co2.now.sh/" />
      <meta
        property="description"
        content="Track the PPM of CO₂ in the atmosphere."
      />
    </Head>
    <section className="banner">
      <div className="banner__left">
        <h1>CO₂</h1>
      </div>
      <div className="banner__right">
        <h2>Today: {now} PPM</h2>
        <h2>1 year ago: {one} PPM</h2>
        <h2>10 years ago: {ten} PPM</h2>
      </div>
    </section>
    <style jsx global>{`
      * {
        box-sizing: border-box;
      }
      body {
        background-color: ${colors.white};
        font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
        line-height: 1.66;
        margin: 0;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: 100vh;
      }
      @media (min-width: 32em) {
        body {
          padding: 2rem;
        }
      }
      @media (prefers-color-scheme: dark) {
        body {
          background-color: ${colors.dark};
        }
      }
    `}</style>
    <style jsx>{`
      .banner {
        display: flex;
        flex-direction: column;
        justify-content: center;
        border: 4px solid currentColor;
        color: ${colors.black};
        min-height: 24rem;
        padding: 2rem 1rem;
      }
      h1 {
        font-weight: 800;
        font-size: 3rem;
        margin: 0;
      }
      h2 {
        font-weight: 600;
        font-size: 1.25rem;
        margin: 0;
      }
      h2:nth-child(1) {
        color: ${colors.red};
      }
      h2:nth-child(2) {
        color: ${colors.orange};
      }
      h2:nth-child(3) {
        color: ${colors.yellow};
      }
      @media (max-width: 32em) {
        h1 {
          padding-bottom: 0.25rem;
          margin-bottom: 2rem;
          border-bottom: 4px solid currentColor;
        }
      }
      @media (min-width: 32em) {
        .banner {
          flex-direction: row;
          align-items: center;
          padding: 4rem 2rem;
        }
        .banner__left {
          padding-right: 2rem;
          margin-right: 2rem;
          border-right: 4px solid currentColor;
        }
        h1 {
          font-size: 4rem;
        }
      }
      @media (prefers-color-scheme: dark) {
        .banner {
          background-color: ${colors.dark};
          color: ${colors.white};
        }
      }
    `}</style>
  </main>
)

Page.getInitialProps = ({ req }) =>
  fetch((req ? `http://${req.headers.host}` : '') + '/api/stats').then(res =>
    res.json()
  )

export default Page
