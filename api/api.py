# Importing necessary tools
from flask import Flask
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
from tpot import TPOTClassifier, TPOTRegressor
import numpy as np
import pandas as pd
from urllib.parse import unquote
import dask, dask_ml



# Setting up a Flask application
app = Flask(import_name=__name__)
CORS(app)
api = Api(app=app)


# Data arguments
data_parser = reqparse.RequestParser()
data_parser.add_argument(name="data", type=str,                         
                         help="Data to be used for training")

data_parser.add_argument(name="mode", type=str,
                        help="Mode of training")

# TPOT arguments
args_parser = reqparse.RequestParser()
args_parser.add_argument(name="generations", type=str,
                         help="Number of generations for training")

args_parser.add_argument(name="population_size", type=int,
                         help="Number of individuals to be retained every generation")

args_parser.add_argument(name="offspring_size", type=str,
                         help="Number of individuals to produce every generation")

args_parser.add_argument(name="mutation_rate", type=float,
                         help="How many pipelines to randomly change")

args_parser.add_argument(name="crossover_rate", type=float,
                         help="How many pipelines to randomly breed")

args_parser.add_argument(name="scoring", type=str,
                         help="String name of a scikit-learn scoring function")

args_parser.add_argument(name="cv", type=int,
                         help="Number of cross-validation folds")

args_parser.add_argument(name="subsample", type=float,
                         help="Fraction of training samples to be used in optimization")

args_parser.add_argument(name="n_jobs", type=int,
                         help="Number of processes to use")

args_parser.add_argument(name="max_time_mins", type=str,
                         help="How many minutes TPOT has to optimize")

args_parser.add_argument(name="max_eval_time_mins", type=float,
                         help="How many minutes TPOT has to evaluate a single pipeline")

args_parser.add_argument(name="random_state", type=str,
                         help="The seed for the pseudo-random number generator used in TPOT")

args_parser.add_argument(name="config_dict", type=str,
                         help="The name of the TPOT config to be used")

args_parser.add_argument(name="template", type=str,
                         help="The pipeline template to be observed by TPOT")

args_parser.add_argument(name="warm_start", type=bool,
                         help="Whether or not to reuse populations from previous evaluations")

args_parser.add_argument(name="use_dask", type=bool,                         
                         help="Whether or not to use Dask for parallel training")

args_parser.add_argument(name="early_stop", type=str,                         
                         help="Number of generations TPOT tolerates no improvements")

args_parser.add_argument(name="verbosity", type=int,                         
                         help="How much information TPOT displays while training")

args_parser.add_argument(name="log_file", type=str,
                         default="app/TPOT_web_app/logs.txt",
                         help="Directory for logging")

# Building an endpoint for training
class SetupTrainTPOT(Resource):
    # A method corresponding to a GET request
    def post(self):
        # Parsing the arguments we defined earlier
        data_args = data_parser.parse_args()        
        config_args = args_parser.parse_args()
        
        # Defining the argument keys that may be None
        none_keys = ["generations", 
                "offspring_size", 
                "max_time_mins", 
                "random_state",
                "config_dict",
                "template",
                "n_jobs",
                "early_stop"]        
        
        # Defining numeric argument kays that may be None
        numeric_none_keys = ["generations", 
                             "offspring_size", 
                             "max_time_mins", 
                             "random_state",
                             "n_jobs",
                             "early_stop"]     
        
        # Handling possible None values
        for key in none_keys:
            # Converting non-None numeric values from string to int
            if config_args[key] != "None" and key in numeric_none_keys:
                config_args[key] = int(config_args[key])
            # Replacing string "None" to datatype None
            elif config_args[key] == "None":
                config_args[key] = None                    
                
        # Choosing training mode
        if data_args["mode"] == "Classification":
            pipeline_optimizer = TPOTClassifier(**config_args)            
        elif data_args["mode"] == "Regression":
            pipeline_optimizer = TPOTRegressor(**config_args)            
        
        # Reading and preprocessing the JSON dataset
        df = pd.io.json.read_json(unquote(data_args["data"]))        
        df = df.drop(len(df)-1)
        
        features = df.drop(["target"], axis=1).to_numpy().astype(np.float64)
        labels = df["target"].to_numpy().astype(np.int32)

        # Fitting the optimizer
        pipeline_optimizer.fit(features, labels)
        
        # Exporting the best pipeline
        pipeline_optimizer.export("app/TPOT_web_app/script.py")
        
        # Returning the prediction
        return {"Output": "Training complete!"}, 200

# Adding the endpoint to our app
api.add_resource(SetupTrainTPOT, "/setup-train-tpot")

# Launching our app
if __name__ == "__main__":
    app.run()