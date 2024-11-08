const product4 = new Proxy({"src":"/_astro/plastic_fantastic_product_004.DhvNaQeD.jpg","width":1200,"height":1500,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Volumes/Media HD/Web Development/eco-misto-website-test/src/content/projects/images/plastic-fantastic/plastic_fantastic_product_004.jpg";
							}
							
							return target[name];
						}
					});

export { product4 as default };
