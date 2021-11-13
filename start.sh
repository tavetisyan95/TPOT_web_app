pip install -r api/requirements.txt
python api/api.py &
cd app/TPOT_web_app
npm install yarn
npm install papaparse
npm install http-server
cd -
/git-bash.exe ./server.sh &
cd app/TPOT_web_app
yarn install
yarn start
npx kill-port 3000
npx kill-port 5000
npx kill-port 8080