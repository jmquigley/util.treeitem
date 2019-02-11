"use strict";

import {getUUID} from "util.toolbox";

export interface TreeItem {
	id?: string | number;
	data?: any;
	parent?: TreeItem;

	title?: any;
	subtitle?: any;
	expanded?: boolean;
	children?: TreeItem[];
}

export type WalkCallback = (val: TreeItem) => void;

let sequence: number = 0;
function getKey(testing: boolean = false): string {
	if (testing) {
		return `${sequence++}`;
	}

	return getUUID();
}

/**
 * Takes an input node and ensures that it has all possible fields.	 It
 * also creates the node key value if one does not exist.
 * @param node {TreeItem} the node to fix
 * @param testing {boolean} a flag that denotes the module is under testing
 * When testing the keys are generated as a sequence instead of as a UUID
 * @param defaultTitle {string} ('default') a default string set for the
 * title if it doesn't exist or is empty.
 */
export function sanitize(
	node: TreeItem,
	testing: boolean = false,
	defaultTitle: string = "default"
): TreeItem {
	if (!("parent" in node)) {
		node["parent"] = null;
	}

	if (!("id" in node) || node["id"] == null) {
		node["id"] = getKey(testing);
	}

	if (!("title" in node) || node["title"] == null) {
		node["title"] = defaultTitle;
	}

	if (!("subtitle" in node)) {
		node["subtitle"] = "";
	}

	if (!("expanded" in node)) {
		node["expanded"] = true;
	}

	if (!("data" in node)) {
		node["data"] = null;
	}

	if (!("children" in node)) {
		node["children"] = [];
	}

	return node;
}

/**
 * Performs an inorder traversal of the current tree.  At each node
 * a callback function is executed and the node being processed
 * is given as a parameter.
 * @param fn {WalkCallback} a callback function invoked on each
 * node as it is encountered.
 */
export function walk(
	treeData: TreeItem[],
	fn: WalkCallback,
	testing: boolean = false
) {
	if (typeof fn !== "function") {
		throw new Error("walk() parameter must be a function");
	}

	function preorder(arr: TreeItem[]) {
		for (const it of arr) {
			fn(sanitize(it, testing));

			if ("children" in it && it.children.length > 0) {
				for (const child of it.children) {
					child["parent"] = it;
				}

				preorder(it.children);
			}
		}
	}

	preorder(treeData);
}
