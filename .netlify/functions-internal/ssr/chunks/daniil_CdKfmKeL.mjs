const id = "daniil";
const collection = "members";
const data = {name:"Даниїл",position:"Проєктний менеджер",picture:
						new Proxy({"src":"/_astro/daniil.D4-A-VVV.png","width":800,"height":1066,"format":"png","fsPath":"/Volumes/Media HD/Web Development/eco-misto-website-test/src/content/members/images/daniil.png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Volumes/Media HD/Web Development/eco-misto-website-test/src/content/members/images/daniil.png";
							}
							
							return target[name];
						}
					})
					,indexId:3};
const _internal = {
	type: 'data',
	filePath: "/Volumes/Media HD/Web Development/eco-misto-website-test/src/content/members/daniil.yaml",
	rawData: "name: Даниїл\nposition: Проєктний менеджер\npicture: \"./images/daniil.png\"\nindexId: 3\n",
};

export { _internal, collection, data, id };
