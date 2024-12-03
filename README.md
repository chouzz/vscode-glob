# vscode-glob

[![npm package][npm-img]][npm-url]
[![Build Status][build-img]][build-url]
[![Downloads][downloads-img]][downloads-url]
[![Issues][issues-img]][issues-url]
[![Code Coverage][codecov-img]][codecov-url]
[![Commitizen Friendly][commitizen-img]][commitizen-url]
[![Semantic Release][semantic-release-img]][semantic-release-url]

> Glob pattern used by vscode, it's totally copied from vscode source code since there is no way to make same glob pattern especially for vscode extensions development.

Ref: https://code.visualstudio.com/docs/editor/glob-patterns

## Install

```bash
npm install vscode-glob
```

## Usage

```ts
import { glob } from 'vscode-glob';

glob('hello');

```

# Credit
All source code comes from vscode with very small changes.

[build-img]:https://github.com/chouzz/vscode-glob/actions/workflows/release.yml/badge.svg
[build-url]:https://github.com/chouzz/vscode-glob/actions/workflows/release.yml
[downloads-img]:https://img.shields.io/npm/dt/vscode-glob
[downloads-url]:https://www.npmtrends.com/vscode-glob
[npm-img]:https://img.shields.io/npm/v/vscode-glob
[npm-url]:https://www.npmjs.com/package/vscode-glob
[issues-img]:https://img.shields.io/github/issues/chouzz/vscode-glob
[issues-url]:https://github.com/chouzz/vscode-glob/issues
[codecov-img]:https://codecov.io/gh/chouzz/vscode-glob/branch/main/graph/badge.svg
[codecov-url]:https://codecov.io/gh/chouzz/vscode-glob
[semantic-release-img]:https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]:https://github.com/semantic-release/semantic-release
[commitizen-img]:https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]:http://commitizen.github.io/cz-cli/
