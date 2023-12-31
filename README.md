# Advent of Code 2023

https://adventofcode.com/2023 by [Eric Wastl](http://was.tl/)

Solutions using TypeScript \w Deno v1.38

![Home page ascii art](./assets/home.png)

### 1. Requirements

- Deno https://docs.deno.com/runtime/manual/getting_started/installation

### 2. Running

Go to the folder of the desired day

`cd 01`

Run part A or B, while allowing all permissions

`deno run --allow-read a.ts`

OR

`deno run --allow-read [daynumber]/[part].ts`

For example: `deno run --allow-read 01/a.ts`

### 3. Testing

`cd 01`

`deno test .`

### 4. Debugging

Debugging in Visual Studio Code

1. Open the desired file in the editor

2. Set breakpoints

3. Press F5

### 5. Days

1. [**Trebuchet?!**] Checking strings for first and last appearances of
   substrings
2. [**Cube Conundrum**] Bag & cube game, parsing input lines by extracting
   numbers
3. [**Gear Ratios**] Parsing a giant grid with multi column numbers
4. [**Scratchcards**] Lidl recursion on scratchcard winnings
5. [**If You Give A Seed A Fertilizer**] Collapsing multiple ranges of very
   large numbers
6. [**Wait For It**] Quick maths with quadratic formula
7. [**Camel Cards**] Poker with joker cards
8. [**Haunted Wasteland**] Simultaneous node traversal with LCM
9. [**Mirage Maintenance**] Predicting next value of number sequence via
   extrapolation
10. [**Pipe Maze**] Grid problem with multiple connected pipes creating a single
    continuous loop. Using a parity counter to keep track of passed walls to
    calculate area inside the loop.
11. [**Cosmic Expansion**] Calculating distances of all combinations of items in
    an expanding grid.
12. [**Hot Springs**] Generating and validating arrangements of strings with
    joker characters
13. [**Point of Incidence**] Finding lines between columns and rows on grids to
    fold over and create a mirror image
14. [**Parabolic Reflector Dish**] Rolling balls NESW on a tilting grid, cycle
    detection to prevent doing this a literal billion times.
15. [**Lens Library**] Creating a simple hashing function & some simple array
    operations (Did day 5 and 15 get swapped..?)
16. [**The Floor Will Be Lava**] Manouvering a light beam through a grid of
    lasers with offset mirrors, tricky rotations.
17. [**Clumsy Crucible**] Modified Dijkstra's algorithm with a twist: maximum of
    3 steps in the same direction then a required 90 degree turn. Using a heap
    as priority queue to get candidates for the next node based on weight.
18. [**Lavaduct Lagoon**] Calculating area of polynomal by first generating
    points on a grid followed by use of shoelace formula and Pick's theorem to
    find whole integer points inside the trench. Finally adding the whole trench
    points to said number to get our solution.
19. [**Aplenty**] Day 5 all over again: finding valid ranges of very large ints
20. [**Pulse Propagation**] Mini electronic machine with low/high pulses and
    boolean operations, cycle detection like day 14.
21. [**Step Counter**] Counting reachable positions in an infinitely repeating
    grid, using lagrange interpolation to predict values very far away.
22. [**Sand Slabs**] Falling jenga block simulation (without tilting physics)
23. [**A Long Walk**] Finding longest possible path start-end in a maze-like
    grid
24. [**Never Tell Me The Odds**] Calculating intersections between multiple
    linear equations (a) and creating an intersecting line in 3D out of thin air
    (b).
25. [**Snowverload**] Splitting up a graph of nodes by cutting 3 connections.

### 6. Solution runtime

![Bar chart of solution runtime in ms](./gnuplot/runtimes.png)

Notes:

1. Day 12 rewritten in Go (1.3 ms / 44 ms [32 ms with goroutines]) vs Deno (34
   ms / 270 ms)
2. Day 14 rewritten in Rust (0.716 ms / 10 ms) vs Deno (20 ms / 763 ms)
