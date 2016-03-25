###Get Students Information in CQUPT (Node.js)
#####How to use?
* Installation

  `npm i --save`
  
* API

  ```
  var info = require('getInfo');
  info.get(id, callback)
  function callback (data) {
  	//data is students info, can be array or two-dimensional arrays
  }
  ```