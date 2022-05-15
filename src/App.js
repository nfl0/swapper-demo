import { useState, useEffect } from "react";
import './App.css';
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";


function App() {

  /* --- STATS --- */

  // fetch bitcoin price in USD from the coingecko api  every 10 seconds and print it to the console
  function fetchBitcoinPrice(){
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
    .then(response => response.json())
    .then(data => {
      setBitcoinPrice(data.bitcoin.usd);
    })
  }

  const [bitcoinPrice, setBitcoinPrice] = useState(0);
  

  /* --- SWAP --- */

  // increase the value of the counter
  // every time it is clicked
  function increaseCounter() {
    setCounter(counter + 1);
  }
  // decrease the value of the counter
  // every time it is clicked
  function decreaseCounter() {
    setCounter(counter - 1);
  }
  // the value of the counter
  const [counter, setCounter] = useState(0);

  
  /* --- TERMINAL --- */
  

  useEffect(() => {
    let term;
    const fitAddon = new FitAddon();
    term = new Terminal({
      convertEol: true,
      fontFamily: `'Fira Mono', monospace`,
      fontSize: 15,
      fontWeight: 900
    });

    term.loadAddon(fitAddon);

    term.open(document.getElementById("xterm"));
    
    term.write("\r\n" );

    fitAddon.fit();
  }, []);

  

  return (
      <div className="container">
        
        {/* Stats Div */}
        <div className="flex-item-left" id="leftScreen">
          <h1>Crypto Prices:</h1>
          <p>Bitcoin Price: ${bitcoinPrice}</p>
          <button onClick={fetchBitcoinPrice}>Fetch</button>

        </div>

        {/* Swap Div */}
        <div className="flex-item-center" id="centerScreen">
          <div className="App">
            <header className="App-header">

            <h1>Counter: {counter}</h1>
            <button onClick={increaseCounter}>Increase</button>
            <button onClick={decreaseCounter}>Decrease</button>

            </header>
          </div>
        </div>

        {/* Terminal Div */}
        <div className="flex-item-right" id="rightScreen">
          <div id="xterm" style={{ height: "100%", width: "100%" }} />
        </div>

      </div>
  );
}

export default App;