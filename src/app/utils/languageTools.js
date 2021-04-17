export const supportLanguages = [
	{ value: 'en', label: 'English' },
	{ value: 'zh-tw', label: '繁體中文' },
	// { value: 'zh-cn', label: '簡體中文' },
];

/* [檢查-語系]本系統是否支援該語系 並回傳語系 */
export const checkLanguageSupport = language => {
	const isSupport = supportLanguages.some(({ value }) => value === language);
	return isSupport ? language : supportLanguages[0].value;
};

/* [檢查-路徑]本系統是否支援該語系 並回傳語系 */
export const checkLanguageWithPaths = pathname => {
	const currentPathnames = pathname.split('/'); // 將網址分割
	let language = supportLanguages[0].value; // 預設第一個語系
	// 逐一檢查語系
	for (let i = 0; i < supportLanguages.length; i += 1) {
		if (currentPathnames.includes(supportLanguages[i].value)) {
			language = supportLanguages[i].value;
			break;
		}
	}
	return language;
};

/* 變更語系 */
export const changeLang = ({ history, currentLanguage, nextLanguage }) => {
	const {
		location: { pathname, search },
	} = history;

	/* 檢查網址中是否有語系存在 */
	if (currentLanguage && pathname.startsWith(`/${currentLanguage}`)) {
		/* 存在 => 取代原有語系 */
		history.push({
			pathname: pathname.replace(`/${currentLanguage}`, `/${checkLanguageSupport(nextLanguage)}`),
			search,
		});
	} else {
		/* 不存在 => 推入瀏覽器預設語系 */
		const browserLanguage = (navigator.languages
			? navigator.languages[0]
			: navigator.language || navigator.userLanguage
		).toLowerCase();
		history.push({ pathname: `/${checkLanguageSupport(browserLanguage)}` });
	}
};
