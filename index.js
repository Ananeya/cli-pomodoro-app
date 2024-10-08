const readline = require("readline");

// For reading inputs
const userInput = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Ask a question and return a promise for the answer
function askQuestion(query) {
  return new Promise((resolve) =>
    userInput.question(query, (answer) => resolve(answer))
  );
}

// Ask for work timer duration
async function timerDurationQuestion() {
  const duration = await askQuestion("Timer Duration? (default: 25): ");
  return duration || "25"; // Default value
}

// Ask for break duration
async function breakDurationQuestion() {
  const breakTime = await askQuestion("Break Duration? (default: 5): ");
  return breakTime || "5"; // Default value
}

// Ask for number of cycles
async function numOfCyclesQuestion() {
  const cycles = await askQuestion("Number of cycles? (default: 4): ");
  return cycles || "4"; // Default value
}

// Ask for long break duration
async function longBreakDurationQuestion() {
  const longBreakTime = await askQuestion(
    "Long Break Duration? (default: 15): "
  );
  return longBreakTime || "15"; // Default value
}

// Function to handle pause, resume, and exit
let isPaused = false;
let isExited = false;

function setupControlListeners() {
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.on("data", (data) => {
    const input = data.toString().trim();
    if (input === "p") {
      isPaused = !isPaused;
      console.log(isPaused ? "\nPaused" : "\nResumed");
    } else if (input === "e") {
      console.log("\nExiting the timer...");
      isExited = true;
      process.exit();
    }
  });
}

// Start the timer with pause, resume, and exit functionality
function startTimer(duration, type = "Work") {
  return new Promise((resolve) => {
    console.log(`${type}: Timer started for ${duration} minutes`);
    let endTime = new Date(Date.now() + Number(duration * 60) * 1000); // Calculate end time
    let remainingTime = duration * 60 * 1000; // Store the remaining time in ms

    // Update the timer every second
    const interval = setInterval(function () {
      if (isPaused || isExited) return; // Skip countdown if paused or exited
      const currentTime = new Date();
      const timeLeft = endTime.getTime() - currentTime.getTime(); // Time left in ms
      const minutes = Math.floor(timeLeft / (60 * 1000)); // Minutes
      const seconds = Math.floor((timeLeft % (60 * 1000)) / 1000); // Seconds

      if (timeLeft <= 0) {
        clearInterval(interval); // Stop the interval when time is up
        console.log(`\n${type}: Timer ended`);
        resolve(); // Resolve the promise to indicate the timer has finished
      } else {
        process.stdout.write(
          `\r${type} timer: ${minutes}:${seconds < 10 ? "0" : ""}${seconds} `
        );
        remainingTime = timeLeft;
      }

      // If paused, adjust the endTime to account for paused time
      if (isPaused) {
        endTime = new Date(Date.now() + remainingTime);
      }
    }, 1000);
  });
}

// Main function
async function main() {
  console.log("Welcome to the Pomodoro CLI Timer");
  console.log("Press 'p' to pause/resume, 'e' to exit at any time");

  setupControlListeners(); // Set up the pause/resume/exit listener

  const duration = await timerDurationQuestion();
  const breakTime = await breakDurationQuestion();
  const numOfCycles = await numOfCyclesQuestion();
  const longBreakTime = await longBreakDurationQuestion(); // Ask for long break duration

  // Convert the cycles and loop through the cycles
  for (let i = 0; i < Number(numOfCycles); i++) {
    console.log(`\nCycle ${i + 1} of ${numOfCycles}`);

    // Work timer
    await startTimer(Number(duration), "Work");

    // Break timer
    await startTimer(Number(breakTime), "Break");
  }

  // Start the long break after all cycles are completed
  console.log("\nAll cycles completed. Time for a long break.");
  await startTimer(Number(longBreakTime), "Long Break");

  console.log("Long break completed. Well done!");
  userInput.close();
}

main();
