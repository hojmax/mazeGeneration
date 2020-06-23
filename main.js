let maze

function setup() {
  cnv = createCanvas(600, 600)
  maze = getGrid(25, 25)
  fillMaze()
  drawMaze(0, 0, 600 / 25)
}


function getGrid(n, m) {
  output = new Array(n)
  for (i = 0; i < n; i++) {
    output[i] = new Array(m)
    for (j = 0; j < m; j++) {
      output[i][j] = {
        t: [],
        f: undefined
      }
    }
  }
  return output
}

function getOpenCandidates(pos) {
  output = []
  for (i = -1; i <= 1; i += 2) {
    if (pos[0] + i >= 0 && pos[0] + i < maze[0].length && maze[pos[1]][pos[0] + i].f == undefined) {
      output.push([pos[0] + i, pos[1]])
    }
    if (pos[1] + i >= 0 && pos[1] + i < maze.length && maze[pos[1] + i][pos[0]].f == undefined) {
      output.push([pos[0], pos[1] + i])
    }
  }
  return output
}

function drawMaze(x, y, scale) {
  // background(200)
  // Outlining box
  line(x, y, x + scale * maze[0].length, y)
  line(x, y + scale * maze.length, x + scale * maze[0].length, y + scale * maze.length)
  line(x, y + 1 * scale, x, y + scale * maze.length)
  line(x + scale * maze[0].length, y, x + scale * maze[0].length, y + scale * (maze.length - 1))
  for (i = 0; i < maze.length; i++) {
    for (j = 0; j < maze[0].length; j++) {
      if (j + 1 < maze[0].length && !areEqual([j + 1, i], maze[i][j]["f"]) && !inArray([j + 1, i], maze[i][j]["t"])) {
        line(x + (j + 1) * scale, y + i * scale, x + (j + 1) * scale, y + (i + 1) * scale)
      }
      if (i + 1 < maze.length && !areEqual([j, i + 1], maze[i][j]["f"]) && !inArray([j, i + 1], maze[i][j]["t"])) {
        line(x + j * scale, y + (i + 1) * scale, x + (j + 1) * scale, y + (i + 1) * scale)
      }
    }
  }
}

function areEqual(a1, a2) {
  return a1[0] == a2[0] && a1[1] == a2[1]
}

function inArray(a1, b1) {
  for (e of b1) {
    if (areEqual(a1, e)) {
      return true
    }
  }
  return false
}

function fillMaze() {
  let changedCount = 0
  let endCount = maze.length * maze[0].length
  let pos = [0, 0]
  while (changedCount != endCount) {
    open = getOpenCandidates(pos)
    if (open.length > 0) {
      next = random(open)
      maze[pos[1]][pos[0]].t.push(next)
      maze[next[1]][next[0]].f = pos
      pos = next
      changedCount++
    } else {
      pos = maze[pos[1]][pos[0]].f
    }
  }
}
