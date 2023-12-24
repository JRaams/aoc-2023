set terminal png size 850,480 enhanced font "Monaspace Neon,10"
set output 'runtimes.png'

set grid ytics
set yrange [0:]
set style data histogram
set style histogram cluster
set style fill solid
set logscale y 10

set title "Solution runtime per day in ms" font ",16"
set xlabel "Day" font ",12"
set ylabel "Runtime (ms) (Log scale)" font ",12"
set datafile separator ","
               # using n -> nth column of csv
               # xtic(1) -> use first column as x-axis column labels
plot "runtimes.csv" using 2:xtic(1) title "Part A" linecolor "#009900", \
     "runtimes.csv" using 3 title "Part B" linecolor "#353562",