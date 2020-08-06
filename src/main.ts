const bunyan = require('bunyan');
const router = require('./api/router');


function newBumblebee() {
  let log = bunyan.createLogger({
      name: "bumblebee-logger",                     // Required
      level: 'trace',      // Optional, see "Levels" section
      stream: process.stdout,           // Optional, see "Streams" section
  });

  let r = router.buildRouter()
  log.info("bumblebee starting on port 3000")
  r.listen(3000)

}

newBumblebee()

/**
 * Some predefined delays (in milliseconds).
 */
export enum Delays {
  Short = 500,
  Medium = 2000,
  Long = 5000,
}

/**
 * Returns a Promise<string> that resolves after given time.
 *
 * @param {string} name - A name.
 * @param {number=} [delay=Delays.Medium] - Number of milliseconds to delay resolution of the Promise.
 * @returns {Promise<string>}
 */
function delayedHello(
  name: string,
  delay: number = Delays.Medium,
): Promise<string> {
  return new Promise((resolve: (value?: string) => void) =>
    setTimeout(() => resolve(`Hello, ${name}`), delay),
  );
}

/**
 * 
 * @param param1 the name of the something
 */
export async function dotuff(param1: string): Promise<number> {

  console.log(param1)
  return Promise.resolve(13)
}

// Below are examples of using ESLint errors suppression
// Here it is suppressing missing return type definitions for greeter function

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function greeter(name: string) {
  return await delayedHello(name, Delays.Long);
}
