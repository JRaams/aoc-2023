package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	contentBytes, err := os.ReadFile("input.txt")
	if err != nil {
		fmt.Print(err)
	}
	content := string(contentBytes)
	lines := strings.Split(strings.TrimSpace(content), "\n")
	arrangementsSum := int(0)

	for i := 0; i < len(lines); i++ {
		cache := map[string]int{}

		splitLine := strings.Split(lines[i], " ")
		springsStr := splitLine[0]
		numbersStr := strings.Split(splitLine[1], ",")

		numbers := make([]int, len(numbersStr))
		for j := 0; j < len(numbers); j++ {
			parsedNumber, _ := strconv.ParseInt(numbersStr[j], 10, 64)
			numbers[j] = int(parsedNumber)
		}

		unfoldedStrings := ""
		unfoldedNumbers := make([]int, 0)
		for k := 0; k < 5; k++ {
			unfoldedStrings += springsStr + "?"
			unfoldedNumbers = append(unfoldedNumbers, numbers...)
		}
		unfoldedStrings = unfoldedStrings[0 : len(unfoldedStrings)-1]

		arrangementsSum += countArrangements(unfoldedStrings, unfoldedNumbers, cache)
	}

	fmt.Println(arrangementsSum)
}

func countArrangements(springs string, groupSizes []int, cache map[string]int) int {
	key := springs + strconv.FormatInt(int64(len(groupSizes)), 10)
	_, hasKey := cache[key]
	if hasKey {
		return cache[key]
	}

	if springs == "" {
		if len(groupSizes) > 0 {
			return 0
		} else {
			return 1
		}
	}
	if len(groupSizes) == 0 {
		if strings.Contains(springs, "#") {
			return 0
		} else {
			return 1
		}
	}

	arrangements := int(0)

	if springs[0] != '#' {
		arrangements += countArrangements(springs[1:], groupSizes, cache)
	}

	if springs[0] != '.' {
		if isCurrentGroupValid(springs, groupSizes[0]) {
			springsToSkip := min(groupSizes[0]+1, len(springs))
			nextSprings := springs[springsToSkip:]
			arrangements += countArrangements(nextSprings, groupSizes[1:], cache)
		}
	}

	cache[key] = arrangements
	return arrangements
}

func isCurrentGroupValid(springs string, groupSize int) bool {
	if groupSize > len(springs) {
		return false
	}

	if strings.Contains(springs[0:groupSize], ".") {
		return false
	}

	if groupSize < len(springs) && springs[groupSize] == '#' {
		return false
	}

	return true
}
