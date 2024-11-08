const id = "sonya";
const collection = "members";
const data = {name:"Соня",position:"Дизайнерка",picture:
						new Proxy({"src":"/_astro/sonya.ee0md45t.png","width":800,"height":1066,"format":"png","fsPath":"/Volumes/Media HD/Web Development/eco-misto-website-test/src/content/members/images/sonya.png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Volumes/Media HD/Web Development/eco-misto-website-test/src/content/members/images/sonya.png";
							}
							
							return target[name];
						}
					})
					,indexId:6};
const _internal = {
	type: 'data',
	filePath: "/Volumes/Media HD/Web Development/eco-misto-website-test/src/content/members/sonya.yaml",
	rawData: "name: Соня\nposition: Дизайнерка\npicture: \"./images/sonya.png\"\nindexId: 6\n",
};

export { _internal, collection, data, id };
