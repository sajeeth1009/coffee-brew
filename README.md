# Getting Started with Coffee-Brew

Coffee-Brew is a mobile first React Webapp to scroll through Coffee Types offered by a vending machine. The app displays choices of types of coffees, the sizes and the extras that go with them to help you place your order.

## Pre-requisites

- Git
- Yarn

## Installation Steps

1. First begin by cloning the current repository into your local system by running the command.

   ```
   git clone https://github.com/sajeeth1009/coffee-brew.git
   ```

2. CD into the newly created directory and run the installation command as seen below:

   ```
   cd coffee-brew
   yarn install
   ```

3. Create a .env.local or update the existing .env to set up the required environment variables. A sample is shown below:
   ```
   REACT_APP_DEFAULT_LANGUAGE=en
   REACT_APP_FALLBACK_LANGUAGE=en
   REACT_APP_CONTENT_URL="/content"
   REACT_APP_MACHINE_ID=60ba1ab72e35f2d9c786c610
   REACT_APP_API_BASE_URL=<YOUR_BACKEND_API_URL>
   REACT_APP_CSP_DEFAULT_SRC="'self'"
   REACT_APP_CSP_MEDIA_SRC="'self'"
   REACT_APP_CSP_IMG_SRC="'self' data:"
   REACT_APP_CSP_STYLE_SRC="'unsafe-inline' 'self'"
   REACT_APP_CSP_SCRIPT_SRC="'self'"
   REACT_APP_CSP_CHILD_SRC=""
   REACT_APP_CSP_CONNECT_URLS="<YOUR_BACKEND_API_URL> 'self'"
   ```

## Running the Application

Once the installation is completed, run the following command from the root of the project to bring up a local version of the application:

```
yarn start
```

## All Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
