#!/usr/bin/env node

import * as p from '@clack/prompts'
import color from 'picocolors';

import { install, Tasks, packages as pkgs } from './shared/index.js'

async function main() {
    console.clear();

    p.intro(`${color.bgCyan(color.black('Install environment'))}`)

    const first = await p.confirm({
        message: 'Is this your first install?'
    })

    if (first) return install()

    function isArray(arr) {
        if (Array.isArray(arr)) {
            for (const item of arr) {
                for (const [key, value] of Object.entries(item)) {
                    console.log(`${key}: ${value}`);
                }
            }

        }

    }

    function getPksg() {

        const keys = {};
        for (const key in pkgs) {
            keys[key] = pkgs[key].map(innerObj => Object.keys(innerObj)[0]);
            return p.select({
                message: `Select ${key}`,
                value: keys[key]
            })
        }


    }

    const project = await p.group({
        value: () => getPksg(),

        install: () =>
            p.confirm({
                message: "Do you want to install packages",
                initialValue: false
            })
    }, {
        onCancel: () => {
            p.cancel('Operaton cancelled');
            process.exit(0)
        }
    })

    if (project.install) {
        const s = p.spinner()
        // await Tasks(project.package.concat(project.ide, project.terminal))
        s.stop('Packages installed')
    }
    p.outro(`Any issues?, ${color.white(color.green('https://github.com/AlexGonRod'))}`)
}

main().catch((error) => console.error(`Error: ${error}`))
