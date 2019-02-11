# util.treeitem

> Utility functions for manipulating a treeData structure

[![build](https://travis-ci.org/jmquigley/util.treeitem.svg?branch=master)](https://travis-ci.org/jmquigley/util.treeitem)
[![analysis](https://img.shields.io/badge/analysis-tslint-9cf.svg)](https://palantir.github.io/tslint/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![testing](https://img.shields.io/badge/testing-jest-blue.svg)](https://facebook.github.io/jest/)
[![NPM](https://img.shields.io/npm/v/util.treeitem.svg)](https://www.npmjs.com/package/util.treeitem)
[![coverage](https://coveralls.io/repos/github/jmquigley/util.treeitem/badge.svg?branch=master)](https://coveralls.io/github/jmquigley/util.treeitem?branch=master)

This module is a support module for use with the [gadgets](https://github.com/jmquigley/gadgets) library [Treeview](https://github.com/jmquigley/gadgets/blob/master/docs/lib/treeview/Treeview.md) React component.  It provides functions for maintaning and manipulating the treeData object structure.


# Installation

This module uses [yarn](https://yarnpkg.com/en/) to manage dependencies and run scripts for development.

To install as an application dependency with cli:

```
$ yarn add --dev util.treeitem
```

To build the app and run all tests:

```
$ yarn run all
```


# TreeItem/Treedata Structure

The treeData is an array of TreeItem nodes.  A `TreeItem` node (dict) contains the following properties:

- `id {stromg}` - a unique id/key value for the node
- `parent {TreeItem}` - reference to the parent node
- `data {any}` - a variable to hold any data associated with the node (can hold any type of data)
- `title {string}` - a string that represents the title displayed on the Treeview component
- `subtitle {string}` - sub string below the main title.
- `expanded {boolean}` - a boolean flag that determines if the children of this node are displayed
- `children {TreeItem[]}` - an array of `TreeItem` nodes attached to this node.

An example of this data structure is:


    [
        {title: "string", subtitle: "string", expanded: "boolean", children: ["treeData"]},
        {title: "string", subtitle: "string", expanded: "boolean", children: [
            {title: "string", subtitle: "string", expanded: "boolean", children: ["treeData"]},
            {title: "string", subtitle: "string", expanded: "boolean", children: ["treeData"]}
        ]}
        ...
    ]


# API

- [sanitize](docs/index.md#sanitize)
- [walk](docs/index.md#walk)
