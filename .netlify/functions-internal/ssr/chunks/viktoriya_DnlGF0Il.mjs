const id = "viktoriya";
const collection = "members";
const data = {name:"Вікторія",position:"Виконавча директорка",picture:
						new Proxy({"src":"/_astro/viktoriya.D_8fz9gW.png","width":800,"height":1066,"format":"png","fsPath":"/Volumes/Media HD/Web Development/eco-misto-website-test/src/content/members/images/viktoriya.png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Volumes/Media HD/Web Development/eco-misto-website-test/src/content/members/images/viktoriya.png";
							}
							
							return target[name];
						}
					})
					,indexId:2};
const _internal = {
	type: 'data',
	filePath: "/Volumes/Media HD/Web Development/eco-misto-website-test/src/content/members/viktoriya.yaml",
	rawData: "name: Вікторія\nposition: Виконавча директорка\npicture: \"./images/viktoriya.png\"\nindexId: 2\n",
};

export { _internal, collection, data, id };
