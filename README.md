# Jared
[![Eslint](https://github.com/Akurganow/jared/actions/workflows/eslint.yml/badge.svg)](https://github.com/Akurganow/jared/actions/workflows/eslint.yml)
[![Tests](https://github.com/Akurganow/jared/actions/workflows/tests.yml/badge.svg)](https://github.com/Akurganow/jared/actions/workflows/tests.yml)
[![Build](https://github.com/Akurganow/jared/actions/workflows/build.yml/badge.svg)](https://github.com/Akurganow/jared/actions/workflows/build.yml)

Browser extension for better way to work with browser history

![Jared](/promo/open-graph.png)

Supported providers:
- Issue tracker
  - Jira
  - YouTrack
- Version control
  - GitHub
  - GitLab

Supported browsers:
- Chrome

## Install
	$ npm install

## Development
    npm run dev chrome
[//]: # (npm run dev firefox)
[//]: # (npm run dev opera)
[//]: # (npm run dev edge)

## Build
    npm run build chrome
[//]: # (npm run build firefox)
[//]: # (npm run build opera)
[//]: # (npm run build edge)

## Environment

The build tool also defines a variable named `process.env.NODE_ENV` in your scripts. 

## Docs

* [webextension-toolbox](https://github.com/HaNdTriX/webextension-toolbox)
