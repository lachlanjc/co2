import fetch from 'isomorphic-unfetch'
import { round, toNumber } from 'lodash'

const path =
  'https://pkgstore.datahub.io/core/co2-ppm-daily/co2-ppm-daily_json/data/a2f38b4d080dc6a73402fd1887de9251/co2-ppm-daily_json.json'

export default (req, res) =>
  fetch(path)
    .then(data => data.json())
    .then(records => records.filter((record, i) => i % 30 === 0))
    .then(records =>
      records.map(data => ({
        date: data.date,
        value: round(toNumber(data.value))
      }))
    )
    .then(json => res.json(json))
