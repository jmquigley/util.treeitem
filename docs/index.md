## Functions

<dl>
<dt><a href="#sanitize">sanitize(node, testing, defaultTitle)</a></dt>
<dd><p>Takes an input node and ensures that it has all possible fields.     It
also creates the node key value if one does not exist.</p>
</dd>
<dt><a href="#walk">walk(fn)</a></dt>
<dd><p>Performs an inorder traversal of the current tree.  At each node
a callback function is executed and the node being processed
is given as a parameter.</p>
</dd>
</dl>

<a name="sanitize"></a>

## sanitize(node, testing, defaultTitle)
Takes an input node and ensures that it has all possible fields.	 It
also creates the node key value if one does not exist.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| node | <code>TreeItem</code> |  | the node to fix |
| testing | <code>boolean</code> | <code>false</code> | a flag that denotes the module is under testing When testing the keys are generated as a sequence instead of as a UUID |
| defaultTitle | <code>string</code> | <code>&quot;default&quot;</code> | ('default') a default string set for the title if it doesn't exist or is empty. |

<a name="walk"></a>

## walk(fn)
Performs an inorder traversal of the current tree.  At each node
a callback function is executed and the node being processed
is given as a parameter.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>WalkCallback</code> | a callback function invoked on each node as it is encountered. |

