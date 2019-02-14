"use strict";

import {nl} from "util.constants";
import {Queue} from "util.ds";
import logger from "util.log";
import {getUUID, nilEvent} from "util.toolbox";

const pkg = require("./package.json");
const log = logger.instance({
	debug: pkg.debug,
	namespace: "treeitem"
});

export type TreeId = string | number;

export interface TreeItem {
	id?: TreeId;
	data?: any;
	parent?: TreeItem;

	title?: any;
	subtitle?: any;
	expanded?: boolean;
	children?: TreeItem[];
}

export type WalkCallback = (val: TreeItem) => void;
export type ComparatorFn = (it: TreeItem) => boolean;

const nullParent: TreeItem = {
	id: null,
	data: null,
	parent: null,
	title: "",
	subtitle: "",
	expanded: true,
	children: []
};

export class TreeData {
	private _treeData: TreeItem[];

	constructor(
		treeData: TreeItem[],
		private testing: boolean = false,
		private sequence: number = 0
	) {
		this.treeData = treeData;
	}

	get treeData(): TreeItem[] {
		return this._treeData;
	}

	set treeData(val: TreeItem[]) {
		this._treeData = val;
		this.walk(nilEvent);
	}

	/**
	 * Performs a breadth search of the tree for a matching id value.
	 * @param compare {ComparatorFn} compaaison function provided by the specialized
	 * search routine.
	 * @param id {string} the id value to search for
	 * @param treeData {TreeItem[]} the tree struture to search
	 * @return {TreeItem} of the item found otherwise null
	 */
	public find(id: TreeId): TreeItem {
		const q = new Queue<TreeItem>();

		if (this.treeData == null || this.treeData.length < 1) {
			log.warn("treeData is empty");
			return null;
		}

		let children: TreeItem[] = this.treeData;
		let item: TreeItem = null;

		do {
			for (const child of children) {
				// save the current list into the Q
				q.enqueue(child);
			}

			item = q.dequeue();
			if (item.id === id) {
				q.drain();
				return item;
			} else {
				children = item.children;
			}
		} while (q.size > 0);

		return null; // no item found
	}

	/**
	 * Generates a new unique key for a node.  When the testing flag is set
	 * to true, then the id is an ordered sequence.  This is done to make
	 * the keys predictable when the code is under test.
	 * @return {string} the new key value.
	 */
	private getNewKey(): string {
		if (this.testing) {
			log.debug(`Creating testing key with sequence: ${this.sequence}`);
			return `${this.sequence++}`;
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
	public sanitize(
		node: TreeItem,
		defaultTitle: string = "default"
	): TreeItem {
		if (!("parent" in node)) {
			node["parent"] = nullParent;
		}

		if (!("id" in node) || node["id"] == null) {
			node["id"] = this.getNewKey();
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
	 * Prints the internals of the current tree.  It will print the id, the
	 * parent id, and the title for each node.
	 * @param treeData {TreeItem[]} the tree data structure to create as a
	 * string
	 * @return {string} a string representing the tree structure.
	 */
	public toString(): string {
		let s: string = nl;

		this.walk((it: TreeItem) => {
			let parentId: TreeId = "";
			if (it.parent != null) {
				parentId = it.parent.id;
			}

			s += `title: ${it.title}, id: ${
				it.id
			}, parent.id: ${parentId}${nl}`;
		});

		return s;
	}

	/**
	 * Performs an inorder traversal of the current tree.  At each node
	 * a callback function is executed and the node being processed
	 * is given as a parameter.
	 * @param fn {WalkCallback} a callback function invoked on each
	 * node as it is encountered.
	 * @param usesanitize {boolean} (true) if true it validates the
	 * contents of each TreeItem encountered
	 * @return {TreeeItem[]} a reference to the tree structure that was
	 * processed.
	 */
	public walk(fn: WalkCallback, usesanitize: boolean = true): TreeItem[] {
		if (typeof fn !== "function") {
			throw new Error("walk() parameter must be a function");
		}

		const self: any = this;

		function preorder(arr: TreeItem[]) {
			for (const it of arr) {
				fn(usesanitize ? self.sanitize(it) : it);

				if ("children" in it && it.children.length > 0) {
					for (const child of it.children) {
						child["parent"] = it;
					}

					preorder(it.children);
				}
			}
		}

		preorder(this.treeData);
		return this.treeData;
	}
}
