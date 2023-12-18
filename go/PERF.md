`go build`

`perf record --call-graph dwarf ./12b`

`perf script > perf.data.firefox`

Drop into https://profiler.firefox.com/
