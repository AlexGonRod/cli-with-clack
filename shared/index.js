#!/usr/bin/env node

import { spawnSync } from 'child_process'
const packages = JSON.parse(fs.readFileSync('src/data.json'))
import fs from 'fs'

function install() {
    return spawnSync('sh', ['./scripts/install.sh'], { stdio: 'inherit' })
}

function installPkg(pkg) {

    const [arg, ...args] = packages[pkg].split(' ');

    return spawnSync(`${arg}`, [...args], {
        stdio: 'inherit',
        encoding: 'utf-8'
    })
}

async function Tasks(tasks) {

    for (const task of tasks) {
        await installPkg(task);
    }
}

export { install, Tasks }
