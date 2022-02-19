import { dirname } from "https://deno.land/std@0.126.0/path/mod.ts";

const directoryName = dirname(new URL('', import.meta.url).pathname).match(/\w+(?!\/)$/)

const projectName = prompt(`Enter project name (${directoryName}):`) || directoryName
const preferredMainClass = prompt(`Enter preferred class name (${projectName}):`) || projectName
const packageName = prompt(`Enter package name (ex example):`)
const description = prompt(`Enter description:`)

Deno.writeTextFile("./gradle.properties", `# suppress inspection "UnusedProperty" for whole file - used in extension.json
kotlin.code.style=official
name=${projectName}
mainClass=${preferredMainClass}
group=world.cepi.${packageName}
version=1.0.0`)

Deno.writeTextFile("./README.md", `# ${projectName}
[![license](https://img.shields.io/github/license/Project-Cepi/${projectName}?style=for-the-badge&color=b2204c)](../LICENSE)
[![wiki](https://img.shields.io/badge/documentation-wiki-74aad6?style=for-the-badge)](https://project-cepi.github.io/)
[![discord-banner](https://img.shields.io/discord/706185253441634317?label=discord&style=for-the-badge&color=7289da)](https://discord.cepi.world/8K8WMGV)

${description}

## Installation

Download the jar from [Releases](https://github.com/Project-Cepi/${projectName}/releases)
OR compile it yourself. Instructions to do so are in Compile header

Drop it into the `/extensions` folder.

## Compile

Create a folder, then
Clone the repository using:

\`git clone https://github.com/Project-Cepi/${projectName}.git\`

Once it is cloned, make sure you have gradle installed, and run

\`./gradlew build\` on Mac or Linux, and

\`gradlew build\` on Windows.

This will output the jar to \`build/libs\` in the project directory.

**Make sure to select the -all jar**. If no shading is necessary, remove the `shadowJar`
`)

Deno.writeTextFile("./settings.gradle.kts", `rootProject.name = "${projectName}"
`)

Deno.remove("./src/main", { recursive: true })

Deno.writeTextFile(`./src/main/kotlin/world/cepi/${packageName}/${preferredMainClass}.kt`, `package world.cepi.${packageName}

import net.minestom.server.extensions.Extension;

class ExampleExtension : Extension() {

    override fun initialize(): LoadStatus {
        logger().info("[${projectName}] has been enabled!")

        return LoadStatus.SUCCESS
    }

    override fun terminate() {
        logger().info("[${projectName}] has been disabled!")
    }

}
`)