const id = "natalya";
const collection = "members";
const data = {name:"Наталя",position:"Комунікаційниця",picture:
						new Proxy({"src":"/_astro/natalya.ITnnDtAk.png","width":800,"height":1066,"format":"png","fsPath":"/Volumes/Media HD/Web Development/eco-misto-website-test/src/content/members/images/natalya.png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Volumes/Media HD/Web Development/eco-misto-website-test/src/content/members/images/natalya.png";
							}
							
							return target[name];
						}
					})
					,indexId:5};
const _internal = {
	type: 'data',
	filePath: "/Volumes/Media HD/Web Development/eco-misto-website-test/src/content/members/natalya.yaml",
	rawData: "name: Наталя\nposition: Комунікаційниця\npicture: ./images/natalya.png\nindexId: 5\n",
};

export { _internal, collection, data, id };
