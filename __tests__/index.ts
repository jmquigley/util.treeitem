"use strict";

import logger from "util.log";
import {Fixture} from "util.fixture";
import {TreeData, TreeItem} from "../index";

const pkg = require("../package.json");
const log = logger.instance({
	debug: pkg.debug,
	namespace: "treeitem.test"
});
const testing: boolean = true;

test("Test the walk function on a basic TreeItem fixture object", () => {
	const fixture = new Fixture("basic");
	expect(fixture).toBeDefined();
	expect(fixture.obj).toBeDefined();

	const td = new TreeData(fixture.obj["treeData"]);
	expect(td).toBeDefined();

	// Walk through the tree.  Concatenate the title values together
	// to create a string that can be compared for ordering
	let out: string = "";
	td.walk((it: TreeItem) => {
		out += `${it.title} `;
	});
	out = out.trim();

	expect(out).toBeDefined();
	expect(out).toBe("1.0 1.1 1.2 1.3 2.0 2.1 2.2 2.3 3.0 3.1 3.2 3.3");
});

test("Test the sanitize function on a basic TreeItem fixture object", () => {
	const fixture = new Fixture("basic");
	expect(fixture).toBeDefined();
	expect(fixture.obj).toBeDefined();

	const td = new TreeData(fixture.obj["treeData"]);
	expect(td).toBeDefined();

	td.walk((it: TreeItem) => {
		const newIt = td.sanitize(it, testing);

		expect(newIt).toHaveProperty("id");
		expect(newIt).toHaveProperty("data");
		expect(newIt).toHaveProperty("parent");
		expect(newIt).toHaveProperty("title");
		expect(newIt).toHaveProperty("subtitle");
		expect(newIt).toHaveProperty("expanded");
		expect(newIt).toHaveProperty("children");
	}, false); // turn off sanitize
});

test("Test searching for an id within the tree", () => {
	const fixture = new Fixture("search");
	expect(fixture).toBeDefined();
	expect(fixture.obj).toBeDefined();

	const td = new TreeData(fixture.obj["treeData"]);
	expect(td).toBeDefined();

	// Item should be found in the tree
	let it: TreeItem = td.find(4);
	expect(it).toBeDefined();
	log.debug("TreeItem -> %O", it);

	expect(it.title).toBe("2.0");
	expect(it.expanded).toBe(true);
	expect(it.children.length).toBe(3);
	expect(it.parent.id).toBeNull();

	// Item should not be found in the tree
	it = td.find(127);
	expect(it).toBeNull();
});

// test("Test assignment of parent/child relationships after walk", () => {
// 	const fixture = new Fixture("predictable");
// 	expect(fixture).toBeDefined();
// 	expect(fixture.obj).toBeDefined();
//
// 	let out: string = "";
// 	walk(fixture.obj["treeData"], (it: TreeItem) => {
// 		out += `${it.title} `;
// 	});
// 	out = out.trim();
//
// 	expect(out).toBeDefined();
// 	expect(out).toBe("1.0 1.1 1.2 2.0 2.1 2.2");
// });
