const hikers_bridge = (scenario, verbose) => {
  const final_times = []
  // Iterate over every bridge scenario
  for (let i in scenario.bridges) {
    // Build array of all hikers per bridge
    // This is where the additional hikers are added
    let hikers = scenario.bridges[i].hikers !== null ?
      scenario.team.concat(scenario.bridges[i].hikers) : scenario.team
    // Sort the speed of the hikers in descending order.
    // O(n log n)
    hikers = hikers.sort((a, b) => b - a)

    // Hikers on the left side of the bridge
    let hikers_left = []
    // Hikers on the right side of the bridge
    let hikers_right = []
    // Total crossing time per bridge
    let total = 0

    // Calculate the time it takes for each hiker to cross the bridge
    // and store that into an array.
    // This is done in order to avoid running these calculations later
    // in the program.
    hikers.forEach(hiker => {
      hikers_left.push(scenario.bridges[i].distance / hiker)
    })

    if (verbose) console.log(hikers_left)
    
    // Loop while there are still hikers on the left side of the bridge.
    while(hikers_left.length !== 0) {
      // If there are only 2 hikers left then get the slowest speed of both
      // and add to the total crossing time.
      // Set the array that holds the hikers at the left of the bridge to empty.
      if (hikers_left.length === 2) {
        total += Math.max(hikers_left[0], hikers_left[1])
        hikers_left = []
        if (verbose) console.log('total',total)
      } else {
        if (hikers_left.length % 2 === 0) {
          // If there is an even number of hikers that haven't crossed, select the combination that is the fastest.
          // First find the fastest combination of hikers.
          // The return of fastest_combo will an array that holds two arrays, one of the hikers on the left side
          // and one for the hikers on the right side.
          const new_hiker_positions = fastest_combo(hikers_left)
          hikers_left = new_hiker_positions[0]
          // Add the hikers who have crossed to the array that holds the hikers on the right side of the bridge.
          hikers_right = hikers_right.concat(new_hiker_positions[1])
          // Take the slowest time of the hikers that have crossed and add it to the total time.
          total += Math.max(new_hiker_positions[1][0], new_hiker_positions[1][1])
        } else {
          // If there is an odd number of hikers that haven't crossed then the fastest hiker should not cross.
          // The first hiker is the fastest hiker, remove them from the list of hikers on the left side
          // in order to process the fastest combination of hikers.
          const fastest_hiker = hikers_left.shift()
          // The return of fastest_combo will an array that holds two arrays, one of the hikers on the left side
          // and one for the hikers on the right side.
          const new_hiker_positions = fastest_combo(hikers_left)
          // Combine fastest hiker with the hikers remaining on the left side.
          hikers_left = [fastest_hiker, ...new_hiker_positions[0]]
          // Add hikers that have crossed the bridge to the array of right side hikers.
          hikers_right = hikers_right.concat(new_hiker_positions[1])
          // Add the paired hiker times to the total crossing time.
          total += Math.max(new_hiker_positions[1][0], new_hiker_positions[1][1])
        }
        if (verbose) {
          console.log('---')
          console.log('going right')
          console.log('left', hikers_left)
          console.log('right', hikers_right)
          console.log('total', total)
        }

        // Move the fastest hiker to the left side of the bridge.
        // Sort array in ascending order so the fastest hiker is first.
        // O(n log n)
        hikers_right.sort((a, b) => a - b)
        let fastest = hikers_right.shift()
        // Add fastest hiker to the beginning of the left side array.
        hikers_left.unshift(fastest)
        total += fastest

        if (verbose) {
          console.log('going left')
          console.log('left', hikers_left)
          console.log('right', hikers_right)
          console.log('total', total)
          console.log('---')
        }
      }
    }
    final_times.push(total)
    console.log(`Bridge: ${scenario.bridges[i].distance}, Total: ${total}`)
  }
  return final_times
}

// Find the combination of hikers that is the fastest to cross the bridge
const fastest_combo = hikers => {
  if (hikers.length % 2 !== 0) {
    throw new Error('Hikers array must be even')
  }
  // Space Required: O(n/2)
  const combo_speeds = []
  // Push combination hiker speeds into a new array
  // Each combination is an array of [combined speed, index 1, index 2]
  // O(n*n)
  for(let i = 0; i < hikers.length; i++) {
    for(let j = i + 1; j < hikers.length; j++) {
      combo_speeds.push([Math.max(hikers[i], hikers[j]), i, j])
    }
  }

  // Sort the speeds in ascending order and take the first element since it is the fastest
  // Javascript sorts runs at O(n log n)
  combo_speeds.sort((a,b) => a[0] - b[0])
  const fastest = combo_speeds[0]

  // Array of hikers that haven't crossed.
  const hikers_left = []
  // Array of hikers that have crossed.
  const hikers_right = []
  // O(n)
  for (let i = 0; i < hikers.length; i++) {
    if (i !== fastest[1] && i !== fastest[2]) {
      hikers_left.push(hikers[i])
    } else {
      hikers_right.push(hikers[i])
    }
  }

  // Returns a 2d array that hold hikers that have and haven't crossed.
  return [hikers_left, hikers_right]
}

exports.fastest_combo = fastest_combo
exports.hikers_bridge = hikers_bridge