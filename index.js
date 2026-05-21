#!/usr/bin/env node

import * as p from '@clack/prompts'
import color from 'picocolors';
import { readFileSync } from 'fs'

import { install, Tasks } from './shared/index.js'

const categories = JSON.parse(readFileSync('src/data.json', 'utf-8'))

async function main() {
    console.clear();

    p.intro(`${color.bgCyan(color.black('Install environment'))}`)

    const first = await p.confirm({
        message: 'Is this your first install?'
    })

    if (first) return install()

    const group = {}

    for (const [key, cat] of Object.entries(categories)) {
        const options = cat.options.map(o => ({ value: o.name, label: o.name }))

        if (cat.type === 'single') {
            group[key] = () => p.select({ message: cat.message, options })
        } else {
            group[key] = () => p.multiselect({ message: cat.message, options })
        }
    }

    group.install = () => p.confirm({
        message: "Do you want to install packages",
        initialValue: false
    })

    const project = await p.group(group, {
        onCancel: () => {
            p.cancel('Operation cancelled');
            process.exit(0)
        }
    })

    if (project.install) {
        const s = p.spinner()
        const packages = []

        for (const [key, cat] of Object.entries(categories)) {
            const value = project[key]
            if (!value) continue

            if (cat.type === 'single') {
                packages.push({ [key]: value })
            } else if (Array.isArray(value)) {
                value.forEach(v => packages.push({ [key]: v }))
            }
        }

        await Tasks(packages)
        s.stop('Packages installed')
    }
    p.outro(`Any issues?, ${color.white(color.green('https://github.com/AlexGonRod'))}`)
}

main().catch((error) => console.error(`Error: ${error}`))
