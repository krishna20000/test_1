const coinTable = document.querySelector('.tableBody');
const sortByMktCapBtn = document.getElementById('MktCap');
const sortByPercentageBtn = document.getElementById('percentage');
const searchInput = document.getElementById('searchbar');// Fixed typo

let coinData = []; // Stores original API data
let displayedData = []; // Stores filtered/sorted data for display

// Fetch data
fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
  .then((res) => res.json())
  .then((data) => {
    coinData = data; // Store original data
    displayedData = [...coinData]; // Clone data for display
    displayCoins(displayedData);
  });

function displayCoins(data) {
  coinTable.innerHTML = ""; // Clear table before inserting new data
  data.forEach((coin) => {
    coinTable.innerHTML += `
      <tr class='tabel'>
          <td class='tabelData imgdata'> <img class='logocoin' src="${coin.image}" alt="${coin.name}">${coin.name}</td>
          <td class='tabelData'>${coin.symbol.toUpperCase()}</td>
          <td class='tabelData'>$${coin.current_price.toFixed(2)}</td>
          <td class='tabelData'>${coin.total_volume.toLocaleString()}</td>
          <td class='change tabelData percnetage'>${coin.price_change_percentage_24h.toFixed(2)}%</td>
          <td class='tabelData'>Mkt Cap: $${coin.market_cap.toLocaleString()}</td>
      </tr>
    `;
  });
}

// Search Functionality
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  displayedData = coinData.filter(coin =>
    coin.name.toLowerCase().includes(query) || coin.symbol.toLowerCase().includes(query)
  );
  displayCoins(displayedData);
});

// Sort by Market Cap
sortByMktCapBtn.addEventListener("click", () => {
  displayedData.sort((a, b) => b.market_cap - a.market_cap);
  displayCoins(displayedData);
});

// Sort by Percentage Change
sortByPercentageBtn.addEventListener("click", () => {
  displayedData.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
  displayCoins(displayedData);
});
