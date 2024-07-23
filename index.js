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


    function getPksg(key) {

        return pkgs[key].map(innerObj => Object.keys(innerObj)[0]);
        // for (const key in pkgs) {
        // keys[key] = pkgs[key].map(innerObj => Object.keys(innerObj)[0]);
        // return p.select({
        //     message: `Select ${key}`,
        //     value: keys[key]
        // })
        // }


    }

    const project = await p.group({
        ide: () =>
            p.select({
                message: 'What IDE do you want to use?',
                options: [
                    { value: 'VScode', label: 'VScode' },
                    { value: 'Iterm2', label: 'Iterm' },
                ]
            }),
        terminal: () =>
            p.select({
                message: 'What terminal do you want to use?',
                options: [
                    { value: 'Warp', label: 'warp' },
                    { value: 'ZSH', label: 'zsh' },
                ]
            }),
        // tools: () =>
        //     p.multiselect({
        //         message: 'Do you want some more tools?',
        //         options:[
        //             { value: 'Brave', label: 'brave'},
        //             { value: 'GIT', label: 'git'},
        //         ]
        //     }),
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
        const packages = []
        packages.push({ "IDE": project.ide }, { "Terminal": project.terminal })
        await Tasks(packages)
        s.stop('Packages installed')
    }
    p.outro(`Any issues?, ${color.white(color.green('https://github.com/AlexGonRod'))}`)
}

main().catch((error) => console.error(`Error: ${error}`))
