#!/usr/bin/env node

import * as p from '@clack/prompts'
import color from 'picocolors';
import {install, Tasks} from './shared/index.js'

async function main() {
    console.clear();

    p.intro(`${color.bgCyan(color.black('Install environment'))}`)

    const first = await p.confirm({
        message: 'Is this your first install?'
    })

    if(first) return install()

    const project = await p.group({
        package: () =>
            p.multiselect({
                message: 'Select additional tools.',
                options: [
                    { value: 'warp', label: 'Warp term', hint: 'recommended' },
                    { value: 'brave', label: 'Brave browser', hint: 'recommended' },
                    { value: 'iterm2', label: 'Iterm2' },
                    { value: 'zsh', label: 'ZSH' },
                    { value: 'Homebrew', label: 'Homebrew' },
                    { value: 'node', label: 'Node' },
                ],
            }),

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
        await Tasks(project.package)
    }
    p.note('Every package installed', )

    p.outro(`Any issues?,  ${color.underline(color.cyan('https://github.com/AlexGonRod'))}`);
}

main().catch((error) => console.log(`Error: ${error}`))

module.exports = main
