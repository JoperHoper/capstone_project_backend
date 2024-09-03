FROM node:alpine
COPY . /capstone_backend
WORKDIR /capstone_backend
RUN npm install
EXPOSE 8000
CMD node index.js

# Instructions to build project as docker image and run:
# docker buildx build --add-host host.docker.internal:host-gateway -t capstone-backend .
# docker run --add-host host.docker.internal:host-gateway --rm -it -p 8000:8000 capstone-backend