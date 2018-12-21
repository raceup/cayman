# Yentl

[![Build Status](https://travis-ci.org/pages-themes/cayman.svg?branch=master)](https://travis-ci.org/pages-themes/cayman) [![Gem Version](https://badge.fury.io/rb/jekyll-theme-cayman.svg)](https://badge.fury.io/rb/jekyll-theme-cayman)

> Yentl is a Jekyll-based web-app to test Race Up members before official FSAE tests. You can [have a go here](https://raceup.github.io/yentl/).

## Table of content

- [Building](#building)
- [Changelog](#changelog)
- [Contribute](#contribute)
- [License](#license)
- [Links](#links)
- [You may also like...](#you-may-also-like)

## Usage

```shell
$ git clone https://github.com/raceup/yentl.git
$ cd yentl
```
then *double click* on `index.html` or
```shell
$ xdg-open index.html
```

### How to write Excel files
There are various placeholders you can use:

- `$` means an image. Use of this in option/answer means that when setting up the test you're require to upload an image
- `...` means an input. Use of this in option means that the user will have to input a number rather than choose the correct answer.

![Example questions](extra/questions.png)

### Remainders

- Do not forget to include a header like `question name,correct answer,other correct answer,option,option...`
- Even if there is just one possible answer, leave the blank

## Contribute

[![Contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/raceup/yentl/issues) [![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://opensource.org/licenses/Apache-2.0)

0. [Open an issue](https://github.com/raceup/yentl/issues/new)
0. [fork](https://github.com/raceup/yentl/fork) this repository
0. create your feature branch (`git checkout -b my-new-feature`)
0. commit your changes (`git commit -am 'Added my new feature'`)
0. publish the branch (`git push origin my-new-feature`)
0. [open a PR](https://github.com/raceup/yentl/compare)

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bhttps%3A%2F%2Fgithub.com%2Fraceup%2Fyentl.svg?type=shield)](https://app.fossa.io/projects/git%2Bhttps%3A%2F%2Fgithub.com%2Fraceup%2Fyentl?ref=badge_shield) [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

[Apache License](http://www.apache.org/licenses/LICENSE-2.0) Version 2.0, January 2004

## Links

* [Web site](https://raceup.github.io)
* [Issue tracker](https://github.com/raceup/yentl/issues)
* [Source code](https://github.com/raceup/yentl)
* [Email](mailto:info@raceup.it)

## You may also like...

- [JYentl](https://github.com/raceup/jyentl) - A desktop Java app that does the same job
