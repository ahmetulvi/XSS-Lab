# XSS Vulnerability Lab

## Introduction

Welcome to the XSS Vulnerability Lab! This interactive environment is designed to help developers, security enthusiasts, and students understand, exploit, and learn how to prevent common Cross-Site Scripting (XSS) vulnerabilities in web applications.

This lab provides a hands-on approach to learning by presenting various scenarios where XSS can occur and demonstrating how to mitigate these risks.

## XSS Types Covered

This lab focuses on the three main types of XSS attacks:

- **Stored XSS (Persistent XSS):** Malicious scripts are injected and stored on the target server (e.g., in a database). The script is then served to other users when they access a specific page, executing in their browsers.
- **Reflected XSS (Non-Persistent XSS):** Malicious scripts are injected into the application via a request (typically in a URL parameter). The script is then reflected off the web server to the victim's browser, where it executes. The script is not stored permanently.
- **DOM-Based XSS:** The vulnerability lies within the client-side code (JavaScript) rather than the server-side code. The application's legitimate JavaScript manipulates the Document Object Model (DOM) in an unsafe way, using user-supplied data, leading to script execution.

For each type, you will find both a vulnerable and a secured (patched) version of a common web application feature (like comments or search results).

## Features

- Interactive pages for each XSS type and scenario.
- Clear explanations of how each vulnerability works.
- Example XSS payloads to try.
- Demonstrations of vulnerable code snippets.
- Explanations and code examples of how to fix and prevent these vulnerabilities.

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Templating Engine:** EJS (Embedded JavaScript templates)
- **Containerization:** Docker, Docker Compose
- **Frontend:** HTML, CSS, JavaScript (vanilla)

## Setup and Running the Lab

### Prerequisites

- [Docker](https://www.docker.com/get-started) installed on your system.
- [Docker Compose](https://docs.docker.com/compose/install/) installed on your system (often included with Docker Desktop).

### Running the Application

1.  **Get the Project Files:**

    - **If using Git:** Clone the repository:
      ```bash
      git clone <YOUR_REPOSITORY_URL_HERE> # Replace with your repo URL
      cd <repository_folder_name> # Replace with your folder name
      ```
    - **If downloaded as ZIP:** Extract the ZIP file and navigate into the project's root directory using your terminal.

2.  **Build and Run with Docker Compose:**
    Open your terminal in the project's root directory (where `docker-compose.yml` is located) and run:

    ```bash
    docker-compose up --build -d
    ```

    - The `--build` flag ensures the Docker image is built (or rebuilt if changes were made).
    - The `-d` flag runs the containers in detached mode (in the background).
    - _(Wait a few moments for the database and application to initialize.)_

3.  **Access the Lab:**
    Open your web browser and navigate to:
    [http://localhost:3000](http://localhost:3000)

4.  **Stopping the Application:**
    To stop the running containers, run the following command in the project's root directory:
    ```bash
    docker-compose down
    ```
    _(This will stop and remove the containers, but your data in the MongoDB volume (if configured) might persist unless you explicitly remove volumes.)_

## How to Use This Lab

- Use the navigation menu at the top to select different XSS types (Stored, Reflected, DOM) and their vulnerable/secure scenarios.
- On **vulnerable pages**, try the example payloads provided or craft your own to understand how the XSS attack works.
- Pay attention to how the application processes and displays your input.
- On **secure pages**, observe how the same inputs are handled safely. Read the explanations and look at the code snippets to understand the prevention techniques used (e.g., output encoding, proper DOM manipulation).
- Use your browser's **Developer Tools** (Console, Network, Elements/Inspector) to observe requests, responses, errors, and how the DOM is being manipulated. This is crucial for understanding XSS.

## Special Note on DOM-Based XSS

In the "DOM-Based XSS (Vulnerable)" example, you might observe that simple `<script>alert(...)</script>` tags injected via `innerHTML` may not execute in some modern browsers. This is due to built-in browser security mechanisms that attempt to neutralize such direct script injections through `innerHTML`.

However, the lab demonstrates that **event handler-based payloads** (e.g., `<img src=x onerror="alert('DOM XSS')">`) can still be effective in exploiting this type of vulnerability, as these are often processed differently by browsers. This highlights that even with some browser-level protections, vulnerabilities in how JavaScript handles data can still lead to XSS.

## Disclaimer

This lab is for educational purposes only. Do not use the techniques learned here on systems you do not have explicit permission to test.

Happy Hacking (Ethically)!
