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
		splitLine := strings.Split(lines[i], " ")
		springsStr := splitLine[0]
		numbersStr := strings.Split(splitLine[1], ",")

		numbers := make([]int, len(numbersStr))
		for j := 0; j < len(numbers); j++ {
			parsedNumber, _ := strconv.ParseInt(numbersStr[j], 10, 64)
			numbers[j] = int(parsedNumber)
		}

		arrangementsSum += countArrangements(springsStr, numbers)
	}

	fmt.Println(arrangementsSum);
}

func countArrangements(springs string, groupSizes []int) (int) {
	if springs == "" {
		if len(groupSizes) > 0 {
			return 0;
		} else {
			return 1;
		}
	}
	if len(groupSizes) == 0 {
		if strings.Contains(springs, "#") {
			return 0
		} else {
			return 1;
		}
	}

	arrangements := int(0);

	if springs[0] != '#' {
		arrangements += countArrangements(springs[1:], groupSizes);
	}

	if springs[0] != '.' {
		if isCurrentGroupValid(springs, groupSizes[0]) {
			springsToSkip := min(groupSizes[0] + 1, len(springs))
			nextSprings := springs[springsToSkip:]
			arrangements += countArrangements(nextSprings, groupSizes[1:])
		}
	}

	return arrangements
}

func isCurrentGroupValid(springs string, groupSize int) (bool) {
	if groupSize > len(springs) {
		return false;
	}

	if strings.Contains(springs[0:groupSize], ".") {
		return false;
	}

	if groupSize < len(springs) && springs[groupSize] == '#' {
		return false;
	}

	return true;
}
