import useHttp from "../hooks/http.hook";

const useMarvelService = () => {
  const { loading, request, error, clearError } = useHttp();

  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "apikey=59ae2f9df09e98e814ffbbbfb0c3e587";
  const _baseOffset = 210;

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
    );

    return res.data.results.map(_transformCharacter);
  };

  const getCharacters = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const getComics = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const getAllComics = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`
    );

    return res.data.results.map(_transformComics);
  };

  const _transformCharacter = (res) => {
    return {
      id: res.id,
      name: res.name,
      description: res.description,
      thumbnail: res.thumbnail.path + "." + res.thumbnail.extension,
      homepage: res.urls[0].url,
      wiki: res.urls[1].url,
      comics: res.comics.items,
    };
  };
  const _transformComics = (res) => {
    return {
      id: res.id,
      title: res.title,
      thumbnail: res.thumbnail.path + "." + res.thumbnail.extension,
      price: res.prices.price,
      wiki: res.urls[0].url,
    };
  };
  return {
    loading,
    error,
    getAllCharacters,
    getCharacters,
    clearError,
    getAllComics,
    getComics,
  };
};
export default useMarvelService;
