const yaml = require('js-yaml')
const fs = require('fs')
const path = require('path')
const { hikers_bridge } = require('./hikers_bridge')

const main = () => {
  // Process argument variables and load yaml file
  const args = process.argv.slice(2)
  const filename = args[0]
  const verbose = args[1] === 'true' ? true : false
  const scenario = yaml.load(
    fs.readFileSync(path.join(__dirname, `./${filename}`), 'utf-8')
  )

  hikers_bridge(scenario, verbose)
}

main()
