# [Example React Native App](https://maksym-nemera.github.io/<your-repository>)

This repository contains the source code and assets for the **Example React Native App** project.

You may try it on this **web** version: [CLICK ME](https://maksym-nemera.github.io/<your-repository>)

If you need to try it on your phone check the [How to install](#how-to-install)

## Navigation:

- [How to use tamplate](#how-to-use-template)
  - [Description](#description-template)
  - [How to install](#how-to-install)
- [Description](#description)
- [Features](#features)
- [Usage](#usage)
- [Tech stack](#tech-stack)
- [Contributing](#contributing)
- [Scripts](#scripts)
- [Project structure](#project-structure)
- [Contact](#contact)

---

<details>
<summary><a id="how-to-use-template">How to use <a href="https://github.com/maksym-nemera/react-native-ts_template">template:</a></a></summary>

This [repository](https://github.com/maksym-nemera/react-native-ts_template) contains the template code and assets for the **React Native App** projects.

You may try it on this web version: [CLICK ME](https://maksym-nemera.github.io/react-native-ts_template/)

### <a id="description-template">Description:</a>

This template is designed to create various types of react native apps using **_React-native.js_**, **_CSS/SCSS_**, and **_TS_**. It includes specialized checkers such as **ESLint**, and **Prettier** for code formatting, and uses **EditorConfig** to standardize the entire project. The project is built with **expo**. In addition, it has **Husky** and **Lint-Staged** configured to detect and prevent errors during the commit.

This template can be used to create attractive React-native apps with modern design and good code structure. Additional improvements and customizations can be added to meet specific project requirements.

## <a id="how-to-install">How to install:</a>

1. Click '**Use this template**' => then click '**Create a new repository**'.
2. Add a name to your new repository => then click '**Create repository**'.
3. Click '**<>Code**' => then copy your '**HTTPS**' or '**SSH**' URL.
4. Clone your repository in your projects folder

```shell
git clone https://github.com/your-username/your-repository.git
```

5. Navigate to the project directory:

```shell
cd your-repository
```

6. **Use nvm version 20**:

```shell
nvm use 20
```

7. Install packages:

```shell
npm i
```

8. install Expo Go
   [App Store](https://apps.apple.com/ru/app/expo-go/id982107779), [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=uk&gl=US&pli=1) on your phone

9. Start the project with Expo Go:

```shell
npm run start
```

10. Scan the QR code using the camera from the command line

11. Update README.md.
</details>

---

## <a id="description">Description:</a>

The React Native App project is a mobile application designed to help users effectively manage their tasks and stay organized. It provides a user-friendly interface where users can create, and track their to-do items. It is built using React.js, Redux.js/toolkit, TypeScript and SCSS following the BEM (Block, Element, Modifier) code structure methodology.

## <a id="features">Features:</a>

- Responsive design for optimal viewing on different devices.
- Interactive elements and animations to enhance user experience.
- Modular code structure using BEM methodology for easier maintenance and scalability.
- Styling with SCSS to take advantage of nested rules, variables, and mixins.

## <a id="usage">Usage:</a>

Feel free to customize the content, styles, and functionality of the Example React App to suit your needs. You can modify the existing code or add new features as required.

## <a id="tech-stack">Tech stack:</a>

- React-native.js
- Redux.js/toolkit
- TypeScript
- axios
- dotenv
- Expo Go

## <a id="contributing">Contributing:</a>

If you would like to contribute to this project, you can follow these steps:

1. Follow the steps from [How to install](#how-to-install) from 3 to the last.
2. Make your changes and test them locally.
3. Commit your changes:

```shell
git commit -m 'Add some feature'
```

4. Push the branch to your forked repository:

```shell
git push origin feature/your-feature
```

5. Open a pull request in this repository.

## <a id="scripts">Scripts:</a>

<table>
    <tr>
        <th>Command</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><code>npm start</code></td>
        <td>Start the project with Expo Go app</td>
    </tr>
    <tr>
        <td><code>npm run web</code></td>
        <td>Start the project on your browser</td>
    </tr>
    <tr>
        <td><code>npm run build-web</code></td>
        <td>Build the project into /web-build/</td>
    </tr>
    <tr>
        <td><code>npm run deploy</code></td>
        <td>Deploy the web version project</td>
    </tr>
    <tr>
        <td><code>npm run deploy:force</code></td>
        <td>Force deploy the web version project</td>
    </tr>
    <tr>
        <td><code>npm run lint</code></td>
        <td>Check .TSX files</td>
    </tr>
    <tr>
        <td><code>npm run format</code></td>
        <td>Formatting your code</td>
    </tr>
    <tr>
        <td><code>npm run fix-style</code></td>
        <td>Check and fix all code</td>
    </tr>
</table>

## <a id="project-structure">Project structure:</a>

```
|-assets/
|	|-example-icon.png
|
|-src/
|	|-api/
|	|	|-example-fetch.ts
|	|-app/
|	|	|-hooks.ts
|	|	|-store.ts
|	|-components/
|	|	|-Example-component/
|	|	|	|-Example-component.tsx
|	|	|	|-index.tsx
|	|-enums/
|	|	|-example-enums.ts
|	|-features/
|	|	|-example/
|	|	|	|-exampleSlice.ts
|	|-screen/
|	|	|-exampleScreen.tsx
|	|-types/
|	|	|-example-types.ts
|	|-utils/
|	|	|-example-utils.ts
|	|-AppRouting.tsx
|	|-MainApp.tsx
|
|-App.tsx
```

## <a id="contact">Contact:</a>

If you have any questions, suggestions, or feedback, please feel free to reach out to me.

- Linkedin: [maksym-nemera](https://www.linkedin.com/in/maksym-nemera/)
- Email: [maksym.nemera@gmail.com](mailto:maksym.nemera@gmail.com)
- Telegram: [MaksymNemera](https://t.me/MaksymNemera)
