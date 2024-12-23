export const directionKey = {
  N: 'N',
  NE: 'NE',
  E: 'E',
  SE: 'SE',
  S: 'S',
  SW: 'SW',
  W: 'W',
  NW: 'NW',
} as const

export type Direction = keyof typeof directionKey

type X = number
type Y = number

type Coordinates = [X, Y]

export const directions: Record<Direction, Coordinates> = {
  N: [0, -1],
  NE: [1, -1],
  E: [1, 0],
  SE: [1, 1],
  S: [0, 1],
  SW: [-1, 1],
  W: [-1, 0],
  NW: [-1, -1],
}

export const cardinalDirections = {[directionKey.N]: directions.N, [directionKey.E]: directions.E, [directionKey.S]: directions.S, [directionKey.W]: directions.W} as const

export const turn180Degrees = (direction: Direction): Direction => {
  return turn90DegreesClockWise(turn90DegreesClockWise(direction));
};

export const turn90DegreesClockWise = (direction: Direction): Direction => {
  return (
    {
      [directionKey.N]: directionKey.E,
      [directionKey.NE]: directionKey.SE,
      [directionKey.E]: directionKey.S,
      [directionKey.SE]: directionKey.SW,
      [directionKey.S]: directionKey.W,
      [directionKey.SW]: directionKey.NW,
      [directionKey.W]: directionKey.N,
      [directionKey.NW]: directionKey.NE,
    }[direction] || directionKey.N
  );
};

export const turn45DegreesClockWise = (direction: Direction): Direction => {
  return (
    {
      [directionKey.N]: directionKey.NE,
      [directionKey.NE]: directionKey.E,
      [directionKey.E]: directionKey.SE,
      [directionKey.SE]: directionKey.S,
      [directionKey.S]: directionKey.SW,
      [directionKey.SW]: directionKey.W,
      [directionKey.W]: directionKey.NW,
      [directionKey.NW]: directionKey.N,
    }[direction] || directionKey.N
  );
};

export const turn90DegreesCounterClockwise = (
  direction: Direction
): Direction => {
  return (
    {
      [directionKey.N]: directionKey.W,
      [directionKey.NW]: directionKey.SW,
      [directionKey.W]: directionKey.S,
      [directionKey.SW]: directionKey.SE,
      [directionKey.S]: directionKey.E,
      [directionKey.SE]: directionKey.NE,
      [directionKey.E]: directionKey.N,
      [directionKey.NE]: directionKey.NW,
    }[direction] || directionKey.N
  );
};

export const turn45DegreesCounterClockwise = (
  direction: Direction
): Direction => {
  return (
    {
      [directionKey.N]: directionKey.NW,
      [directionKey.NW]: directionKey.W,
      [directionKey.W]: directionKey.SW,
      [directionKey.SW]: directionKey.S,
      [directionKey.S]: directionKey.SE,
      [directionKey.SE]: directionKey.E,
      [directionKey.E]: directionKey.NE,
      [directionKey.NE]: directionKey.N,
    }[direction] || directionKey.N
  );
};
