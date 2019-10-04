import React from 'react'
import { AreaClosed, Line, Bar } from '@vx/shape'
import { curveMonotoneX } from '@vx/curve'
import { GridRows, GridColumns } from '@vx/grid'
import { scaleTime, scaleLinear } from '@vx/scale'
import { colors } from './theme'

const min = (arr, fn) => Math.min(...arr.map(fn))
const max = (arr, fn) => Math.max(...arr.map(fn))
const extent = (arr, fn) => [min(arr, fn), max(arr, fn)]

const xPoint = d => new Date(d.date)
const yPoint = d => d.value

const Graph = ({ data, width, height }) => {
  const xScale = scaleTime({
    range: [0, width],
    domain: extent(data, xPoint)
  })
  const yScale = scaleLinear({
    range: [height, 0],
    domain: [min(data, yPoint), max(data, yPoint)],
    nice: true
  })

  return (
    <svg width={width} height={height} className="graph">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={colors.red} stopOpacity={0.5} />
          <stop offset="100%" stopColor={colors.orange} stopOpacity={0.25} />
        </linearGradient>
      </defs>
      <GridRows
        scale={yScale}
        width={width}
        strokeDasharray="2,2"
        stroke="rgba(255,255,255,0.125)"
      />
      <GridColumns
        scale={xScale}
        height={height}
        strokeDasharray="2,2"
        stroke="rgba(255,255,255,0.125)"
      />
      <AreaClosed
        data={data}
        x={d => xScale(xPoint(d))}
        y={d => yScale(yPoint(d))}
        yScale={yScale}
        strokeWidth={1}
        stroke={'url(#gradient)'}
        fill={'url(#gradient)'}
        curve={curveMonotoneX}
      />
      <Bar
        x={0}
        y={0}
        width={width}
        height={height}
        fill="transparent"
        data={data}
      />
    </svg>
  )
}

export default Graph
