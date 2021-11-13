import {
  config
} from "./config.js";
import papa from "papaparse";

export const events = {	
	trainTPOT: function(){
		var file = document.getElementById("data").files[0];	  
		var mode = document.querySelector('input[name="mode"]:checked').value;  	  
		var generations = document.getElementById("generations").value;  
		var populationSize = document.getElementById("population_size").value;
		var offspringSize = document.getElementById("offspring_size").value;
		var mutationRate = document.getElementById("mutation_rate").value;
		var crossoverRate = document.getElementById("crossover_rate").value;
		var scoring = document.getElementById("scoring").value;
		var cv = document.getElementById("cv").value;
		var subsample = document.getElementById("subsample").value;
		var nJobs = document.getElementById("n_jobs").value;
		var maxTimeMins = document.getElementById("max_time_mins").value;
		var maxEvalTimeMins = document.getElementById("max_eval_time_mins").value;
		var randomState = document.getElementById("random_state").value;	  
		var configDict = document.getElementById("config_dict").value;
		var template = document.getElementById("template").value;
		var earlyStop = document.getElementById("early_stop").value;
		var verbosity = document.getElementById("verbosity").value;
		var useDask = document.getElementById("use_dask").checked;
		var warmStart = document.getElementById("warm_start").checked;	   
		
		var responseArea = document.getElementById("response");
		var downloadArea = document.getElementById("download");
		downloadArea.hidden = true;		
		responseArea.hidden = false;
		responseArea.innerText = "Training...";	
		
		papa.parse(file, {download:true,
			header: true,	  
			complete: function(results) {			
				var payload = JSON.stringify({"data": JSON.stringify(results.data),
					"mode": mode,
					"generations": generations,
					"population_size": populationSize,
					"offspring_size": offspringSize,
					"mutation_rate": mutationRate,
					"crossover_rate": crossoverRate,
					"scoring": scoring,
					"cv": cv,
					"subsample": subsample,
					"n_jobs": nJobs,
					"max_time_mins": maxTimeMins,
					"max_eval_time_mins": maxEvalTimeMins,
					"random_state": randomState,
					"config_dict": configDict,
					"template": template,
					"early_stop": earlyStop,
					"verbosity": verbosity,
					"use_dask": useDask,
					"warm_start": warmStart		
					}	
				);	

				fetch("http://" + config.api_url + ":" + config.api_port + "/" + config.api_endpoint,
					{method: "POST",
					headers:{
						"Content-Type": "application/json"
					},				
					body: payload})
					.then(response => response.json())
					.then(data => responseArea.innerText = data.Output)
					.then(() => downloadArea.hidden = false)
					.catch((error) => {
						console.error("Error", error);
					});
			}
		});		
	},
	readLog: function() {
		var logArea = document.getElementById("log_area");

		if (logArea.innerText != ""){
			logArea.hidden = false;
		}	
		
		fetch("http://localhost:8080/logs.txt")
			.then(response => response.text())
			.then(response => logArea.innerText = response);
	},
	watchFile: function(){					  	 
		var interval = setInterval(events.readLog, 1000);	 	 		
	}
}