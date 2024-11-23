#!/usr/bin/env bun
import { $ } from "bun"
import { join } from "node:path"
import { version } from "../package.json"


const [major, minor, patch] = version.split(".")

$.cwd(join(__dirname, ".."))
let exitCode = 1
try {
    exitCode = (await $` 
        docker buildx build \
        --pull \
        --platform linux/amd64,linux/arm64 \
        -t ghcr.io/gerold-penz/gp-imap-rest-api:${major}.${minor}.${patch} \
        -t ghcr.io/gerold-penz/gp-imap-rest-api:${major}.${minor} \
        -t ghcr.io/gerold-penz/gp-imap-rest-api:${major} \
        -t ghcr.io/gerold-penz/gp-imap-rest-api:latest \
        --push \
        .
    `).exitCode
} finally {
    if (exitCode !== 0) {
        prompt("\nPress ENTER to exit.")
    }
}
