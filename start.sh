echo > logs.txt
pip install -r api/requirements.txt
python api/api.py &
cd app/TPOT_web_app
npm install yarn
npm install papaparse
npm install http-server
cd -
http-server ./ --cors -c-1 -s &
cd app/TPOT_web_app
yarn install
yarn start && fg
npx kill-port 3000
npx kill-port 5000
npx kill-port 8080