# Dungeons And Dragons For Dummies 🧙🏻‍♂️

## Project Description and Objectives

The primary objective of our project is to develop an accessible and user-friendly website aimed at providing a comprehensive understanding of Dungeons And Dragons (D&D) without the need for extensive reading or the purchase of additional materials. Our goals include:

1. **Accessibility:** We aim to bridge the gap between individuals interested in Dungeons and Dragons but lacking the time or patience to engage with traditional learning methods. Our website will serve as a user-friendly platform accessible to all, regardless of prior experience.

2. **Education:** Our website will act as a friendly guide, explaining fundamental concepts of Dungeons and Dragons in a clear and straightforward manner. We intend to introduce users to the necessary mechanics required to play and enjoy the game, resembling a conversation with a knowledgeable friend.

3. **Simplified Character Creation:** One of our key objectives is to simplify the character creation process, eliminating complexities and providing step-by-step guidance. We strive to make character creation intuitive and easily understandable for users at any level of experience.

4. **Community Building:** Our vision extends beyond individual learning to the creation of a vibrant community comprising both seasoned veterans and newcomers. We aim to foster an inclusive environment where members can freely ask questions, share insights, and engage in discussions related to Dungeons and Dragons.

Through our project, we aspire to make the world of Dungeons and Dragons more accessible, approachable, and enjoyable for enthusiasts of all backgrounds and levels of experience.

## Project Structure

```
/src
├── app
│   ├── core
│   │   └── [Services: Firebase, D&D API]
│   ├── data
│   │   └── [Constants, Enums, Interfaces]
│   ├── layout
│   │   └── [Skeleton of the web (Header & Footer)]
│   ├── modules
│   │   ├── authentication
│   │   ├── character-creator
│   │   ├── glossary
│   │   └── homepage
│   ├── shared
│   │   └── [Components/templates used in different situations and pages]
│   └── [Global app components]
└── assets
    └── [Images used locally]
```

## Prerequisites

Before getting started, ensure that you have the following versions installed:

- Node.js: 18.15.0 or higher
- Angular CLI: 17.3.0
- Firebase CLI: 17.0.1

If you haven't installed Node.js and Angular CLI yet, follow the steps below:

### Installing Node.js

1. **Download Node.js:** 

   Visit the [official Node.js website](https://nodejs.org/) and download the latest version of Node.js for your operating system.

2. **Install Node.js:** 

   Follow the installation instructions provided by the installer.

3. **Verify Installation:** 

   To verify that Node.js is installed correctly, open a terminal or command prompt and run the following commands:

   ```bash
   node --version
   npm --version
   ```

   You should see the versions of Node.js and npm printed in the terminal.

### Installing Angular CLI

1. **Install Angular CLI:** 

   Open a terminal or command prompt and run the following command to install Angular CLI globally:

   ```bash
   npm install -g @angular/cli@17.3.0
   ```

2. **Verify Installation:** 

   To verify that Angular CLI is installed correctly, run the following command:

   ```bash
   ng version
   ```

   You should see the version of Angular CLI printed in the terminal.

## Installation

1. **Clone the Repository:** 
   
   Clone this repository to your local machine:

   ```bash
   git clone https://github.com/your-username/project-name.git
   ```

2. **Install Project Dependencies:**
   
   Navigate to the project directory and run the following command to install all project dependencies, including the Angular CLI:

   ```bash
   cd project-name
   npm install
   ```

3. **Install Firebase:**
   
   To work with Firebase, you need to first install Firebase CLI globally. Run the following command:

   ```bash
   npm install -g firebase-tools@17.0.1
   ```

   Then, log in to Firebase with your Google account:

   ```bash
   firebase login
   ```

4. **Configure Firebase:**
   
   After logging in, set up Firebase for this project by running:

   ```bash
   firebase init
   ```

   Follow the instructions in the terminal to select necessary options (e.g., Hosting) and link this Firebase project with the Git repository.

## Usage

Once you have installed all dependencies and configured Firebase, you can start the application locally. Run the following command:

```bash
ng serve
```

This will start the development server, and you can view the application in your web browser by visiting `http://localhost:4200/`.

## Tools

The following tools were utilized in the development of our website:

- **HTML, SCSS & TypeScript:** Fundamental web development languages used for creating the website's structure, styling, and functionality.

- **Angular:** The frontend framework utilized for building the website. Learn more about Angular [here](https://angular.io/).

- **Firebase:** A platform used for hosting, authentication, and other backend services. Explore Firebase [here](https://firebase.google.com/).

- **The official API of Dungeon And Dragons (5th Edition):** An API utilized for accessing game-related data. Access the API [here](https://www.dnd5eapi.co/).

- **OpenAI's ChatGPT:** An AI model used for certain functionalities within the website. Learn more about ChatGPT [here](https://chat.openai.com/).

- **Other AIs for image creation:** Additional AI models utilized for image creation purposes.

## Authors

- [Sara Expósito Suárez](https://github.com/SaraE5)
- [Álvaro Lettieri Acosta](https://github.com/alvarosacosta)
- [Juan José Quesada Acosta](https://github.com/jj-quesada)
- [Juan Pereiro González](https://github.com/jpereiro1)
- [Adrian Ojeda Núñez](https://github.com/aojedanu)

## License

This project is licensed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).
You can find the full text of the license in the [LICENSE](LICENSE) file.
