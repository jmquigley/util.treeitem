# util.treeitem

> Utility functions for manipulating a treeData structure

[![build](https://travis-ci.org/jmquigley/util.treeitem.svg?branch=master)](https://travis-ci.org/jmquigley/util.treeitem)
[![analysis](https://img.shields.io/badge/analysis-tslint-9cf.svg)](https://palantir.github.io/tslint/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![testing](https://img.shields.io/badge/testing-jest-blue.svg)](https://facebook.github.io/jest/)
[![NPM](https://img.shields.io/npm/v/util.treeitem.svg)](https://www.npmjs.com/package/util.treeitem)
[![coverage](https://coveralls.io/repos/github/jmquigley/util.treeitem/badge.svg?branch=master)](https://coveralls.io/github/jmquigley/util.treeitem?branch=master)

This module is a support class for use with the [gadgets](https://github.com/jmquigley/gadgets) library [Treeview](https://github.com/jmquigley/gadgets/blob/master/docs/lib/treeview/Treeview.md) React component.  It provides a class and functions for maintaning and manipulating the treeData object structure used to represent the Treeview.


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

The treeData is an array of `TreeItem` nodes.  A `TreeItem` node is a dictionary that contains the following properties:

- `id {string}` - a unique id/key value for the node
- `parent {TreeItem}` - reference to the parent node, where the id of the parent is `parent.id`
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

This is the structure of a [general tree](http://www.cs.cmu.edu/~clo/www/CMU/DataStructures/Lessons/lesson4_1.htm), where each node can have an arbitrary number of *children*.


# Usage

Create an instance of the `TreeData` class, where the constructor is an array of `TreeItem` nodes (shown above).  The resulting instance is then used to interact with the data.  To create a simple instance:

```javascript
import {TreeData, TreeItem} from "util.treeitem";

const data: TreeItem[] = [
    {id: 0, title: "1.0", children: [{id: 3, title: "1.1", children[]}]}
    {id: 1, title: "2.0", children: []}
    {id: 2, title: "3.0", children: []}
];

const td = new TreeData(data);
```

Once the instance is created the tree can be searched by `id` values using the `find` function:

```javascript
let it: TreeItem = td.find(1);

// it -> {id: 1, title: "2.0", children: []}
```

The tree can also be traversed in order with the `walk` function:

```javascript
td.walk((node: TreeItem) => {
    log.info('node: %O', node);
});
```

The `walk` function will visit each node in the tree in order invoking a callback function as each node is encountered.  The callback receives a reference to each node.


# API

- [TreeData (class)](docs/index.md#TreeData)

- [.createNode()](docs/index.md#TreeData+createNode)
- [.find()](docs/index.md#TreeData+find)
- [.getNewKey()](docs/index.md#TreeData+getNewKey)
- [.sanitize()](docs/index.md#TreeData+sanitize)
- [.toString()](docs/index.md#TreeData+toString)
- [.walk()](docs/index.md#TreeData+walk)
