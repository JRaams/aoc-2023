use std::collections::HashMap;
use std::fs;

#[derive(PartialEq, Clone, Copy)]
enum Direction {
    North,
    East,
    South,
    West,
}

fn get_next_pos(
    dir: Direction,
    y: usize,
    x: usize,
    max_y: usize,
    max_x: usize,
) -> Option<(usize, usize)> {
    if dir == Direction::North && y > 0 {
        return Some((y - 1, x));
    }

    if dir == Direction::East && x < max_x - 1 {
        return Some((y, x + 1));
    }

    if dir == Direction::South && y < max_y - 1 {
        return Some((y + 1, x));
    }

    if dir == Direction::West && x > 0 {
        return Some((y, x - 1));
    }

    return None;
}

fn slide(grid: &mut Vec<Vec<char>>, direction: Direction) {
    let mut has_change = false;

    for y in 0..grid.len() {
        for x in 0..grid[y].len() {
            let cell = grid[y][x];
            if cell != 'O' {
                continue;
            }

            let next_pos_result = get_next_pos(direction, y, x, grid.len(), grid[y].len());
            let next_cell_pos;

            match next_pos_result {
                Some(abc) => next_cell_pos = abc,
                None => continue,
            }

            let next_cell = grid[next_cell_pos.0][next_cell_pos.1];
            if next_cell == '.' {
                grid[next_cell_pos.0][next_cell_pos.1] = 'O';
                grid[y][x] = '.';
                has_change = true;
            }
        }
    }

    if has_change {
        slide(grid, direction);
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

    let mut state_to_index_map: HashMap<String, i32> = HashMap::new();
    let mut cycle = 1;
    let start;

    loop {
        slide(&mut grid, Direction::North);
        slide(&mut grid, Direction::West);
        slide(&mut grid, Direction::South);
        slide(&mut grid, Direction::East);

        let mut state = String::from("");
        for y in 0..grid.len() {
            for x in 0..grid[y].len() {
                state.push(grid[y][x]);
            }
            state.push('\n');
        }

        if state_to_index_map.contains_key(&state) {
            start = state_to_index_map.get(&state).unwrap();
            break;
        }

        state_to_index_map.insert(state, cycle);
        cycle += 1;
    }

    let period = cycle - start;
    let last_cycle = ((1_000_000_000 - start) % period) + start;

    for (key, value) in state_to_index_map {
        if value == last_cycle {
            let mut grid2 = key
                .lines()
                .map(|line| line.chars().collect::<Vec<_>>())
                .collect::<Vec<_>>();

            let load = calculate_load(&mut grid2);
            println!("{}", load);
            break;
        }
    }
}
