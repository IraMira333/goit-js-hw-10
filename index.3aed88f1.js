function e(e){return fetch(`https://restcountries.com/v3.1/name/${e}?fields=nameofficial,capital,population,flags.svg,languages\n  `).then((e=>e.json()))}document.querySelector("#search-box").addEventListener("input",(function(e){console.log(e.target.value)})),console.log(e),e("Ukraine").then((e=>console.log(e)));
//# sourceMappingURL=index.3aed88f1.js.map
