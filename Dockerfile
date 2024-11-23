FROM oven/bun:alpine
LABEL maintainer="Gerold Penz - <gerold@gp-softwaretechnik.at>"

WORKDIR /home/bun/app

# Add files to container
ADD /build ./
ADD /package.json ./
ADD /bunfig.toml ./

# Install dependencies (including devDependencies)
RUN ["bun", "install"]

# Define start command
CMD ["bun", "--bun", "start"]
