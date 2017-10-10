const XmlReader = require('xml-reader');
const xmlQuery = require('xml-query');

const xml =
`<message id="1001" date="2016-06-19">
   <from>Bob</from>
   <to>Alice</to>
   <subject>Hello</subject>
   <body>Bla bla bla</body>
</message>`;

const ast = XmlReader.parseSync(xml);
alert(JSON.stringify(xmlQuery(ast).find('body').text()));