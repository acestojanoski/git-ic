# git-ic
[![CircleCI](https://circleci.com/gh/acestojanoski/git-ic/tree/master.svg?style=svg)](https://circleci.com/gh/acestojanoski/git-ic/tree/master)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![install size](https://packagephobia.now.sh/badge?p=git-ic)](https://packagephobia.now.sh/result?p=git-ic)
[![Downloads](https://img.shields.io/npm/dm/git-ic.svg)](https://npmjs.com/git-ic)

> Git CLI helper for creating initial commits

## Install
```sh
$ npm install git-ic -g
```

## Usage
The default commit message is: `initial commit`.

```
Usage
  $ git ic
  $ git-ic

Options
  --message, -m  Custom message for the initial commit

Examples
  $ git ic
  $ git ic -m "first commit"
  $ git ic --message "first commit"
```

## License
[MIT](./license)
