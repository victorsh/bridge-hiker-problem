# Hikers BAD SOLUTION

This is an incorrect solution since it doesn't take into account that the torch needs to travel back and forth.
After re-reading the prompt I noticed that it made more sense for the torch to go back and forth and I had
incorrectly thought that this was not something to take into account.
I've kept it in here to outline some of my thought processes as I was working on this.

#### Prompt
1. Strategy(s) - there are several ways to solve the problem, you can provide more than
one. The goal is to show us how you think.

Try each scenario individually, use all possible combinations of hikers and output the
combinations that are the quickest.
These calculations can be done for each bridge since the number of hikers is unknown
until the main team gets to the bridge.
After knowing how many hikers there are, sort all hiker speeds in decending order.
Since all hiker speeds are in descending order the most optimal pairing would be combinding two hiker
speeds at a time as the speeds are iterated over.

2. Architecture and design- we want to see how well you architect and design solutions to
complex problems.
3. Testing - we want to see how you approach testing of the solution.
4. Standards and best practices.
5. Explanation - How well you can describe and explain your solution is very important.

#### Extra Credit
- How would you write a program that could brute force the problem?
- How would you write a program that could learn teh best approach by training it?
  - This instantly sounds like a dynamic programming problem
  - The idea would be to initially store the most optimal times of a combination of hikers

#### Observations

- It's always better to go 2 at a time
- If there are an odd number of choices its better to pair hikers that have a the shortest difference in speed
  - This can be observed in the second case where there are speeds 100, 50, 20, 10, 2.5
  - The combination (100, 50), (20, 10), 2.5 = 52
  - The combination 100, (50, 20), (20, 2.5) = 46

#### Solution Descending Combination
The solution first sorts all hiker speeds in descending order and puts them all into one array. It then iterates over this array 2 at a time and pairs the hikers as it goes down the list hikers. One caveat to this is if there is an odd number of hikers. In this case one of the hikers must go alone and it is best to check which hiker that should be to get the optimal time. Per each 2 step iteration another check is made to get the smallest difference in speed. The smallest difference in speed results in a faster crossing time since the slowest of the paired hikers reduces the faster hikers speed less.

Time Complexity: O(n * ((m log m) + m/2) where n is the number of bridges and m is the number of hikers per bridge. (m log m) is the time it takes to sort the array of hikers.

Space Complexity: O(m) where m is the number of hikers.