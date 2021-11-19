pip install -r api/requirements.txt
python api/api.py &
cd app/TPOT_web_app
npx http-server ./ --cors -c-1 -s &
npm install papaparse
npx yarn install
npx yarn start
echo > logs.txt
if [ -f $"script.py" ]; then rm script.py; fi
npx kill-port 3000
npx kill-port 5000
npx kill-port 8080