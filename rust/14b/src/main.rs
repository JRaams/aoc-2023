use std::fs;

fn slide_north(grid: &mut Vec<Vec<char>>) {
    for y in 1..grid.len() {
        for x in 0..grid[y].len() {
            if grid[y][x] != 'O' {
                continue;
            }

            let mut next_y = y;
            while next_y > 0 && grid[next_y - 1][x] == '.' {
                next_y -= 1;
            }

            if next_y != y {
                grid[next_y][x] = 'O';
                grid[y][x] = '.';
            }
        }
    }
}

fn slide_west(grid: &mut Vec<Vec<char>>) {
    for y in 0..grid.len() {
        for x in 1..grid[y].len() {
            if grid[y][x] != 'O' {
                continue;
            }

            let mut next_x = x;
            while next_x > 0 && grid[y][next_x - 1] == '.' {
                next_x -= 1;
            }

            if next_x != x {
                grid[y][next_x] = 'O';
                grid[y][x] = '.';
            }
        }
    }
}

fn slide_south(grid: &mut Vec<Vec<char>>) {
    for y in (0..grid.len() - 1).rev() {
        for x in 0..grid[y].len() {
            if grid[y][x] != 'O' {
                continue;
            }

            let mut next_y = y;
            while next_y < grid.len() - 1 && grid[next_y + 1][x] == '.' {
                next_y += 1;
            }

            if next_y != y {
                grid[next_y][x] = 'O';
                grid[y][x] = '.';
            }
        }
    }
}

fn slide_east(grid: &mut Vec<Vec<char>>) {
    for y in 0..grid.len() {
        for x in (0..grid[y].len() - 1).rev() {
            if grid[y][x] != 'O' {
                continue;
            }

            let mut next_x = x;
            while next_x < grid[y].len() - 1 && grid[y][next_x + 1] == '.' {
                next_x += 1;
            }

            if next_x != x {
                grid[y][next_x] = 'O';
                grid[y][x] = '.';
            }
        }
    }
}

fn calculate_load(grid: &mut Vec<Vec<char>>) -> usize {
    let mut load = 0;

    for y in 0..grid.len() {
        let rocks = grid[y].iter().filter(|x| **x == 'O').count();
        load += rocks * (grid.len() - y)
    }

    return load;
}

fn main() {
    let content = fs::read_to_string("./src/input.txt").unwrap();
    let mut grid = content
        .lines()
        .map(|line| line.chars().collect::<Vec<_>>())
        .collect::<Vec<_>>();

    let mut visited_grids: Vec<Vec<Vec<char>>> = vec![grid.clone()];

    for cycle in 1..1_000_000_000 {
        slide_north(&mut grid);
        slide_west(&mut grid);
        slide_south(&mut grid);
        slide_east(&mut grid);

        if visited_grids.contains(&grid) {
            let start = visited_grids.iter().position(|x| x == &grid).unwrap();
            let period = cycle - start;
            let last_cycle = ((1_000_000_000 - start) % period) + start;
            let load = calculate_load(&mut visited_grids[last_cycle]);
            println!("{}", load);
            return;
        }

        visited_grids.push(grid.clone());
    }
}
