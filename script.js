const pairs = [
  { name: "EUR/USD", type: "forex" },
  { name: "GBP/USD", type: "forex" },
  { name: "USD/JPY", type: "forex" },
  { name: "USD/CHF", type: "forex" },
  { name: "USD/CAD", type: "forex" },
  { name: "AUD/USD", type: "forex" },
  { name: "NZD/USD", type: "forex" },
  { name: "EUR/GBP", type: "forex" },
  { name: "EUR/JPY", type: "forex" },
  { name: "EUR/CHF", type: "forex" },
  { name: "EUR/AUD", type: "forex" },
  { name: "EUR/CAD", type: "forex" },
  { name: "GBP/JPY", type: "forex" },
  { name: "GBP/CHF", type: "forex" },
  { name: "GBP/AUD", type: "forex" },
  { name: "GBP/CAD", type: "forex" },
  { name: "AUD/JPY", type: "forex" },
  { name: "AUD/CHF", type: "forex" },
  { name: "AUD/CAD", type: "forex" },
  { name: "CAD/JPY", type: "forex" },
  { name: "CAD/CHF", type: "forex" },
  { name: "CHF/JPY", type: "forex" },
  { name: "NZD/JPY", type: "forex" },
  { name: "NZD/CHF", type: "forex" },
  { name: "NZD/CAD", type: "forex" },
  { name: "AUD/NZD", type: "forex" },
  { name: "USD/TRY", type: "forex" },
  { name: "EUR/TRY", type: "forex" },
  { name: "USD/SEK", type: "forex" },
  { name: "EUR/SEK", type: "forex" },
  { name: "USD/NOK", type: "forex" },
  { name: "EUR/NOK", type: "forex" },
  { name: "USD/DKK", type: "forex" },
  { name: "EUR/DKK", type: "forex" },
  { name: "USD/HKD", type: "forex" },
  { name: "USD/CNH", type: "forex" },
  { name: "USD/SGD", type: "forex" },
  { name: "EUR/USD OTC", type: "otc" },
  { name: "GBP/USD OTC", type: "otc" },
  { name: "USD/JPY OTC", type: "otc" },
  { name: "AUD/USD OTC", type: "otc" },
  { name: "USD/CHF OTC", type: "otc" },
  { name: "USD/CAD OTC", type: "otc" },
  { name: "EUR/JPY OTC", type: "otc" },
  { name: "EUR/GBP OTC", type: "otc" },
  { name: "GBP/JPY OTC", type: "otc" },
  { name: "AUD/CAD OTC", type: "otc" },
  { name: "AUD/CHF OTC", type: "otc" },
  { name: "AUD/JPY OTC", type: "otc" },
  { name: "AUD/NZD OTC", type: "otc" },
  { name: "CAD/CHF OTC", type: "otc" },
  { name: "CAD/JPY OTC", type: "otc" },
  { name: "CHF/JPY OTC", type: "otc" },
  { name: "EUR/CHF OTC", type: "otc" },
  { name: "EUR/AUD OTC", type: "otc" },
  { name: "EUR/CAD OTC", type: "otc" },
  { name: "GBP/AUD OTC", type: "otc" },
  { name: "GBP/CAD OTC", type: "otc" },
  { name: "GBP/CHF OTC", type: "otc" },
  { name: "NZD/JPY OTC", type: "otc" },
  { name: "NZD/USD OTC", type: "otc" },
  { name: "NZD/CHF OTC", type: "otc" },
  { name: "NZD/CAD OTC", type: "otc" },
  { name: "USD/RUB OTC", type: "otc" },
  { name: "EUR/RUB OTC", type: "otc" },
  { name: "USD/SGD OTC", type: "otc" },
  { name: "USD/CNH OTC", type: "otc" },
  { name: "AED/CNY OTC", type: "otc" },
  { name: "SAR/CNY OTC", type: "otc" },
  { name: "QAR/CNY OTC", type: "otc" },
  { name: "OMR/CNY OTC", type: "otc" },
  { name: "JOD/CNY OTC", type: "otc" },
  { name: "NGN/USD OTC", type: "otc" },
  { name: "KES/USD OTC", type: "otc" },
  { name: "ZAR/USD OTC", type: "otc" },
  { name: "UAH/USD OTC", type: "otc" }
];

const activeSignals = {};
const getSignal = document.querySelector("#signalBtn");
const select = document.getElementById("pairs");
const time = document.querySelector('#expirySelect') 

function isMarketOpen(type) {
  const now = new Date();
  const utcDay = now.getUTCDay();
  const utcHour = now.getUTCHours();
  const utcMin = now.getUTCMinutes();

  if (type === "forex") {
    // Forex работает с воскресенья 22:00 UTC до пятницы 22:00 UTC
    if (utcDay === 0 && utcHour < 22) return false; // воскресенье до 22:00
    if (utcDay === 5 && (utcHour > 22 || (utcHour === 22 && utcMin > 0))) return false; // пятница после 22:00
    if (utcDay === 6) return false; // суббота
    return true;
  } else if (type === "otc") {
    return true; // OTC доступен всегда
  }
  return false;
}

function generateSignal(pairName, btn, signalDiv, time) {
  if (activeSignals[pairName]) return; // если сигнал активен, нельзя взять новый

  btn.classList.toggle('disabled');
  btn.disabled = true;
  signalDiv.textContent = "Waiting...";

  const delay = Math.floor(Math.random() * 2000) + 1000; // задержка 1–3 секунды

  setTimeout(() => {
    const signal = Math.random() > 0.5 ? "BUY" : "SELL";
    signalDiv.textContent = signal;
    signalDiv.style.background = signal == "BUY" ? "linear-gradient(90deg,rgba(0, 234, 255, 1) 0%, rgba(0, 255, 106, 1) 50%, rgba(255, 229, 0, 1) 100%)" : "linear-gradient(90deg,rgba(255, 0, 242, 1) 0%, rgba(255, 0, 0, 1) 50%, rgba(255, 149, 0, 1) 100%)" 
    signalDiv.style.backgroundClip = "text"
    activeSignals[pairName] = true;
    document.querySelector('.signal-meta').innerHTML = buildAnalysisHTML(signal, pairName);    

    // Сигнал активен 1 минута, после этого можно снова брать
    setTimeout(() => {
      activeSignals[pairName] = false;
      btn.classList.toggle('disabled');
      btn.disabled = false;
      signalDiv.textContent = "—";
      document.querySelector('.signal-meta').innerHTML = "";
      signalDiv.style.background = "#fff"
      signalDiv.style.backgroundClip = "text"
    }, time*1000);
  }, delay);
}

function renderPairs() {
  const badge = document.getElementById("availabilityBadge");

  select.innerHTML = ""; // очистим старые

  pairs.forEach(pair => {
    const option = document.createElement("option");
    option.value = pair.name;
    option.textContent = pair.name;
    option.disabled = !isMarketOpen(pair.type);
    select.appendChild(option);
  });

  badge.textContent = "Ready";
  badge.style.color = "#57C785"
}

// ТЕХ АНАЛИЗ
function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

function buildMarketOverview(signal, pairName){
  const volatility = pick(['Active','Moderate','Quiet']);
  const sentiment  = signal === 'BUY' ? pick(['Risk-On','Improving','Neutral']) : pick(['Risk-Off','Cautious','Neutral']);
  const volume     = pick(['High','Average','Low','Quiet']);
  return (
`
<div style="margin-bottom: 2px" class="ta-section">
    <strong>${pairName}</strong>
</div>
<div class="ta-section">
  <div><strong>Market Overview:</strong></div>
  <ul>
    <li>Volatility: <span>${volatility}</span></li>
    <li>Sentiment: <span>${sentiment}</span></li>
    <li>Volume: <span>${volume}</span></li>
  </ul>
</div>`);
}

function buildTvRating(signal){
  const sum = signal === 'BUY' ? pick(['BUY','STRONG BUY']) : pick(['SELL','STRONG SELL']);
  const ma  = signal === 'BUY' ? pick(['BUY','STRONG BUY']) : pick(['SELL','STRONG SELL']);
  const osc = signal === 'BUY' ? pick(['BUY','NEUTRAL']) : pick(['SELL','NEUTRAL']);
  return (
`<div class="ta-section">
  <div><strong>TradingView Rating:</strong></div>
  <ul>
    <li>Summary: <span>${sum}</span></li>
    <li>Moving Averages: <span>${ma}</span></li>
    <li>Oscillators: <span>${osc}</span></li>
  </ul>
</div>`);
}

function buildTechAnalysis(signal){
  const rsiVal = signal === 'BUY' ? (20 + Math.floor(Math.random()*15)) : (70 + Math.floor(Math.random()*10));
  const rsiText = signal === 'BUY' ? 'Oversold Rebound' : 'Persistently High';
  const macd = signal === 'BUY' ? 'Bullish Crossover' : 'Bearish Crossover';
  return (
`<div class="ta-section">
  <div><strong>Technical Analysis:</strong></div>
  <ul>
    <li>RSI (14): <span>${rsiVal} – ${rsiText}</span></li>
    <li>MACD: <span>${macd}</span></li>
  </ul>
</div>`);
}

function buildAnalysisHTML(signal, pairName){
  return buildMarketOverview(signal, pairName) + buildTvRating(signal) + buildTechAnalysis(signal);
}

renderPairs();

getSignal.addEventListener("click", () => {
  generateSignal(select.value, getSignal, document.querySelector('#signalText'), time.value)
})