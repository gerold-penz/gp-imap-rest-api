FROM oven/bun:alpine
LABEL maintainer="Gerold Penz - <gerold@gp-softwaretechnik.at>"

WORKDIR /home/bun/app

ADD /build ./

CMD bun --bun start
