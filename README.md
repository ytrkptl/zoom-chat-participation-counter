# Zoom Chat Participation Counter

[![Read the Blog Post](https://img.shields.io/badge/Read-The%20Blog%20Post-blue?style=for-the-badge)](./BlogPost.md)

This application helps teachers verify student participation in Zoom meetings by parsing chat logs. It counts the number of times a participant chatted, which is useful for grading participation in remote classrooms.

## Features

* **Fast Parsing:** Parses Zoom chat text files instantly.
* **Intelligent Counting:** Aggregates message counts by participant name.
* **Privacy Focused:** All processing happens locally in your browser. No data is uploaded to any server.
* **Sorting:** Sort results alphabetically or by participation count.

## Tech Stack

* React
* TypeScript
* Vite

## Getting Started

This project is built with Vite and uses pnpm. You can simply use the live application available at [Zoom Chat Counter](https://zoom-chat-counter.yatrik.dev/) site. If you are developer and want to deploy your own instance, you can follow the instructions below.

### Prerequisites

* Node.js
* pnpm

### Installation

1. Clone the repository.
2. Install dependencies:

```bash
pnpm install
```

### Running Locally

Start the development server:

```bash
pnpm dev
```

### Building for Production

Build the assets for deployment:

```bash
pnpm build
```

The output will be in the `dist` folder.

## Authors

* **Yatrik Patel**
