#!/usr/bin/env node

import { spawnSync } from 'child_process'
import fs from 'fs'
export const packages = JSON.parse(fs.readFileSync('src/data.json'))

export function mapPackages(task) {
    const [key] = Object.keys(task)
    const [value] = Object.values(task)
    const [cmnd] = packages[key].options.filter(e => e.name == value)
    return cmnd
}

function install() {
    return spawnSync('sh', ['./scripts/install.sh'], { stdio: 'inherit' })
}

function installPkg(task) {
    const { name, code } = mapPackages(task)
    const [command, ...args] = code.split(' ')

    return spawnSync(command, args, {
        stdio: 'inherit',
        encoding: 'utf-8'
    })
}

async function Tasks(tasks) {
    for await (const task of tasks) {
        installPkg(task);
    }
}

export { install, Tasks }
