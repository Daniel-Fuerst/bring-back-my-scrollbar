all: bbms.xpi

bbms.xpi: content.js options.js
	zip -r bbms.xpi icons styles content.js manifest.json options.html options.js

content.js: content.ts
	tsc content.ts

options.js: options.ts
	tsc options.ts

clean:
	rm -f content.js options.js bbms.xpi

.PHONY: all bbms.xpi clean
