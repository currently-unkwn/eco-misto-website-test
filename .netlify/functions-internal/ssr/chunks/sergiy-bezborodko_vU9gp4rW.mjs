const id = "sergiy-bezborodko";
const collection = "members";
const data = {name:"Сергій",position:"Керівник організації",picture:
						new Proxy({"src":"/_astro/sergiy-b.Dg-guVmX.png","width":800,"height":1066,"format":"png","fsPath":"/Volumes/Media HD/Web Development/eco-misto-website-test/src/content/members/images/sergiy-b.png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Volumes/Media HD/Web Development/eco-misto-website-test/src/content/members/images/sergiy-b.png";
							}
							
							return target[name];
						}
					})
					,indexId:1};
const _internal = {
	type: 'data',
	filePath: "/Volumes/Media HD/Web Development/eco-misto-website-test/src/content/members/sergiy-bezborodko.yaml",
	rawData: "name: Сергій\nposition: Керівник організації\npicture: \"./images/sergiy-b.png\"\nindexId: 1\n",
};

export { _internal, collection, data, id };
