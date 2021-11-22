import "./App.css";

import UI from "./UI.js";

import {events} from "./events.js";

function App() {
	return (
		<>
			<div className="App">
				<p className="title">TPOT TRAINER</p>
				<p className="subtitle">Select parameters for TPOT training.</p>
				
				<UI/>
			
				<button id="train_button" onClick={(event) => {events.trainTPOT()}}>Train</button>                	  
			</div>
		</>
	);
}

export default App;