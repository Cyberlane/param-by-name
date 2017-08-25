[![Version](http://img.shields.io/npm/v/param-by-name.svg)](https://www.npmjs.org/package/param-by-name)
[![npm](https://img.shields.io/npm/dt/param-by-name.svg)](Downloads)

# param-by-name

Parsing url parameters within the browser can be a pain, so this tries to make it a little easier.

## Example

```js
import paramByName from 'param-by-name';

const search = paramByName('search');
if (Boolean(search)) {
  alert(`Searching for ${search}`);
} else {
  alert('No search param found');
}
```
