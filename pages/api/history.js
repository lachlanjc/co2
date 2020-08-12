import { round, toNumber } from 'lodash'

const path =
  'https://datahub.io/core/co2-ppm-daily/r/co2-ppm-daily.json'

export default (req, res = null) =>
  fetch(path)
    .then(r => r.json())
    .then(records => records.filter((r, i) => i % 50 === 0))
    .then(records =>
      records.map(data => ({
        date: data.date,
        value: round(toNumber(data.value))
      }))
    )
    .then(json => {
      if (res) {
        res.json(json)
      } else {
        return json
      }
    })
