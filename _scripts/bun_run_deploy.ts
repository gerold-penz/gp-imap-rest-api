#!/usr/bin/env bun
import { $ } from "bun"
import { join } from "node:path"


$.cwd(join(__dirname, ".."))

let exitCode = 1
try {
    exitCode = (await $`bun run deploy:github`).exitCode
} finally {
    if (exitCode !== 0) {
        prompt("\nPress ENTER to exit.")
    }
}
