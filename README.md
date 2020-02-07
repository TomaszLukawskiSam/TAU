# TAU

The TAU library contains components which allows you to create Web Application UI. Each components represents UI element, such as a button or slider, which gives you interaction and manipulation features.
This is a repository for internal development.

The offical release of TAU is going on in the https://github.com/Samsung/TAU.


## Getting Started

- Clone a copy of the master branch in the TAU Git repository:

`git clone git@github.com:Samsung/TAU.git`

- Change to the tau directory:

`cd TAU`

- Check out the latest stable version of TAU:

`git checkout master`

### Prerequisites

To build a TAU library, ensure that you have both Git and Node.js (6.16.0) installed.

Example of node install using [`nvm`](https://github.com/creationix/nvm):

```
nvm install 6.16.0
nvm use 6.16.0
```

### Installing

- Install the build module by npm:

`npm install`

Build TAU by running the following command in the tau directory:

`npm run build`

## Running the tests

TAU has automated tests. To run tests execute command:

`npm run test`

## Debuggging

In order to set additional logging in TAU you need to build TAU with --tau-debug option

`npx grunt build --tau-debug`

## Demo application:

UIComponents sample web application demonstrating how to implement UI Components for wearable based on TAU.

Demo application is available on https://samsung.github.io/TAU: 

- https://code.tizen.org/TAU/1.1/examples/mobile/UIComponents/ (Mobile)
- https://code.tizen.org/TAU/1.1/examples/wearable/UIComponents/ (Wearable)

If you want to test your own version of demo app run:

`npm run http-server`

and visit appropriate local site:

* http://localhost:8888/examples/mobile/UIComponents/
* http://localhost:8888/examples/wearable/UIComponents/

### Coding style tests

Project has defined eslint rules (.eslintrc.js)

Contribution can be verified using command:

`npx grunt eslint`

## TAU UI Components Usage

Refer to [samsung.github.io/TAU](https://samsung.github.io/TAU/) for library usage instructions

## Develop by Handwriting

### Including TAU in your source code

```html
<script src="../lib/tau/mobile/js/tau.js"></script>
```

### Simple usage example

```html
<div class="ui-page ui-page-active">
  <div class="ui-header">MyApplication</div>
  <div class="ui-content">Hello world</div>
  <div class="ui-footer">
    <button id="closeBtn" class="ui-btn">Close</button>
  </div>
</div>
<script>
    var page = document.querySelector(".ui-page");
    page.addEventListener("pageshow", function () {
      document.getElementById("closeBtn").addEventListener("click", function () {
        window.close();
      });
    });
</script>
```

## Develop by Visual Tools

### Using VSCode

You can use VSCode with set of extensions supporting web apps and TAU development [here](https://developer.tizen.org/development/visual-studio-code-extension-tizen/tizen-web).

### Using TAU Design Editor with VSCode

You can use TAU Design Editor with VSCode supporting WYSIWYG development. [Link](https://github.sec.samsung.net/HighPerformanceWeb/VSC-Design-Editor)

![](https://github.sec.samsung.net/HighPerformanceWeb/Demo/raw/master/TAU/WasherVideo_1106.gif)


## Contributing

Please read [CONTRIBUTING.md](https://github.com/Samsung/TAU/blob/master/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning
TAU version comply with [Semantic Versioning specification - 2.0](https://semver.org/spec/v2.0.0.html)

*MAJOR.MINOR.PATCH*

- *MAJOR* - assures public API compatibility
- *MINOR* - adds new functionalities (e.g. new API) with backward compatibility for old API
- *PATCH* - backward compatible bug fixes

## TAU vs Tizen compatibility

TAU 1.0 is compatible with Tizen 4.0/5.0 Web API
TAU 1.1 is compatible with Tizen 5.5 Web API and backward compatible with 4.0/5.0 (apps using Tizen 4.0/5.0 Web API can use TAU 1.1 instead of TAU 1.0)

## Releases
You can find releases in the releases [tab](https://github.com/Samsung/TAU/releases)

**Tizen_version_number.TAU_version_for_given_Tizen_release.**

E.g. in case of TAU for Tizen 5.0: 5.0.0...5.0.10, 5.0.11...

## Authors

* Authors - [AUTHOR](https://github.com/Samsung/TAU/blob/master/AUTHOR)

See also the list of [contributors](https://github.com/SAMSUNG/TAU/contributors) who participated in this project.

## License

This project is licensed under MIT except some files under Flora license. For details see [COPYING](https://github.com/Samsung/TAU/blob/master/COPYING)
