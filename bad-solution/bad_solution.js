const yaml = require('js-yaml')
const fs = require('fs')
const path = require('path')

const descending_combination = () => {
  const scenario = yaml.load(fs.readFileSync(path.join(__dirname, './scenario.yaml'), 'utf-8'))
  let totalCrossTime = 0
  for (let i in scenario.bridges) {
    // Build array of all hikers per bridge
    let hikers = scenario.bridges[i].hikers !== null ?
      scenario.team.concat(scenario.bridges[i].hikers) : scenario.team
    hikers = hikers.sort((a, b) => b - a)

    let bridgeCrossTime = 0
    for (let j = 0; j < hikers.length; j+=2) {
      if (typeof hikers[j+1] !== 'undefined') {
        if (typeof hikers[j+2] !== 'undefined' && hikers[j] - hikers[j+1] > hikers[j+1] - hikers[j+2] && (hikers.length - j) % 2 !== 0) {
          bridgeCrossTime += checkSpeed(hikers[j], hikers[j], scenario.bridges[i].distance)
          bridgeCrossTime += checkSpeed(hikers[j+1], hikers[j+2], scenario.bridges[i].distance)
          j += 1
        } else {
          console.log(hikers[j], hikers[j+1], checkSpeed(hikers[j], hikers[j+1], scenario.bridges[i].distance))
          bridgeCrossTime += checkSpeed(hikers[j], hikers[j+1], scenario.bridges[i].distance)
        }
      } else {
        console.log(hikers[j], checkSpeed(hikers[j], hikers[j], scenario.bridges[i].distance))
        bridgeCrossTime += checkSpeed(hikers[j], hikers[j], scenario.bridges[i].distance)
      }
    }
    totalCrossTime += bridgeCrossTime
  }
  console.log(totalCrossTime)
}

const checkSpeed = (h1, h2, dist) => {
  return dist / Math.min(h1, h2)
}

const performance = callback => {
  const starttime = Date.now()
  callback()
  const endtime = Date.now()
  console.log(`Total Time: ${endtime - starttime}`)
}

performance(descending_combination)
