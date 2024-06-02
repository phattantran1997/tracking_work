# 📱 My React Native Tracking Work App (Expo)

[![React Native](https://img.shields.io/badge/React%20Native-0.68.2-success?style=flat-square)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-46.0.16-blueviolet?style=flat-square)](https://expo.dev/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

This is a React Native application built with Expo, providing functionality for staff and managers.

## 📖 Table of Contents

- [About](#about)
- [Features](#features)
  - [Staff Screen](#staff-screen)
  - [Manager Screen](#manager-screen)
  - [Dark Mode](#dark-mode)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Architecture](#architecture)
- [Reporting Issues](#reporting-issues)
- [API Documentation](#api-documentation)
- [License](#license)

## 🎉 About

This React Native app is designed to streamline processes for staff and managers. It leverages the power of Expo to create a cross-platform mobile experience. The app is built using the latest version of React Native and Expo, following best practices for code organization, styling, and performance optimization.

## 🚀 Features

### Staff Screen

- **About Screen**: Displays a list of open-source licenses used in the application. This helps in maintaining transparency and compliance with open-source license requirements.
- **Product Screen**: Allows staff to view all products listed in the system. Each product can be viewed in detail, providing staff with necessary information at their fingertips.
- **Scanning**: Utilizes the mobile camera to scan QR codes associated with jobs or products. This feature streamlines the process of recording and retrieving product or job details.
- **List All History Jobs**: Displays a historical log of all jobs scanned by the staff. This provides a useful audit trail and job tracking functionality.
- **Manual Input for Update**: Enables staff to manually input job or product information if they forgot to scan a QR code at the time of handling. This ensures that all data can be accounted for even post interaction.

### Manager Screen

- **Create QR Code for Products**: Allows managers to generate QR codes for each product. These can be printed and attached to products for easy scanning.
- **See Job Handlers**: Provides information about who is handling each job, offering transparency and the ability to track job progress.

### Dark Mode

- **Dark Mode Support**: The app supports a dark mode for both staff and manager screens, offering better screen visibility in low-light conditions and reducing eye strain.


## 🛠️ Installation

To get started with this project, follow these steps:

1. Clone the repository: `git clone https://github.com/phattantran1997/tracking_work.git`
2. Navigate to the project directory: `cd tracking_work`
3. Install dependencies: `npm install` or `yarn install`

### Setting Up Local Server Access

- **Using ngrok for Local API Access**: During development, it’s often necessary to access APIs served from your local machine. `ngrok` can be used to expose your local server to the internet by creating a tunnel from a public URL to your local `localhost:8081`.

To set up `ngrok`:
1. Download and install ngrok from [ngrok.com](https://ngrok.com/).
2. Run ngrok to tunnel your localhost by using: `ngrok http 8081`
3. This will output a URL that maps to `http://localhost:8081`. Copy this URL.
4. Update your API base URL in your React Native app to use the ngrok URL.

## 🔧 Usage

To run the app on your local machine using Expo, follow these steps:

1. Start the backend server (if applicable) on port `8081`.
2. Start the Expo development server: `npm run start`
3. Start ngrok to expose your local server: `ngrok http 8081`
4. Use the Expo client app on your iOS or Android device to scan the QR code and run the app. Ensure the app is set to use the ngrok URL provided for API requests.
5. Alternatively, you can use an emulator or simulator to run the app, though make sure the API requests point to the correct ngrok URL.

## 🌟 Contributing

Contributions are welcome! To contribute:
1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m 'Add your commit message'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

## 🏛 Architecture

This application follows a modular architecture with separation of concerns for easier management and scalability. The main components are:

- **Frontend**: Built with React Native for the mobile interfaces.
- **Backend**: Node.js server handling API requests.
- **Database**: Managed through MongoDB for storing user and transaction data.

## 📮 Reporting Issues

To report issues, please use the GitHub Issues page of the repository. Provide as much detail as possible to help understand the context and reproduce the issue.

## 📜 API Documentation

The API documentation is available via Swagger UI (use this backend link: https://github.com/phattantran1997/backend_tracking_work_nodejs.git), providing an interactive way to explore the API endpoints and their responses. To access the documentation, navigate to:
```bash
   http://localhost:8081/swagger/index.html
```

This URL will give you access to all available API endpoints, request formats, and response data specifications.

## 📄 License

This project is licensed under the [MIT License](LICENSE).
