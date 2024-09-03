# Capstone Backend

This is the instructions for setting up the backend project.

## Setup Project

### .env file

<b>.env</b> file required prior to running the project.

Within the <b>.env</b> file, we need to include the following fields and their corresponding values:

```
DB_NAME=some_db
DB_USER=some_user
DB_PASSWORD=some_password
```

### mySQL database and table setup

Under the `/deployment/setup.sql` file contains the setup SQL queries to run to ensure that the database is ready.

Be sure to run it before the running this project, as <b>Sequqlize</b> will need it.

### docker deployment instructions

Please find below docker build and deploy instructions:

```
Instructions to build project as docker image and run (in order):

docker buildx build --add-host host.docker.internal:host-gateway -t capstone-backend .

docker run --add-host host.docker.internal:host-gateway --rm -it -p 8000:8000 capstone-backend
```
