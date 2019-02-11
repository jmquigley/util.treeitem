"use strict";

import {Fixture} from "util.fixture";
import {sanitize, TreeItem, walk} from "../index";

const testing: boolean = true;

test("Test the walk function on a basic TreeItem fixture object", () => {
	const fixture = new Fixture("basic");
	expect(fixture).toBeDefined();
	expect(fixture.obj).toBeDefined();

	// Walk through the tree.  Concatenate the title values together
	// to create a string that can be compared for ordering
	let out: string = "";
	walk(fixture.obj["treeData"], (it: TreeItem) => {
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

	walk(fixture.obj["treeData"], (it: TreeItem) => {
		const newIt = sanitize(it, testing);

		expect(newIt).toHaveProperty("id");
		expect(newIt).toHaveProperty("data");
		expect(newIt).toHaveProperty("parent");
		expect(newIt).toHaveProperty("title");
		expect(newIt).toHaveProperty("subtitle");
		expect(newIt).toHaveProperty("expanded");
		expect(newIt).toHaveProperty("children");
	});
});
