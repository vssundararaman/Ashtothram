# Poem Explanation App

This is a React Native Expo application that displays poems and their explanations in both English and Tamil. The app supports language switching, theme changes (light/dark mode), and font size adjustments.

## Features

*   **Bilingual Support:** English and Tamil languages.
*   **Side Navigation:** Easy navigation between different poems and pages.
*   **Two-Panel View:** Displays the poem on one side and its explanation on the other.
*   **Settings:**
    *   Language selection (English/Tamil)
    *   Theme selection (Light/Dark Mode)
    *   Font size adjustment
*   **Screens:**
    *   Introduction
    *   3 Poem Pages
    *   Settings
    *   About

## Tech Stack

*   **Framework:** React Native with Expo
*   **Navigation:** React Navigation (Drawer)
*   **UI Library:** React Native Paper
*   **Localization:** i18n-js with Expo Localization
*   **State Management:** React Context API
*   **Storage:** AsyncStorage for user preferences

## Getting Started

### Prerequisites

*   Node.js and npm
*   Expo CLI (`npm install -g expo-cli`)
*   Expo Go app on your Android or iOS device for testing.

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd <project-directory>
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

### Running the Application

You can run the application using the following commands:

*   **To run on Android:**
    ```bash
    npm run android
    ```
*   **To run on iOS:**
    ```bash
    npm run ios
    ```
*   **To run in the web browser:**
    ```bash
    npm run web
    ```

After running one of the commands, a QR code will be displayed in the terminal. Scan this QR code with the Expo Go app on your device to open the application. 