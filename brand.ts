import { dirname } from "https://deno.land/std@0.126.0/path/mod.ts";
import { ensureFile } from "https://deno.land/std@0.126.0/fs/mod.ts";
import { prompt, Input, Number, Confirm, Checkbox } from "https://deno.land/x/cliffy/prompt/mod.ts";

const generatePackageName = (projectName: string) => (projectName.match(/^(?:(?!Extension).)*/i) as string[])[0].toLowerCase()

let fullDirectoryName = dirname(new URL('', import.meta.url).pathname)
let directoryName = (fullDirectoryName.match(/\w+(?!\/)$/) as string[])[0]
let assumedPackageName = generatePackageName(directoryName)

const result = await prompt([{
    name: "projectName",
    message: `Enter the project name (${directoryName}).`,
    type: Input,
    after: async ({ projectName }, next) => { // executed after like prompt
        if (projectName) {
            directoryName = projectName
            assumedPackageName = generatePackageName(directoryName)
        }

        await next()
    },
}, {
    name: "preferredMainClass",
    message: `Enter the preferred class name (${directoryName}).`,
    type: Input
}, {
    name: "packageName",
    message: `Enter the preferred package name (${assumedPackageName}).`,
    type: Input
}, {
    name: "description",
    message: "Enter project description.",
    type: Input,
    minLength: 1
}]);

const { projectName, preferredMainClass, packageName, description } = Object.assign({
    projectName: directoryName,
    preferredMainClass: directoryName,
    packageName: assumedPackageName
}, result)

const paths = {
    properties: "./gradle.properties",
    readme: "./README.md",
    settings: "./settings.gradle.kts",
    code: `./src/main/kotlin/world/cepi/${packageName}/${preferredMainClass}.kt`,
    resource: `./src/main/resources/META-INF/extension.json`
}

await Deno.writeTextFile(paths.properties, `# suppress inspection "UnusedProperty" for whole file - used in extension.json
kotlin.code.style=official
name=${projectName}
mainClass=${preferredMainClass}
group=world.cepi.${packageName}
version=1.0.0`)

await Deno.writeTextFile(paths.readme, `# ${projectName}
[![license](https://img.shields.io/github/license/Project-Cepi/${projectName}?style=for-the-badge&color=b2204c)](../LICENSE)
[![wiki](https://img.shields.io/badge/documentation-wiki-74aad6?style=for-the-badge)](https://project-cepi.github.io/)
[![discord-banner](https://img.shields.io/discord/706185253441634317?label=discord&style=for-the-badge&color=7289da)](https://discord.cepi.world/8K8WMGV)

${description}

## Installation

Download the jar from [Releases](https://github.com/Project-Cepi/${projectName}/releases)
OR compile it yourself. Instructions to do so are in Compile header

Drop it into the \`/extensions\` folder.

## Compile

Create a folder, then
Clone the repository using:

\`git clone https://github.com/Project-Cepi/${projectName}.git\`

Once it is cloned, make sure you have gradle installed, and run

\`./gradlew build\` on Mac or Linux, and

\`gradlew build\` on Windows.

This will output the jar to \`build/libs\` in the project directory.

**Make sure to select the -all jar**. If no shading is necessary, remove the \`shadowJar\`
`)

await Deno.writeTextFile(paths.settings, `rootProject.name = "${projectName}"
`)

await Deno.remove("./src/main", { recursive: true })

await ensureFile(paths.code)

await Deno.writeTextFile(paths.code, `package world.cepi.${packageName}

import net.minestom.server.extensions.Extension;

class ${projectName} : Extension() {

    override fun initialize(): LoadStatus {
        logger().info("[${projectName}] has been enabled!")

        return LoadStatus.SUCCESS
    }

    override fun terminate() {
        logger().info("[${projectName}] has been disabled!")
    }

}
`)

await ensureFile(paths.resource)

await Deno.writeTextFile(paths.resource, `{
    "entrypoint": "\${project.group}.\${project.mainClass}",
    "name": "\${project.name}",
    "version": "\${project.version}"
}
`)