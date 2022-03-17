#!/bin/bash 
sudo chown -R ubuntu "/home/paark-web/"

# Building react app
cd "/home/paark-web/paark_frontend/"
npm run build

# Remove react build folder content from Nginx web server to new location
sudo rm -r "/var/www/paark-web/"*

# Copy paste new react build folder to nginx web server new location
cp -r "/home/paark-web/paark_frontend/build/"* "/var/www/paark-web"

# Installing backend dependencies
cd "/home/paark-web/paark_backend/"
npm i

# Installing frontend dependencies
cd "/home/paark-web/paark_frontend/"
npm i

# Restart Express server and Nginx

# cd "/home/paark-web/paark_backend/"
pm2 restart server.js

# cd "/home/"
sudo systemctl restart nginx
 
