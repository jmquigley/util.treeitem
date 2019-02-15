<a name="TreeData"></a>

## TreeData
**Kind**: global class  
**Contructor**:   

* [TreeData](#TreeData)
    * [new TreeData(treeData)](#new_TreeData_new)
    * [.createNode(parentNode)](#TreeData+createNode) ⇒ <code>TreeItem</code>
    * [.find(id)](#TreeData+find) ⇒ <code>TreeItem</code>
    * [.getNewKey()](#TreeData+getNewKey) ⇒ <code>string</code>
    * [.sanitize(node, testing, defaultTitle)](#TreeData+sanitize) ⇒ <code>TreeItem</code>
    * [.toString()](#TreeData+toString) ⇒ <code>string</code>
    * [.walk(fn, usesanitize)](#TreeData+walk) ⇒ <code>Array.&lt;TreeeItem&gt;</code>

<a name="new_TreeData_new"></a>

### new TreeData(treeData)
Creates an instance of the TreeData class.  When the data is loaded via
the constructor the full tree is traversed and the nodes are sanitized.
All of the parent/child keys are set if they are not available.


| Param | Type | Description |
| --- | --- | --- |
| treeData | <code>Array.&lt;TreeItem&gt;</code> | the data that represents the current general tree. |

<a name="TreeData+createNode"></a>

### treeData.createNode(parentNode) ⇒ <code>TreeItem</code>
Creates a new node object with default properties.

**Kind**: instance method of [<code>TreeData</code>](#TreeData)  
**Returns**: <code>TreeItem</code> - a new node instance reference  

| Param | Default | Description |
| --- | --- | --- |
| parentNode | <code></code> | a parent node associated with this instance |

<a name="TreeData+find"></a>

### treeData.find(id) ⇒ <code>TreeItem</code>
Performs a breadth search of the tree for a matching id value.

**Kind**: instance method of [<code>TreeData</code>](#TreeData)  
**Returns**: <code>TreeItem</code> - of the item found otherwise null  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | the id value to search for |

<a name="TreeData+getNewKey"></a>

### treeData.getNewKey() ⇒ <code>string</code>
Generates a new unique key for a node.  When the testing flag is set
to true, then the id is an ordered sequence.  This is done to make
the keys predictable when the code is under test.

**Kind**: instance method of [<code>TreeData</code>](#TreeData)  
**Returns**: <code>string</code> - the new key value.  
<a name="TreeData+sanitize"></a>

### treeData.sanitize(node, testing, defaultTitle) ⇒ <code>TreeItem</code>
Takes an input node and ensures that it has all possible fields.	 It
also creates the node key value if one does not exist.

**Kind**: instance method of [<code>TreeData</code>](#TreeData)  
**Returns**: <code>TreeItem</code> - a referece back of the node that was sanitized  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>TreeItem</code> | the node to fix |
| testing | <code>boolean</code> | a flag that denotes the module is under testing When testing the keys are generated as a sequence instead of as a UUID |
| defaultTitle | <code>string</code> | ('default') a default string set for the title if it doesn't exist or is empty. |

<a name="TreeData+toString"></a>

### treeData.toString() ⇒ <code>string</code>
Prints the internals of the current tree.  It will print the id, the
parent id, and the title for each node.

**Kind**: instance method of [<code>TreeData</code>](#TreeData)  
**Returns**: <code>string</code> - a string representing the tree structure.  
<a name="TreeData+walk"></a>

### treeData.walk(fn, usesanitize) ⇒ <code>Array.&lt;TreeeItem&gt;</code>
Performs an inorder traversal of the current tree.  At each node
a callback function is executed and the node being processed
is given as a parameter.

**Kind**: instance method of [<code>TreeData</code>](#TreeData)  
**Returns**: <code>Array.&lt;TreeeItem&gt;</code> - a reference to the tree structure that was
processed.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| fn | <code>WalkCallback</code> |  | a callback function invoked on each node as it is encountered. |
| usesanitize | <code>boolean</code> | <code>true</code> | (true) if true it validates the contents of each TreeItem encountered |

