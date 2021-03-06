<h3  align="center">
Project LinkAPI
</h3>

<p  align="center">
<a  href="https://github.com/WillMuzyka">
<img  alt="Made with Love"  src="https://img.shields.io/badge/made%20with-love-%2304D361">
</a>
<a  href="LICENSE">
<img  alt="License"  src="https://img.shields.io/badge/license-MIT-%2304D361">
</a>
</p>

<p  align="center">
<a  href="#joystick-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a  href="#hourglass_flowing_sand-installation">Installation</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a  href="#book-environment-variables">Environment Variables</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a  href="#whale2-docker">Docker</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a href="#motorway-routes">Routes</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a  href="#cop-remarks">Remarks</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a  href="#memo-license">License</a>
</p>

This is an application to automatically send won deals from Pipedrive to Bling as a new order.
It also generates a daily report that can be access via API.

## :joystick: Technologies

This project used a lot of technologies and concepts. A few of them are listed below.
(Also some languages, libraries and frameworks):

* [TypeScript](https://www.typescriptlang.org/)
* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Docker](https://www.docker.com/)

## :hourglass_flowing_sand: Installation:

To install and use this application, first be sure that you have node version 12, npm and/or yarn installed (you can run everything with npm, if you prefer, but I recommend yarn). They are essential for running the application.

The whole project was made based on Node.js and docker. If you want to use this library, please clone this repository and check the following steps.

**Steps**

1. Open your computer's terminal and change for the directory that you want to keep this application. Run the code `git clone https://github.com/WillMuzyka/linkapi-pipedrive-bling.git`.

2. Run the command `yarn` or `npm install` to install all the required packages listed on the file *`package.json`*.

3. Set the environment variables that suits your setup. An example can be found at the root directory of this project and more information can be found on section "Variables".

4. The backend consumes a MongoDB Database, so you will need have them running. I used docker, but feel free to use any other service. The configurations for the databases can be found at `ormconfig.json`.

5. After installing the packages, run the command `yarn dev:server` to start the backend. This will keep running until you end the application (Ctrl + C) or close the window that is running. It will not run in the background, so you need to keep the window open. This application uses the port `:3333`, so be careful to not have another application trying to run on the same port.

6. Enjoy the application!


## :book: Environment Variables

This project has a .env file that contains all the environment variables. They are required and should not be left with empty values. The list of all variables can be found bellow.

* **PIPEDRIVE_API_TOKEN**: The Pipedrive API token. More information on how to obtain this key at [Pipedrive API documentation](https://developers.pipedrive.com/docs/api/v1).
* **BLING_API_TOKEN**: The Bling API key. More information on how to obtain this key at [Bling help page](https://ajuda.bling.com.br/hc/pt-br).
* **DB_HOST**: The hostname for mongo database. If using docker, this variable will be automatically set for the mongo container name.
* **DB_PORT**: The port for mongo database.
* **DB_NAME**: The name for mongo database.

## :whale2: Docker

This project can be setup all within a container using docker. For this, first be sure to have installed both docker and docker-compose on your machine.
To start the application, run `docker-compose up -d`. It will build (if needed) the containers and start the application in detached mode.
To stop, run `docker-compose stop`.

Just a small remark on docker configuration: on some local tests, the first run sometimes did not configure the database correctly. Even though the backend awaits the database container to be running before starting, sometimes the database did not completely initialize before the backend container tries to execute the migrations. If this happens, run the command to stop and start the containers again.

## :motorway: Routes

This project has the following routes, with the designed behavior:
* GET /database/all
	* Returns all the database entries. Each entry has a unique ID, the sum value of the day and the date;
* GET /database/:days
	* Returns all the database entries that are from a number of :days ago. For example, if the value of :days is 3, it will return the reports from 3 days ago until now. Each entry has a unique ID, the sum value of the day and the date;
* POST /database
	* Force the input of an entry on the database containing the sum of values of the current day;

Extra routes:
* GET /deals
	* Returns all the deals from Pipedrive that contains the status 'won';
* PUT /bling
	* Force the update of deals on bling, based on Pipedrive's deal;

## :cop: Remarks

Please notice that this project was made to evaluate my knowledge on the concepts of the node.js, typescript, mongodb and docker.

This is not a deploy version of the application and may not be optimized. The whole purpose of this code is for my own evaluation and I do not have any guaranty if you want to deploy or use it commercially.

Observation: One point that can be improved in this code is the fact that it does not check for extra field on Pipedrive. A variable could be added to .env file to enable or not the verification requirement of these fields.

## :memo: LICENSE

This project is under the MIT License. For more information, please refer to [LICENSE](LICENSE).
