const id = "anya";
const collection = "members";
const data = {name:"Аня",position:"Майстриня",picture:
						new Proxy({"src":"/_astro/anya.BPvyoPgY.png","width":800,"height":1066,"format":"png","fsPath":"/Volumes/Media HD/Web Development/eco-misto-website-test/src/content/members/images/anya.png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Volumes/Media HD/Web Development/eco-misto-website-test/src/content/members/images/anya.png";
							}
							
							return target[name];
						}
					})
					,indexId:8};
const _internal = {
	type: 'data',
	filePath: "/Volumes/Media HD/Web Development/eco-misto-website-test/src/content/members/anya.yaml",
	rawData: "name: Аня\nposition: Майстриня\npicture: \"./images/anya.png\"\nindexId: 8\n",
};

export { _internal, collection, data, id };
