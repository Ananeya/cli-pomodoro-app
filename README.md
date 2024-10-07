# Pomodoro Timer CLI APP

Welcome to the Pomodoro Timer CLI App, a simple command-line application built with Node.js that helps you manage your work sessions and breaks using the Pomodoro Technique.

## Features

- Set custom timer durations for work sessions and breaks.
- Define the number of cycles for work and break sessions.
- Timer updates in real-time in the console.
- Default values provided for quick setup.

## Getting Started

To run this application, ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Prerequisites

- Node.js (version 14 or higher recommended)
- A terminal or command prompt

### Installation

1. Clone the repository or download the code.

   ```bash
   git clone https://github.com/Ananeya/pomodoro-timer-cli.git
   cd pomodoro-timer-cli
2. Install any dependencies if necessary (currently there are none).

3. Run the application.
   node index.js
Usage
When you run the application, you'll be prompted to enter:

Timer Duration: Duration of the work session in minutes (default: 25).
Break Duration: Duration of the break session in minutes (default: 5).
Number of Cycles: Number of work/break cycles to complete (default: 4).
After inputting your desired values, the timer will begin, displaying the remaining time for each session in real-time.

Example
Welcome to the Pomodoro CLI Timer
Timer Duration? (default: 25): 
Break Duration? (default: 5): 
Number of cycles? (default: 4): 
Cycle 1 of 4
Work: Timer started for 25 minutes
Work timer: 24:59
...
Break: Timer ended
Cycle completed
