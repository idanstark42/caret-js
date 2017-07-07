# caret-js
A jquery extension used to load and save the caret location in an element regardless of other elements in it.

# Usage
`$(selector).caret(func);`
`func` can be one of the following:
`save` - saves the location of the caret in the element. Throws error if the caret is not in the element.
`load` - load the location of the caret and places the caret on that location in the element.
`get` - returns the index of the caret in the element.
