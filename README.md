# Symfony-ciqual-server

## Introduction
This project is a solution of the following problem: https://github.com/FoodMeUp/Symfony-Exam.


## Installation
- Clone this repository
- Run "composer install"
- npm install
- Generate Database (php bin/console doctrine:schema:update --force)
- Populate Database (php bin/console import:ciqual:csv)
- Install ElasticSearch somewhere and launch it (Use default port)
- Populate ElasticSearch index (php bin/console fos:elastica:populate)
- Launch server on port 8080 (php bin/console server:run 0.0.0.0:8080)
- grunt run:react
- Hope that I haven't forgotten any step :)

## Further improvements
- Fix grunt minification of javascript
- Improve design & features (use react-vis for nice charts)
- Sort search results
- Do a real app React and not the horror here.