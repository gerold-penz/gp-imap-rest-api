FROM oven/bun:alpine
LABEL maintainer="Gerold Penz - <gerold@gp-softwaretechnik.at>"

WORKDIR /home/bun/app

ADD /node_modules ./node_modules
ADD /build ./
ADD /package.json ./

CMD bun --bun start
