# What Can I Eat?

This is a questions that many people have to ask themselves while looking at menus.

This app provides an interface to view and edit menus with dietary tags for each meal. In fact, the app’s main purpose is to supply customized menus for people with special diets or allergies. So that they will immediately know which meal they can eat when dining at a restaurant or cafe. Hence making things slightly easier and less awkward for them when eating out.

Furthermore, assuming the restaurant owners enter the tags correctly, it reduces the risk that meals get served contain allergens that were not considered for example eggs in aioli sauce. As well as improving efficiency as waiters will have to do fewer trips back and forward with the kitchen when serving people with special diets. 

*developed by Emanuel Evans*


# How to run the app

This app is a React Native project developed using the Expo framework to simplify the setup. 

## Set up: what tools need to be installed

First of all you need to have have Node 12 LTS or greater installed.

You can check your node version using the command:
```
node -v
```

Latest Node.js source code can be [downloaded here](https://nodejs.org/en/download/)

After that to install the Expo CLI command line utility enter:
```
npm install -g expo-cli
```

The main development environmet should now be set up. Visit [Expo](https://docs.expo.dev/get-started/installation/) and [React Native](https://reactnative.dev/docs/environment-setup) documentation if isses are encontred.


### Libraries needed

This project makes use of a couple of useful libraries. Use the following commands to install them:
```
npm install@react-navigation/native
npm install @react-navigation/drawer
npm install @react-navigation/native-stack

expo install expo-location
expo install firebase

```

## Can I download the app directly into my phone?
Unfortunatelly this app has not been publically deployed yet.

This means that currently it is not possible to simply install the app into your phone to run the app without setting up a development environment.

The goal is to overcome this incovinient soon after a stable prototype has been completed.