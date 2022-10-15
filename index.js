import colors from "colors";

const trafficLight = (a, b) => {
  const numbers = [];

  if (!a || !b || !Number.isInteger(a) || !Number.isInteger(b)) {
    console.log(
      colors.bgRed(
        "Введите верный диапазон из целых чисел, где первое число меньше второго"
      )
    );
    return;
  }

  nextPrime: for (let i = a; i <= b; i++) {
    if (i === 1) {
      continue;
    }
    for (let j = 2; j < i; j++) {
      if (i % j === 0) continue nextPrime;
    }

    numbers.push(i);
  }

  if (!numbers.length) {
    console.log(colors.bgRed("В данном диапазоне нет простых чисел"));
  }

  for (let i = 0; i < numbers.length; i++) {
    if (i % 3 === 0) {
      console.log(colors.green(numbers[i]));
    }
    if (i % 3 === 1) {
      console.log(colors.yellow(numbers[i]));
    }
    if (i % 3 === 2) {
      console.log(colors.red(numbers[i]));
    }
  }
};

trafficLight(+process.argv[2], +process.argv[3]);
