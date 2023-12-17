# Solution runtime plotting

## 1. Requirements

GNUPlot: http://www.gnuplot.info/

Hyperfine: https://github.com/sharkdp/hyperfine

## 2. Getting data for a solution

### 2.1 Deno

`hyperfine -w 3 "deno run --allow-read [day]/[part].ts"`

For example:

```bash
$ hyperfine -w 3 "deno run --allow-read 01/a.ts"
Benchmark 1: deno run --allow-read 01/a.ts
  Time (mean ± σ):      17.2 ms ±   0.6 ms    [User: 8.3 ms, System: 9.1 ms]
  Range (min … max):    16.4 ms …  19.0 ms    166 runs
```

### 2.2 Rust

`cd rust/[day/part]`

`cargo build --release`

`hyperfine -w 3 "./target/release/aoc-2023-rust"`

For example:

```bash
$ cd rust/14a
$ cargo build --release
    Finished release [optimized] target(s) in 0.00s
$ hyperfine -w 3 "./target/release/aoc-2023-rust"
Benchmark 1: ./target/release/aoc-2023-rust
  Time (mean ± σ):     712.6 µs ± 126.3 µs    [User: 330.9 µs, System: 611.5 µs]
  Range (min … max):   573.0 µs … 1478.0 µs    1827 runs
```

## 3. Generating the plot as png image

- Update `gnuplot/runtimes.csv` for the selected day/part, filling in the 'mean'
  time in ms.

- `cd gnuplot`

- `gnuplot -c script.gnuplot`
