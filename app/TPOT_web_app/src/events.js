import {
  config
} from "./config.js";
import papa from "papaparse";
var downloadArea;
var responseArea;
var logArea;

export const events = {	
	trainTPOT: function(){
		try{
			var file = document.getElementById("data").files[0];	  
		} catch (error){
			console.error(error);
		}
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
				
		downloadArea.hidden = true;		
		responseArea.hidden = false;
		logArea.hidden = true;
		
		responseArea.innerText = "Training...";	
		
		var interval = setInterval(events.readLog, 50, true);	 
		
		try{papa.parse(file, {download:true,
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

				if (verbosity != 0){
					logArea.hidden = false;
				}

				fetch("http://" + config.api_url + ":" + config.api_port + "/" + config.api_endpoint,
					{method: "POST",
					headers:{
						"Content-Type": "application/json"
					},				
					body: payload})
					.then(response => response.json())
					.then(data => responseArea.innerText = data.Output)
					.then(() => downloadArea.hidden = false)
					.then(() => clearInterval(interval))					
					.catch((error) => {
						console.error("Error", error);
					});
			}
		});
		} catch {			
			responseArea.innerText = "Dataset not selected. Please select a dataset for tuning.";	
		}		
	},
	readLog: async function(training = false, noScript = false) {									
		await fetch("http://localhost:8080/logs.txt")
			.then(response => response.text())
			.then(response => logArea.innerText = response);		
		
		if (training == false) {
			var response = await fetch("http://localhost:8080/script.py");	
			
			if (response.status == 404){
				noScript = true;
			}
			
			if (noScript == false){				
				downloadArea.hidden = false;
				responseArea.innerText = "Previously completed training, script available";
				
				if (logArea.innerText != ""){
					logArea.hidden = false;
				}				
			}
		}	
		
		logArea.scrollTop = logArea.scrollHeight;		
	},
	checkLog: async function(){
		const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
		await delay(1000);
		logArea = document.getElementById("log_area");
		downloadArea = document.getElementById("download");
		responseArea = document.getElementById("response");		
		setTimeout(events.readLog, 1000);
	}
}