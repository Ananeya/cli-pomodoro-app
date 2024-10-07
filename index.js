const readline = require("readline");

//for reading inputs
const userInput = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//ask a question and return a promise for the answer
function askQuestion(query) {
  return new Promise((resolve) =>
    userInput.question(query, (answer) => resolve(answer))
  );
}

//ask for timer duration
async function timerDurationQuestion() {
  const duration = await askQuestion("Timer Duration? (default: 25): ");
  return duration || "25"; // Default value
}

// Function to ask for break duration
async function breakDurationQuestion() {
  const breakTime = await askQuestion("Break Duration? (default: 5): ");
  return breakTime || "5"; // Default value
}

// Function to ask for the number of cycles
async function numOfCyclesQuestion() {
  const cycles = await askQuestion("Number of cycles? (default: 4): ");
  return cycles || "4"; // Default value
}

// start the timer
function startTimer(duration, type = "Work") {
  return new Promise((resolve) => {
    console.log(`${type}: Timer started for ${duration} minutes`);
    const endTime = new Date(Date.now() + Number(duration * 60) * 1000); // Calculate end time

    //update the timer every second
    const interval = setInterval(function () {
      const currentTime = new Date();
      const timeLeft = endTime.getTime() - currentTime.getTime(); // milliseconds
      const minutes = Math.floor(timeLeft / (60 * 1000)); // Minutes
      const seconds = Math.floor((timeLeft % (60 * 1000)) / 1000); // Seconds

      if (timeLeft <= 0) {
        clearInterval(interval); // Stop the interval when time is up
        console.log(`${type}: Timer ended`);
        resolve(); // Resolve the promise to indicate the timer has finished
      } else {
        process.stdout.write(
          `\r${type} timer: ${minutes}:${seconds < 10 ? "0" : ""}${seconds} `
        );
      }
    }, 1000);
  });
}

// Main function
async function main() {
  console.log("Welcome to the Pomodoro CLI Timer");

  const duration = await timerDurationQuestion();
  const breakTime = await breakDurationQuestion();
  const numOfCycles = await numOfCyclesQuestion();

  // Convert the cycles and loop through the cycles
  for (let i = 0; i < Number(numOfCycles); i++) {
    console.log(`\nCycle ${i + 1} of ${numOfCycles}`);

    // work timer
    await startTimer(Number(duration), "Work");

    // break timer
    await startTimer(Number(breakTime), "Break");
  }

  console.log("Cycle completed");
  userInput.close();
}

main();
