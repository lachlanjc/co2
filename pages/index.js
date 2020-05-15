import Head from 'next/head'
import Graph from '../components/graph'
import Stat from '../components/stat'
import { colors } from '../components/theme'
import { withScreenSize } from '@vx/responsive'

const Meta = ({
  name = 'CO₂',
  title = 'CO₂/Apocalypse Tracker',
  description = 'Track the PPM of CO₂ in the atmosphere.',
  image = 'https://co2.now.sh/card.png',
  url = 'https://co2.now.sh'
}) => (
  <Head>
    <title>{title}</title>
    <meta property="og:title" content={title} />
    <meta name="twitter:title" content={title} />
    <meta name="og:url" content={url} />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content={name} />
    <meta property="twitter:site" content="@lachlanjc" />
    <meta name="description" content={description} />
    <meta property="og:description" content={description} />
    <meta name="twitter:description" content={description} />
    <meta property="og:image" content={image} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={image} />
    <meta name="format-detection" content="telephone=no" />
  </Head>
)

const Page = withScreenSize(({ screenWidth, screenHeight, stats, history }) => (
  <main>
    <Meta />
    <Graph
      data={history}
      width={screenWidth || 512}
      height={screenHeight || 512}
    />
    <article>
      <h1>
        <span>🌎🔥</span> CO₂ <abbrev title="parts per million">PPM</abbrev>
      </h1>
      <Stat value={stats.ten} label="10yrs ago" color={colors.yellow} />
      <Stat value={stats.one} label="1yr ago" color={colors.orange} />
      <Stat value={stats.now} label="today" color={colors.red} />
    </article>
    <footer>
      <span>
        {history[0].date.substr(0, 4)} – {history[0].value} PPM
      </span>
      <span>
        {history[history.length - 1].date.substr(0, 4)} –{' '}
        {history[history.length - 1].value} PPM
      </span>
    </footer>
    <style jsx global>{`
      * {
        box-sizing: border-box;
      }
      body {
        background-color: ${colors.dark};
        color: ${colors.white};
        font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
        line-height: 1.66;
        margin: 0;
        display: flex;
        flex-direction: column;
        min-height: 100vh;
      }
      body :global(.graph) {
        position: absolute;
        top: 0;
        left: 0;
      }
    `}</style>
    <style jsx>{`
      article {
        text-align: center;
        padding: 1rem;
      }
      h1 {
        font-weight: 800;
        font-size: 4rem;
        margin-top: 0;
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      h1 span,
      h1 abbrev {
        display: inline-block;
        margin: 0 1.5rem;
      }
      h1 span {
        font-size: 2.25rem;
      }
      h1 abbrev {
        font-size: 1.5rem;
        background-image: linear-gradient(
          rgba(255, 255, 255, 1),
          rgba(255, 255, 255, 0.75)
        );
        border-radius: 0.5rem;
        padding: 0 0.5rem;
        color: ${colors.dark};
      }
      footer {
        width: 100%;
        height: 100%;
        display: none;
        justify-content: space-between;
        align-items: space-between;
        padding: 0.375rem 0.75rem;
        position: fixed;
        top: 0;
        opacity: 0.5;
        font-size: 0.875rem;
      }
      footer span:first-child {
        margin-top: auto;
        color: ${colors.yellow};
      }
      footer span:last-child {
        color: ${colors.red};
      }
      @media (min-width: 32em) {
        article {
          padding: 4rem 2rem;
        }
        h1 {
          margin-bottom: 2rem;
        }
        footer {
          display: flex;
        }
      }
    `}</style>
  </main>
))

export const getStaticProps = async () => {
  const getStats = require('./api/stats').default
  const getHistory = require('./api/history').default
  return {
    props: { stats: await getStats(), history: await getHistory() },
    unstable_revalidate: 15
  }
}

export default Page
