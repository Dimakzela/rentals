#Defining the base image
FROM node:24-alpine3.20

WORKDIR /frontend

#copying the app to a docker image under theRentals folder
COPY . .

#Install the node package manager dependencies

RUN npm install

#Chosing the port
EXPOSE 4200

#Starting the process
CMD ["npx", "ng", "serve", "--host", "0.0.0.0"]
