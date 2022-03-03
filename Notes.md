# Hikers

#### Installation & Execution
- `npm i`
- `node main.js <filename>.yaml <verbose|true>`
- `npm test`

#### Prompt
1. Strategy(s) - there are several ways to solve the problem, you can provide more than
one. The goal is to show us how you think.
2. Architecture and design- we want to see how well you architect and design solutions to
complex problems.
3. Testing - we want to see how you approach testing of the solution.
4. Standards and best practices.
5. Explanation - How well you can describe and explain your solution is very important.

- Extra Credit
1. How would you write a program that could brute force the problem?
The solution I've provided is the brute force solution since it calculates the fastest hiker combination.
2. How would you write a program that could learn the best approach by training it?
In order to learn the best approach the hiker combinations needs to be memoized. This has not been implement
but if I were to implement it it would take the place of the `fastest_combination` subroutine. Essentially
if the same array of hikers fastest combinations has already been calculated it would instead use the
memoized calculation instead of running `fastest_combination`.

#### Solution
The solution relies on solving two sub problems that have become aparant through manual trial and error.
The first problem is to always transfer a pair of hikers with the fastest times if there are an even
number of hikers to be transferred. In order to acheive this a sub-routine is created to first get all
all combination of paired hikers. Then from those combinations the fastest combination is selected. The
two selected hikers are removed from the left side array and stored in a right side array. If there is
an odd number of hikers on the left side of the bridge then the fastest hiker is removed from the selection
process. This is done so that the fastest hiker travels with the least number of slower hikers. On the next
returning trip the fastest hiker from the right side is returned to the left side. The two fastest hikers
then travel together, reducing the total travel time.

The next step after moving hikers from the left side to the right side of the bridge is to move the
hiker with the fastest time to the left side of the bridge. The fastest hiker is always selected as
the torch bearer because they will take the shortest amount of time to return as well as most likely
not being the one to slow down the other hikers crossing the bridge.

This pattern continues to play out until there are no more hikers on the left side of the bridge. This
is controlled by a while loop that checks to see if the left side hiker's array is empty.

#### Testing
The testing of this program has been primarily done through manually writing out the provided test cases
and checking of the execution of the program matches the calculations done on paper. I have also written
unit tests for both `hikers_bridge` and `fastest_combo` methods.

During the process of developing the problem I have added logs in order to check each step of execution.

#### Observations
- The fastest hiker that has already crossed the bridge should be the one to return.
- I've noticed that the trick in this problem is that the fastest hiker shouldn't always
be the one to be paired when crossing the bridge. When there is an odd number of hikers that
haven't crossed yet, it's better for the slower hikers to be paired. This can be observed with
the example below. Looking that this example makes it aparant transferring the fastest time
with the two slowest times makes it so that the two slowest time must transfer over the bridge
one at a time essentially adding to slower times to total time instead of having only the slowest
time go cross the bridge once.
  - LEFT: 1 5 10 || RIGHT: 2
  - Slower, picks fastest and second fastest
    - Select 1 and 5 (+5)
    - LEFT: 10 || RIGHT: 2 1 5
    - Return 1 (+1)
    - LEFT: 1 10 || RIGHT: 2 5
    - Select 1 and 10 (+10)
    - LEFT: || RIGHT: 2 5 1 10
    - TOTAL: 16
  - Faster, pick 2 slowest
    - Select 5 and 10 (+10)
    - LEFT: 1 || RIGHT: 2 5 10
    - Return 2 (+2)
    - LEFT: 1 2 || RIGHT: 5 10
    - Select 1 and 2 (+2)
    - TOTAL: 14