#!/usr/bin/env node

import { spawnSync } from 'child_process'
import fs from 'fs'
export const packages = JSON.parse(fs.readFileSync('src/data.json'))

export function mapPackages() {
    let result = []
    Object.entries(packages).forEach(pkg => {
        result.push({ value: pkg[0]})
    });
    return result
}

function install() {
    return spawnSync('sh', ['./scripts/install.sh'], { stdio: 'inherit' })
}

function installPkg(task) {

    const [key, ...commd] = packages[task].split(' ');

    return spawnSync(`${key}`, [...commd], {
        stdio: 'inherit',
        encoding: 'utf-8'
    })
}

async function Tasks(tasks) {
    console.log(tasks)
    for await (const task of tasks) {
        await installPkg(task);
    }
}

export { install, Tasks }
