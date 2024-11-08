const id = "maksym";
const collection = "members";
const data = {name:"Максим",position:"Адміністратор майстерні",picture:
						new Proxy({"src":"/_astro/maksym.BcRDB4lu.png","width":800,"height":1066,"format":"png","fsPath":"/Volumes/Media HD/Web Development/eco-misto-website-test/src/content/members/images/maksym.png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Volumes/Media HD/Web Development/eco-misto-website-test/src/content/members/images/maksym.png";
							}
							
							return target[name];
						}
					})
					,indexId:7};
const _internal = {
	type: 'data',
	filePath: "/Volumes/Media HD/Web Development/eco-misto-website-test/src/content/members/maksym.yaml",
	rawData: "name: Максим\nposition: Адміністратор майстерні\npicture: \"./images/maksym.png\"\nindexId: 7\n",
};

export { _internal, collection, data, id };
