FROM oven/bun:alpine
LABEL maintainer="Gerold Penz - <gerold@gp-softwaretechnik.at>"

WORKDIR /home/bun/app

ADD /build ./

#RUN bun add --global --exact imapflow@1.0.164
#RUN bun add imapflow@1.0.164

CMD bun --bun start
