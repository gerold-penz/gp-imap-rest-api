#!/usr/bin/env bun
import { $ } from "bun"
import { join } from "node:path"


$.cwd(join(import.meta.dir, ".."))

await $`bun run incr_version`
