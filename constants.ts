export const directions = {
  n: [0, -1],
  e: [1, 0],
  s: [0, 1],
  w: [-1, 0],
}

export const diagonals = {
  ne: [1, -1],
  se: [1, 1],
  sw: [-1, 1],
  nw: [-1, -1],
}

export const allDirections = {
  ...directions,
  ...diagonals
}
