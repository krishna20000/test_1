const coinTabel = document.querySelector('.tableBody');
const sortByMktCapBtn = document.getElementById('MktCap');
const sortByPercentageBtn = document.getElementById('percentage');
const searchInput = document.getElementById('serachbar'); 

fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
.then((res) => res.json())
.then((data) => {
    

    data.forEach((coin) => {
        console.log(coin);
        coinTabel.innerHTML += `
        
        <tr class='tabel'>
            <td> <img class='logocoin' src="${coin.image}" alt="${coin.name}"></td>
            <td class='name'>${coin.name}</td>
            <td class='price'>${coin.current_price.toFixed(2)}</td>
            <td class='volume'>${coin.total_volume.toLocaleString()}</td>
            <td class='change'>${coin.price_change_percentage_24h.toFixed(2)}%</td>
            <td class='mktCap'>Mkt Cap: $${coin.market_cap.toLocaleString()}</td>
            
        
        </tr>
        
      
        
        
        `;
    });
    searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filteredCoins = coinData.filter(coin =>
    coin.name.toLowerCase().includes(query) || coin.symbol.toLowerCase().includes(query)
  );
  displayCoins(filteredCoins);
});

sortByMktCapBtn.addEventListener("click", () => {
  coinData.sort((a, b) => b.market_cap - a.market_cap);
  displayCoins(coinData);
});

sortByPercentageBtn.addEventListener("click", () => {
  coinData.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
  displayCoins(coinData);
});
});

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filteredCoins = coinData.filter(coin =>
    coin.name.toLowerCase().includes(query) || coin.symbol.toLowerCase().includes(query)
  );
  displayCoins(filteredCoins);
});

sortByMktCapBtn.addEventListener("click", () => {
  coinData.sort((a, b) => b.market_cap - a.market_cap);
  displayCoins(coinData);
});

sortByPercentageBtn.addEventListener("click", () => {
  coinData.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
  displayCoins(coinData);
});