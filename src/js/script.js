const resultArtist = document.getElementById("result-artist");
const playlistContainer = document.getElementById("result-playlists");
const searchInput = document.getElementById("search-input");
const artistImage = document.getElementById("artist-img");
const artistName = document.getElementById("artist-name");

let lista = []; // Inicializa a lista vazia, pois você vai preenchê-la após a carga do arquivo JSON

// Fazendo uma solicitação para obter o conteúdo do arquivo JSON
fetch("src/api-artists/artists.json")
  .then((response) => response.json())
  .then((data) => {
    // Verifica se 'data.artists' é um array antes de atribuir a 'lista'
    if (Array.isArray(data.artists)) {
      lista = data.artists;
    } else {
      console.error(
        "O conteúdo do arquivo JSON não contém um array de artistas:",
        data
      );
    }
  })
  .catch((error) => console.error("Erro ao carregar o arquivo JSON:", error));

// Função de pesquisa
function procurarArtistasPorNome(searchTerm, lista) {
  searchTerm = searchTerm.toLowerCase();
  // Verifica se 'lista' é um array antes de usar 'filter'
  if (Array.isArray(lista)) {
    return lista.filter((artist) =>
      artist.name.toLowerCase().includes(searchTerm)
    );
  } else {
    console.error("'lista' não é um array:", lista);
    return [];
  }
}

// Adiciona um ouvinte de evento de entrada ao campo de pesquisa
searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase();
  if (searchTerm === "") {
    resultArtist.classList.add("hidden");
    playlistContainer.classList.remove("hidden");
    return;
  }
  const result = procurarArtistasPorNome(searchTerm, lista);
  displayResults(result);
});

function displayResults(result) {
  hidePlaylists();
  result.forEach((element) => {
    artistImage.src = element.urlImg;
    artistName.innerText = element.name;
  });

  resultArtist.classList.remove("hidden");
}

function createArtistCard(artist) {}

function hidePlaylists() {
  playlistContainer.classList.add("hidden");
}
