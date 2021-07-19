//Manual implementation of iterator in ES6
const myIterator = (data) => {
  let currentIndex = 0;
  return {
    next: () => {
      const done = currentIndex >= data.length;
      const value = done ? undefined : data[currentIndex];
      currentIndex++;
      return {
        value: value,
        done: done,
      };
    },
  };
};

const itrObj = myIterator([10, 20, 30]);

console.log(itrObj.next()); //{done: false,value: 10}
console.log(itrObj.next()); //{done: false,value: 20}
console.log(itrObj.next()); //{done: false,value: 30}
console.log(itrObj.next()); //{done: true,value: 30}
//for later calls output reamins same
console.log(itrObj.next()); //{done: true,value: 30}
console.log(itrObj.next()); //{done: true,value: 30}

//sample iterator that can be used with for..of loop
/*here an iterable is converted to iterator by using
  object representation and Symbol.iterator as another
  prop*/
const infiniteSequenceGenerator = {
  currentNumber: 0,

  [Symbol.iterator]() {
    return this;
  },
  next: function () {
    return {
      value: this.currentNumber++,
      done: false,
    };
  },
};
const iter = infiniteSequenceGenerator[Symbol.iterator]();

console.log(iter.next().value); // 0
console.log(iter.next().value); // 1
console.log(iter.next().value); // 2
console.log(iter.next().value); // 3
for (let item of iter) {
  if (item > 20) break;
  console.log(item);
}

/*Generator Example 
  When a generator function is called, it will
  not be executed, instead it returns an itera
  -tor*/
function* gen() {
  yield "Hello";
  yield "from";
  yield "generator";
}

const obj = gen();
console.log(obj.next()); // { value: "Hello", done: false}
console.log(obj.next()); // { value: "from", done: false}
console.log(obj.next()); // { value: "generator", done: false}
console.log(obj.next()); // { value: undefined, done: true}


/*A sample generator. As we can see
asynchronous code looks synchronous here*/
function getFlightDurations() {
  setTimeout(() => {
    flightIterator.next({
      Qatar: "39h 0m",
      Emirates: "40h 20m",
    });
  }, 1200);
}

function getFlightPrices() {
  setTimeout(function () {
    flightIterator.next({
      Qatar: "$2010",
      Emirates: "$1904",
    });
  }, 1000);
}
function* getFlights() {
  const allFlights = ["Qatar", "Emirates"];
  const flightDurations = yield getFlightDurations();

  const flightPrices = yield getFlightPrices();

  for (let flight of allFlights) {
    console.log(`New York to Auckland takes
  ${flightDurations[flight]} in ${flight} airlines for around
  ${flightPrices[flight]}`);
  }
}
const flightIterator = getFlights();
console.log(flightIterator.next());
