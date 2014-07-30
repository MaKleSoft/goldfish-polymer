# Goldplate

---

## Installation

### Requirements

* [Node.js](http://nodejs.org/)
* npm (included in Node.js)
* [Git](http://git-scm.com/)

### Clone the repository

    ```sh
    git clone https://github.com/smartytime/goldplate.git
    ```

### Install Node.js dependencies

    ```sh
    npm install
    sudo npm install -g gulp
    sudo npm install -g bower
    ```

This will download and install all dependencies defined in `package.json` as well as the gulp cli for running tasks.

### Install Bower JS dependencies

    ```sh
    bower install
    ```

This will download and install all the front-end browser dependencies defined in `bower.json`.
---

## Run it

### Compile LESS files

For performance reasons, less files should to be precompiled rather than compiling them on page load. To do that run the corresponding gulp task

```sh
gulp less
```

If you want the task to watch all less files and compile them automatically when they change, use the `--watch` flag.

```sh
gulp less --watch
```

### Start server

In order to avoid same-origin policy issues and to allow testing on other devices you have to serve the app from a local server rather than loading it via the _file://_ protocol. You can do that easily via the corresponding gulp task

```sh
gulp serve
```