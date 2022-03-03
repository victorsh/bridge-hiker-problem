const assert = require('assert')
const { hikers_bridge, fastest_combo } = require('../hikers_bridge.js')

const scenario = {
  team: [ 100, 50, 20, 10 ],
  bridges: [
    { distance: 100, hikers: null },
    { distance: 250, hikers: [ 2.5 ] },
    { distance: 150, hikers: [ 25, 15 ] }
  ]
}

describe('Hikers Bridge Problem', () => {
  describe('Hikers Bridge', () => {
    it('Tests the first scenario', () => {
      assert.deepEqual(hikers_bridge(scenario, false), [17, 135, 40.5])
    })
  })
  describe('Fastest Combination', () => {
    it('finds the fastest combination', () => {
      assert.deepEqual(fastest_combo([1,2,3,4]), [[ 3, 4 ], [ 1, 2 ]])
    })
    it('throws an error if array is not even', () => {
      assert.throws(() => { fastest_combo([1,2,3]) }, Error, 'Hikers array must be even')
    })
  })
})
