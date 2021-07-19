/* A typical Promise Template
   It takes a executor function which then
   calls either resolve or rejct */
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("Resonse Data");
    resolve("Response Data"); //this will never execute
  }, 2000);
});

const onResolved = (data) => console.log("Resolved", data);
const onRejected = (data) => console.log("Rejected", data);
promise.then(onResolved).catch(onRejected);

/* Promises can be chained as .then 
   and .catch always returns a promise  */

const promise_1 = new Promise((resolve, reject) => resolve("Bond"));

promise_1
  .then((data) => `${data}, James ${data}`)
  .then((str) => `Hello, I’m ${str}!`)
  .then((str) => console.log(str))
  .catch((str) => console.log(str));
// Hello, I’m Bond, James Bond!

/* Comining Promises with Promise.all */
const p1 = Promise.resolve(50);
const p2 = 43;
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("foo");
  }, 100);
});

//Here all promises are resolved and  .then() is called
Promise.all([p1, p2, p3]).then((data) => console.log(data));
// [3, 42, "foo"]

/* If we want the .then() to be called if any one 
of the promises is resolved, we call .race()*/

const delay = (t) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, t);
  });
};

Promise.race([
  delay(5000).then(() => {
    return "5000";
  }),
  delay(3000).then(() => {//this will always be returned as this gets resolved first
    return "3000";
  }),
])
  .then((data) => {
    console.log(data);
  })
  .catch((data) => {
    console.log("Error", data);
  });
//3000
/* As observed from the above output
   this can be used for API calls, 
   if we dont get a response in a defined time,
    we could  return a defult object */
