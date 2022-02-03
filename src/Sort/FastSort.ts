function quickSort(array: number[]): number[] {
  // our split point in array, i use math random for more efficiency
  let pivot = array[Math.floor(Math.random() * array.length)];

  // here we storing all numbers that less than pivot
  let less = array.filter((v) => v < pivot);

  // here we storing all numbers that higher than pivot
  let greater = array.filter((v) => v > pivot);

  // if array length less than 2, means that we sorted our array
  if (array.length < 2) {
    return array;
  }

  // otherwise, we recursively run out function until all values will be sorted
  return [...quickSort(less), pivot, ...quickSort(greater)];
}

export default quickSort;
