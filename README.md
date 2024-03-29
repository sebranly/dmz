# Description

Live at https://sebranly.github.io/dmz/

## Development

### Setup

- Clone the repository with `git clone git@github.com:sebranly/dmz.git`
- Go into the repository (e.g. with `cd`)
- Make sure you use correct node (`node -v`) and npm (`npm -v`) versions
- Run `npm ci` to install the dependencies

### Start

- To run it locally, run `npm run start`, it has hot reloading
- To run the test suite (no need to run command above), run `npm run test`

### Deploy

- Commit and push your changes to `main` branch, or create a merge request as a PR from your clone to this project’s `main` branch
- Make sure to have followed the following. If not, create a new PR.
  - increase the `WEBSITE_VERSION` from `src/constants/general.ts` file, by following semver
    - MAJOR version when you make incompatible API changes,
    - MINOR version when you add functionality in a backwards compatible manner, and
    - PATCH version when you make backwards compatible bug fixes.
- Confirm that test suite passes with `npm run test`
- Then run `npm run deploy`
- Finally create a new release for this version on [GitHub Releases page](https://github.com/sebranly/dmz/releases) by adding the changelog

### Diagram

![Visualization of the codebase](./diagram.svg)

### Credits

The sharing image comes from: https://commons.wikimedia.org/wiki/File:Calculator_icon.svg
Attribution: Boca Tutor, CC BY-SA 3.0 <https://creativecommons.org/licenses/by-sa/3.0>, via Wikimedia Commons

As it is an SVG format not supported by Twitter, it has been converted into JPG thanks to https://image.online-convert.com/convert/svg-to-jpg
