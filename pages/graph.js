import React from 'react'
import fetch from 'isomorphic-unfetch'
import { VictoryChart, VictoryArea, VictoryAxis } from 'victory'
import { colors } from '../components/theme'

const style = {
  axis: {
    tickLabels: {
      fontFamily: 'system-ui',
      fontSize: 8,
      color: colors.white
    },
    axis: { stroke: colors.white, strokeWidth: 2 },
    ticks: {
      size: tick => 8,
      stroke: colors.grey,
      strokeWidth: 2
    },
    grid: {
      stroke: tick => colors.smoke,
      strokeWidth: 1
    }
  }
}

const Graph = ({ data }) => {
  // console.log(props)
  return (
    <VictoryChart
      // style={{ parent: { fontFamily: 'inherit' } }}
      animate={{
        duration: 768,
        onEnter: { duration: 512 }
      }}
    >
      <VictoryAxis
        independentAxis
        // tickValues={[1880, 1900, 1920, 1940, 1960, 1980, 2000]}
        tickFormat={tick => tick.split('-')[0]}
        tickCount={12}
        style={style.axis}
      />
      <VictoryAxis
        dependentAxis
        tickFormat={tick => tick + ' PPM'}
        tickCount={12}
        // domain={[375, 425]}
        style={style.axis}
      />
      <VictoryArea
        data={data}
        // categories={{ x: 'date', y: 'value' }}
        // x="date"
        // y="value"
        // padding={0}
        style={{
          data: {
            stroke: colors.red,
            strokeWidth: 0.25
            // fill: colors.cyan
          }
        }}
      />
    </VictoryChart>
  )
}

Graph.getInitialProps = ({ req }) =>
  fetch((req ? `http://${req.headers.host}` : '') + '/api/history')
    .then(res => res.json())
    .then(data => ({ data }))

export default Graph
