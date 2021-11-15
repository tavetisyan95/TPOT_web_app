import "./App.css";

function UI(props) {
	return(
		<div className="UI_wrapper">
			<fieldset className="fieldset">
				<legend className="legend">Training data</legend>
				<div className="input"><input type="file" id="data"></input></div>
				<div className="description">
					<p className="type">CSV file</p>
					<p>The data that will be used for training</p>
				</div>
			</fieldset>
		  
			<fieldset className="fieldset">
				<legend className="legend">Training mode</legend>
				<div className="input">
					<input type="radio" name="mode" value="Classification" defaultChecked></input>Classification
					<input type="radio" name="mode" value="Regression"></input>Regression		
				</div>
				<div className="description">The mode of training for the optimizer.</div>
			</fieldset>
		  
			<fieldset className="fieldset">
				<legend className="legend">generations</legend>
				<div className="input"><input id="generations" type="text" defaultValue="5"></input></div>
				<div className="description">
					<p className="type">Integer or None, default: 5</p>
					<p>The number of generations the optimizer will evaluate candidate models for.</p>
				</div>
			</fieldset>
		  
			<fieldset className="fieldset">
				<legend className="legend">population_size</legend>	  
				<div className="input"><input id="population_size" type="text" defaultValue="50"></input></div>
				<div className="description">
					<p className="type">Integer, default: 50</p>
					<p>The number of individuals to retain every generation.</p>
				</div>
			</fieldset>
		  
			<fieldset className="fieldset">
				<legend className="legend">offspring_size</legend>	  
				<div className="input"><input id="offspring_size" type="text" defaultValue="50"></input></div>  	  
				<div className="description">
					<p className="type">Integer or None, default: 50</p>
					<p>The number of offspring to produce each generation.</p>
				</div>
			</fieldset>
		  
			<fieldset className="fieldset">
				<legend className="legend">mutation_rate</legend>	  
				<div className="input"><input type="range" list="tickmarks" id="mutation_rate" min="0" max="1.0" step="0.1" defaultValue="0.9" oninput="this.nextElementSibling.value = this.value"></input></div>
				<div className="description">
					<p className="type">Float in the range [0.0, 1.0], default: 0.9</p>
					<p>The percentage of pipelines to randomly change every generation.</p>
				</div>
			</fieldset>
		  
			<fieldset className="fieldset">
				<legend className="legend">crossover_rate</legend>	  
				<div className="input"><input id="crossover_rate" type="range" list="tickmarks" min="0" max="1.0" step="0.1" defaultValue="0.1"></input></div>
				<div className="description">
					<p className="type">Float in the range [0.0, 1.0], default: 0.1</p>
					<p className="type">Sum of mutation_rate and crossover_rate cannot exceed 1.0</p>
					<p>The percentage of pipelines to randomly breed every generation.</p>
				</div>
			</fieldset>
		  
			<datalist className="tickmarks" id="tickmarks">
				<option value="0.0"></option>
				<option value="0.1"></option>
				<option value="0.2"></option>
				<option value="0.3"></option>
				<option value="0.4"></option>
				<option value="0.5"></option>
				<option value="0.6"></option>
				<option value="0.7"></option>
				<option value="0.8"></option>
				<option value="0.9"></option>
				<option value="1.0"></option>
			</datalist>
		  
			<fieldset className="fieldset">
				<legend className="legend">scoring</legend>	  
				<div className="input"><input id="scoring" type="text" defaultValue="accuracy"></input></div>
				<div className="description">
					<p className="type">String, default: accuracy</p>
					<p>The scoring function to use for evaluation.</p>
				</div>
			</fieldset>	
		
			<fieldset className="fieldset">
				<legend className="legend">cv</legend>  	  
				<div className="input"><input id="cv" type="text" defaultValue="5"></input></div>
				<div className="description">
					<p className="type">Integer, default: 5</p>
					<p>The number of cross-validation folds.</p>
				</div>
			</fieldset>	

			<fieldset className="fieldset">
				<legend className="legend">subsample</legend>  	      
				<div className="input"><input id="subsample" type="text" defaultValue="1.0"></input></div>  	  
				<div className="description">
					<p className="type">Float in the range (0.0, 1.0], default: 1.0</p>
					<p>The fraction of training samples to be used for optimization.</p>
				</div>
			</fieldset>

			<fieldset className="fieldset">
				<legend className="legend">n_jobs</legend>		  
				<div className="input"><input id="n_jobs" type="text" defaultValue="1"></input></div>
				<div className="description">
					<p className="type">Integer, default: 1</p>
					<p>The number of processes to use.</p><
				/div>
			</fieldset>
		  
			<fieldset className="fieldset">
				<legend className="legend">max_time_mins</legend>		  	  
				<div className="input"><input id="max_time_mins" type="text" defaultValue="None"></input></div>
				<div className="description">
					<p className="type">Integer or None, default: None</p>
					<p>The maximum duration of training.</p>
				</div>
			</fieldset>
			  
			<fieldset className="fieldset">
				<legend className="legend">max_eval_time_mins</legend>		  	  
				<div className="input"><input id="max_eval_time_mins" type="text" defaultValue="5"></input></div>
				<div className="description">
					<p className="type">Float, default: 5</p>
					<p>The maximum duration of evaluation.</p>
				</div>
			</fieldset>
		  
			<fieldset className="fieldset">
				<legend className="legend">random_state</legend>	  	  
				<div className="input"><input id="random_state" type="text" defaultValue="None"></input></div>
				<div className="description">
					<p className="type">Integer or None, default: None</p>
					<p>Seed for the pseudo-random number generator.</p>
				</div>
			</fieldset>
		  
			<fieldset className="fieldset">
				<legend className="legend">config_dict</legend>		  
				<div className="input"><input id="config_dict" type="text" defaultValue="TPOT light"></input></div>	  
				<div className="description">
					<p className="type">String or None, default: TPOT light</p>
					<p>The name of the TPOT config to use.</p>
				</div>
			</fieldset>
		  
			<fieldset className="fieldset">
				<legend className="legend">template</legend>
				<div className="input"><input id="template" type="text" defaultValue="None"></input></div>
				<div className="description">
					<p className="type">String or None, default: None</p>
					<p>The template to use when building pipelines.</p>
				</div>
			</fieldset>
		  
			<fieldset className="fieldset">
				<legend className="legend">warm_start</legend>
				<div className="input"><input type="checkbox" id="warm_start"></input></div>
				<div className="description">
					<p className="type">Bool, default: False</p>
					<p>Whether or not to reuse populations from previous runs.</p>
				</div>
			</fieldset>
			  
			<fieldset className="fieldset">
				<legend className="legend">use_dask</legend>	  
				<div className="input"><input type="checkbox" id="use_dask" value="True"></input></div>	 
				<div className="description">
					<p className="type">Bool, default: False</p>
					<p>Whether or not to use Dask for parallel computing.</p>
				</div>
			</fieldset>
		  
			<fieldset className="fieldset">
				<legend className="legend">early_stop</legend>		  
				<div className="input"><input type="text" id="early_stop" defaultValue="None"></input></div>	  
				<div className="description">
					<p className="type">Integer or None, default: None</p>
					<p>The number of generations with no change the optimizer tolerates.</p>
				</div>
			</fieldset>	  
		  
			<fieldset className="fieldset">
				<legend className="legend">verbosity</legend>	  
				<div className="input"><input type="text" id="verbosity" defaultValue="2"></input></div>	  
				<div className="description">
					<p className="type">Integer (0, 1, 2, or 3), default: 0</p>
					<p>The verbosity level of the optimizer.</p>
				</div>
			</fieldset>

			<div hidden className="log" id="log_area"></div> 			
			
			<fieldset className="fieldset">
				<legend align="center" className="legend">RESPONSE</legend>
				<div className="text" id="response">Waiting for training to start...</div>
				<div hidden className="text" id="download"><a href="http://localhost:8080/script.py" download="script.py" >Download script</a></div>
			</fieldset>
		</div>	  
	)
}
// {parse_data(props.data)}
export default UI;