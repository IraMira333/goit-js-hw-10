function e(e){return fetch(`https://restcountries.com/v3.1/name/${e}?fields=name,capital,population,flags,languages\n  `).then((e=>e.json()))}document.querySelector("#search-box").addEventListener("input",(function(e){console.log(e.target.value)})),console.log(e),e("Ukraine").then((e=>console.log(e)));
//# sourceMappingURL=index.1af62246.js.map
