# nox

nox is yet another static site generator which tries to do things differently yet being opiniotated on the folder structure, concepts and default used technoligies. \
Features are:
- Tamed pug/sass integration with aligned imports and default helper methods
- Completely hackable & extendable (thanks to gulp)
- Providing sane defaults
- Docker support out of the box
- Highly customizable
- Unit tests and dead simple code (thanks again to gulp)

# Get started

## Installation

1. You need to have node/npm installed
2. Create a new project/folder and `cd` into it
3. Init project with `npm init` and follow instructions
2. Save nox to your project with `npm install @ideolumo/nox --save`

## Set up project

1. Create folder structure with `mkdir -p source/_static /source/_pages source/_assets source/_themes source/_styles source/_scripts` or manually.
2. Add __start__ and __build__ script to `package.json` by adding:
  - `gulp -f ./node_modules/nox/src/gulpfile.js`


# Overview

## Folders

nox tries to

| Folder            | Destination             | Wildcard                       | Description |
| ----------------- | ----------------------- | ------------------------------ | ----------- |
| `/source/_static` | `/build`                | `**/*`                         |             |
| `/source/_pages`  | `/build`                | `**/* !**/*.[pug|sass] !**/_*` |             |
| `source/_assets`  | `/build/assets`         | `**/* !**/_*`                  |             |
| `source/_themes`  | `/build/assets/themes`  | `**/* !**/*.[pug|sass] !**/_*` |             |
| `source/_styles`  | `/build/assets/styles`  | `**/*.[sass|css] !**/_*`       |             |
| `source/_scripts` | `/build/assets/scripts` | `**/*.js !**/_*`               |             |

## Recommended additional Folders

| Folder                | Description                                                                                                                                        |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/source/_data`       | Store any static data (eg json/yaml... files) here if the containing information is shared between pages/themes...                                 |
| `/source/_components` | Reusable pug/sass/js mixins which aren't specific to a project or at least could be reused in other projects. For example a slider/menu component. |
| `/source/_partials`   | Reusable pug/sass/js mixins which are specific to this projects                                                                                    |
| `/source/_lib`        | (Java)Script files which provide any additional logic you need and get pulled in from pug/sassFilterPug                                            |
| `/source/_tasks`      | Additional or modified gulp _tasks                                                                                                                 |

# Development

To start hacking on nox you should first understand gulp & gulp-composer.
As soon as you got your head wrapped around this:
1. Clone this repo
3. Install dependencies by running `npm install`
2. Get familiar with folder/project structure (especially how tasks and task related functions are defined)
3. Run tests/linter... with `npm test`. Check out scripts in `package.json` for other helpful shortcuts.
4. Run only tests by executing `ǹode test/index.js`.
5. Implement whatever you want, if you think it's interesting, feel free to create a pull request
6. If you have any questions/problems with setting things up or whatever, feel free to open an issue

# License

Licensed under the GPLv3, see [LICENSE](./LICENSE) file for details.

Copyright © 2018 nox contributors.
