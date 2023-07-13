const form = document.querySelector("form");
const GIFsContainer = document.querySelector("div");

const APIKey = "OGQBpKw9pEHlaBlXEX24ajX9v2Q4j2Zg";
const getGIPHYApiUrl = (GIFName) =>
	`https://api.giphy.com/v1/gifs/search?api_key=${APIKey}&limit=1&q=${GIFName}`;

const generateGIFImg = (downsizedGIFUrl, GIFData) => {
	const img = document.createElement("img");

	img.setAttribute("src", downsizedGIFUrl);
	img.setAttribute("alt", GIFData.data[0].title);

	return img;
};

const fetchGIF = async (InputValue) => {
	try {
		const GIPHYApiUrl = getGIPHYApiUrl(InputValue);
		const response = await fetch(GIPHYApiUrl);

		if (!response.ok) {
			throw new Error("Não Deu Para Pegar Dados da Pagina");
		}
		return response.json();
	} catch (error) {
		alert(`Erro: ${error.message}`);
	}
};

const insertGIFIntoDom = async (InputValue) => {
	const GIFData = await fetchGIF(InputValue);

	if (GIFData) {
		const downsizedGIFUrl = GIFData.data[0].images.downsized.url;
		const img = generateGIFImg(downsizedGIFUrl, GIFData);

		GIFsContainer.insertAdjacentElement("afterbegin", img);
		form.reset();
	}
};

form.addEventListener("submit", (event) => {
	event.preventDefault();
	const InputValue = event.target.search.value;

	insertGIFIntoDom(InputValue);
});
