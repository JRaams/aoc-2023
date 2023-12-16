# Solution runtime plotting

## 1. Requirements

GNUPlot: http://www.gnuplot.info/

Hyperfine: https://github.com/sharkdp/hyperfine

## 2. Getting data for a solution

`hyperfine -w 3 "deno run --allow-read [day]/[part].ts"`

For example:

```bash
$ hyperfine -w 3 "deno run --allow-read 01/a.ts"
Benchmark 1: deno run --allow-read 01/a.ts
  Time (mean ± σ):      17.2 ms ±   0.6 ms    [User: 8.3 ms, System: 9.1 ms]
  Range (min … max):    16.4 ms …  19.0 ms    166 runs
```

## 3. Generating the plot as png image

- Update `gnuplot/runtimes.csv` for the selected day/part, filling in the 'mean'
  time in ms.

- `cd gnuplot`

- `gnuplot -c script.gnuplot`
