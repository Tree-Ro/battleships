function Ship(length) {
  let shipLength = length;
  let timesHit = 0;

  function hit() {
    timesHit++;
    return timesHit;
  }

  function isSunk() {
    return timesHit >= shipLength;
  }

  return { hit, isSunk };
}

export default Ship;
