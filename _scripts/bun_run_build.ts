#!/usr/bin/env bun
import { $ } from "bun"
import { join } from "node:path"


$.cwd(join(__dirname, ".."))

let exitCode = 1

try {
    exitCode = (await $`bun run incr_version`).exitCode
} finally {
    if (exitCode !== 0) {
        prompt("\nPress ENTER to exit.")
    }
}

try {
    exitCode = (await $`bun run build`).exitCode
} finally {
    if (exitCode !== 0) {
        prompt("\nPress ENTER to exit.")
    }
}

try {
    exitCode = (await $`cp --recursive node_modules build`).exitCode
} finally {
    if (exitCode !== 0) {
        prompt("\nPress ENTER to exit.")
    }
}
