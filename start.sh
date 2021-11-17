pip install -r api/requirements.txt
python api/api.py &
cd app/TPOT_web_app
npm install --global yarn
npm install papaparse
npm install --global http-server
http-server ./ --cors -c-1 -s &
yarn install
yarn start && fg
echo > logs.txt
if [ -f $"script.py" ]; then rm script.py; fi
npx kill-port 3000
npx kill-port 5000
npx kill-port 8080