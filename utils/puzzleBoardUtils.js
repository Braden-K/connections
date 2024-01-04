export const shuffleArr = (arr) => {
  let currIndex = arr.length;
  let randIndex = 0;

  while (currIndex > 0) {
    randIndex = Math.floor(Math.random() * currIndex);
    currIndex--;

    tmp = arr[currIndex];
    arr[currIndex] = arr[randIndex];
    arr[randIndex] = tmp;
  }

  return arr;
};
