const faviconPngSrc = new Proxy({"src":"/_astro/favicon.C4NqubTj.png","width":512,"height":512,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Volumes/Media HD/Web Development/eco-misto-website-test/src/assets/favicon.png";
							}
							
							return target[name];
						}
					});

const baseData = {
  title: "Громадська організація «Еко Місто Чернігів»",
  description: "Популяризуємо розвиток мейкерства, ресайклінга та підтримуємо велосипедний рух в Чернігові."
};
const navData = [
  {
    title: "Проєкти",
    href: "/projects"
  },
  {
    title: "Контакти",
    href: "#contacts"
  }
];
const achievmentsData = [
  {
    title: "424",
    description: "креативних заходів організовано",
    id: "primary",
    "left-translateX": "-100%",
    "right-translateX": "100%",
    "right-rotate": "270deg"
  },
  {
    title: "726",
    description: "соціальних велосипедів видано",
    id: "primary-light",
    "left-translateX": "-100%",
    "right-translateX": "100%",
    "left-rotate": "90deg",
    "right-rotate": "180deg"
  },
  {
    title: "7",
    description: "публічних просторів ревіталізовано",
    id: "accent",
    "left-translateX": "-100%",
    "right-translateX": "100%",
    "left-rotate": "90deg",
    "right-rotate": "180deg"
  }
];
const socialData = [
  {
    title: "Instagram",
    href: "https://www.instagram.com/eco_misto",
    icon: "icon-instagram"
  },
  {
    title: "Facebook",
    href: "https://www.facebook.com/eco.cn.ua",
    icon: "icon-facebook"
  },
  {
    title: "Youtube",
    href: "https://www.youtube.com/@eco-misto",
    icon: "icon-youtube"
  },
  {
    title: "Telegram",
    href: "https://t.me/ecochernihivbot",
    icon: "icon-telegram"
  },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/company/eco-misto",
    icon: "icon-linkedin"
  }
];
const contactsData = [
  {
    description: "+38 073 479 99 87",
    icon: "icon-phone",
    href: "tel:+380734799987"
  },
  {
    description: "info@ecomisto.org",
    icon: "icon-mail",
    href: "mailto:info@ecomisto.org"
  },
  {
    description: "м. Чернігів, проспект Левка Лук'яненка 2А",
    icon: "icon-pin",
    href: "https://maps.app.goo.gl/6NF8PMSFEzigDxkg7"
  }
];
const cooperationData = [
  {
    label: "Мене звати *",
    formControl: "input",
    name: "name",
    placeholder: "Костя",
    type: "text",
    required: true,
    pattern: "^[A-Za-zА-Яа-я0-9 ]{2,20}$"
  },
  {
    label: "Я з організації *",
    formControl: "input",
    name: "organization",
    placeholder: "Platforma",
    type: "text",
    required: true,
    pattern: "^[A-Za-zА-Яа-я0-9 ]{2,80}$"
  },
  {
    label: "Я хотів/ла би обговорити *",
    formControl: "textarea",
    name: "message",
    placeholder: "Розкажіть про вашу ідею",
    required: true,
    rows: "3"
  },
  {
    label: "Я дізнався/лася про вашу організацію",
    formControl: "input",
    name: "source",
    placeholder: "Я дізнався з соцмереж.",
    type: "text"
  },
  {
    label: "Дайте відповідь мені на мою пошту *",
    formControl: "input",
    name: "email",
    placeholder: "kostya@gmail.com",
    type: "email",
    required: true,
    pattern: "[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~\\-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*"
  }
];
const donateData = [
  {
    label: "Введіть суму *",
    formControl: "input",
    name: "amount",
    placeholder: "0",
    type: "number",
    required: true,
    min: "0"
  },
  {
    label: "Ваша пошта *",
    formControl: "input",
    name: "email",
    placeholder: "marusya@gmail.com",
    type: "text",
    required: true,
    pattern: "^((?!.)[w-_.]*[^.])(@w+)(.w+(.w+)?[^.W])$/gim"
  }
];

export { achievmentsData as a, baseData as b, contactsData as c, donateData as d, cooperationData as e, faviconPngSrc as f, navData as n, socialData as s };
