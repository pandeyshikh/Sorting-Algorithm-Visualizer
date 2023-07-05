const arraySize = 50;
const arrayContainer = document.getElementById('arrayContainer');
const generateBtn = document.getElementById('generateBtn');
const bubbleSortBtn = document.getElementById('bubbleSortBtn');
const selectionSortBtn = document.getElementById('selectionSortBtn');
const insertionSortBtn = document.getElementById('insertionSortBtn');
const mergeSortBtn = document.getElementById('mergeSortBtn');
const quickSortBtn = document.getElementById('quickSortBtn');
let array = [];
let explanationContainer = document.getElementById('explanationContainer');

generateBtn.addEventListener('click', generateArray);
bubbleSortBtn.addEventListener('click', bubbleSort);
selectionSortBtn.addEventListener('click', selectionSort);
insertionSortBtn.addEventListener('click', insertionSort);
mergeSortBtn.addEventListener('click', mergeSort);
quickSortBtn.addEventListener('click', quickSort);

function generateArray() {
  array = [];
  arrayContainer.innerHTML = '';
  explanationContainer.innerHTML = '';

  for (let i = 0; i < arraySize; i++) {
    const value = Math.floor(Math.random() * 100) + 1;
    array.push(value);
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.height = `${value * 3}px`;
    arrayContainer.appendChild(bar);
  }
}

async function bubbleSort() {
  explanationContainer.innerHTML = '';
  explanationContainer.innerHTML += '<p>Bubble Sort:</p>';

  for (let i = 0; i < arraySize - 1; i++) {
    for (let j = 0; j < arraySize - i - 1; j++) {
      const bar1 = arrayContainer.children[j];
      const bar2 = arrayContainer.children[j + 1];
      bar1.style.backgroundColor = 'red';
      bar2.style.backgroundColor = 'red';

      await delay(100);

      const value1 = array[j];
      const value2 = array[j + 1];
      if (value1 > value2) {
        array[j] = value2;
        array[j + 1] = value1;

        bar1.style.height = `${value2 * 3}px`;
        bar2.style.height = `${value1 * 3}px`;
      }

      bar1.style.backgroundColor = 'blue';
      bar2.style.backgroundColor = 'blue';
    }
  }
}

async function selectionSort() {
  explanationContainer.innerHTML = '';
  explanationContainer.innerHTML += '<p>Selection Sort:</p>';

  for (let i = 0; i < arraySize - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < arraySize; j++) {
      const bar1 = arrayContainer.children[minIndex];
      const bar2 = arrayContainer.children[j];
      bar1.style.backgroundColor = 'red';
      bar2.style.backgroundColor = 'red';

      await delay(100);

      const minValue = array[minIndex];
      const currValue = array[j];
      if (currValue < minValue) {
        minIndex = j;
      }

      bar1.style.backgroundColor = 'blue';
      bar2.style.backgroundColor = 'blue';
    }

    if (minIndex !== i) {
      const minValue = array[minIndex];
      const currValue = array[i];
      array[minIndex] = currValue;
      array[i] = minValue;

      const bar1 = arrayContainer.children[minIndex];
      const bar2 = arrayContainer.children[i];
      bar1.style.height = `${currValue * 3}px`;
      bar2.style.height = `${minValue * 3}px`;
    }
  }
}

async function insertionSort() {
  explanationContainer.innerHTML = '';
  explanationContainer.innerHTML += '<p>Insertion Sort:</p>';

  for (let i = 1; i < arraySize; i++) {
    const key = array[i];
    let j = i - 1;

    while (j >= 0 && array[j] > key) {
      const bar1 = arrayContainer.children[j + 1];
      const bar2 = arrayContainer.children[j];
      bar1.style.backgroundColor = 'red';
      bar2.style.backgroundColor = 'red';

      await delay(100);

      array[j + 1] = array[j];

      bar1.style.height = `${array[j] * 3}px`;
      bar2.style.height = `${key * 3}px`;

      bar1.style.backgroundColor = 'blue';
      bar2.style.backgroundColor = 'blue';

      j--;
    }

    array[j + 1] = key;
  }
}

async function mergeSort() {
  explanationContainer.innerHTML = '';
  explanationContainer.innerHTML += '<p>Merge Sort:</p>';

  await mergeSortRecursive(0, arraySize - 1);
}

async function mergeSortRecursive(low, high) {
  if (low < high) {
    const mid = Math.floor((low + high) / 2);

    await mergeSortRecursive(low, mid);
    await mergeSortRecursive(mid + 1, high);
    await merge(low, mid, high);
  }
}

async function merge(low, mid, high) {
  const leftSize = mid - low + 1;
  const rightSize = high - mid;

  const leftArray = array.slice(low, low + leftSize);
  const rightArray = array.slice(mid + 1, mid + 1 + rightSize);

  let i = 0;
  let j = 0;
  let k = low;

  while (i < leftSize && j < rightSize) {
    const bar1 = arrayContainer.children[k];
    bar1.style.backgroundColor = 'red';

    await delay(100);

    const leftValue = leftArray[i];
    const rightValue = rightArray[j];
    if (leftValue <= rightValue) {
      array[k] = leftValue;
      i++;
    } else {
      array[k] = rightValue;
      j++;
    }

    bar1.style.height = `${array[k] * 3}px`;
    bar1.style.backgroundColor = 'blue';

    k++;
  }

  while (i < leftSize) {
    const bar1 = arrayContainer.children[k];
    bar1.style.backgroundColor = 'red';

    await delay(100);

    array[k] = leftArray[i];
    bar1.style.height = `${array[k] * 3}px`;
    bar1.style.backgroundColor = 'blue';

    i++;
    k++;
  }

  while (j < rightSize) {
    const bar1 = arrayContainer.children[k];
    bar1.style.backgroundColor = 'red';

    await delay(100);

    array[k] = rightArray[j];
    bar1.style.height = `${array[k] * 3}px`;
    bar1.style.backgroundColor = 'blue';

    j++;
    k++;
  }
}

async function quickSort() {
  explanationContainer.innerHTML = '';
  explanationContainer.innerHTML += '<p>Quick Sort:</p>';

  await quickSortRecursive(0, arraySize - 1);
}

async function quickSortRecursive(low, high) {
  if (low < high) {
    const pivotIndex = await partition(low, high);
    await quickSortRecursive(low, pivotIndex - 1);
    await quickSortRecursive(pivotIndex + 1, high);
  }
}

async function partition(low, high) {
  const pivot = array[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    const bar1 = arrayContainer.children[j];
    bar1.style.backgroundColor = 'red';

    await delay(100);

    const currValue = array[j];
    if (currValue < pivot) {
      i++;
      const temp = array[i];
      array[i] = currValue;
      array[j] = temp;

      const bar2 = arrayContainer.children[i];
      bar2.style.height = `${currValue * 3}px`;
      bar1.style.height = `${temp * 3}px`;
    }

    bar1.style.backgroundColor = 'blue';
  }

  const temp = array[i + 1];
  array[i + 1] = array[high];
  array[high] = temp;

  const bar3 = arrayContainer.children[i + 1];
  const bar4 = arrayContainer.children[high];
  bar3.style.height = `${array[i + 1] * 3}px`;
  bar4.style.height = `${temp * 3}px`;

  return i + 1;
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

generateArray();