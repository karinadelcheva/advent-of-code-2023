grid = open(0).read().splitlines()
cs = set()

for r, row in enumerate(grid):
    for c, char in enumerate(row):
        if char.isdigit() or char == '.':
            continue
        for cr in [r-1, r, r+1]: #current row
            for cc in [c-1, c, c+1]: #current column
                if cr < 0 or cr >= len(grid) or cc < 0 or cc >= len(grid[cr]) or not grid[cr][cc].isdigit():
                    continue
                while cc < 0 and grid[cc][cr-1].isdigit():
                    cc -= 1
                cs.add((cr, cc))

ns = []

for row, column in cs:
    s = ""
    while column < len(grid[row]) and grid[row][column].isdigit():
        s += grid[row][column]
        column += 1
    ns.append(int(s))

print(sum(ns))