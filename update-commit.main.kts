@file:DependsOn("io.github.microutils:kotlin-logging-jvm:2.0.6")
@file:DependsOn("org.slf4j:slf4j-simple:1.7.30")
@file:DependsOn("dev.kord:kord-core:0.7.4")

import dev.kord.common.Color
import dev.kord.common.entity.ChannelType
import dev.kord.common.entity.Snowflake
import dev.kord.core.Kord
import dev.kord.core.behavior.edit
import dev.kord.core.entity.channel.TextChannel
import kotlinx.coroutines.runBlocking

val repoName = args[0].removePrefix("Project-Cepi/")
val commitHash = args[1].take(10)

runBlocking {
    val bot = Kord(System.getenv("DISCORD_KEY"))

    val channel = bot.getChannel(Snowflake(872557055934890095))!! as TextChannel
    channel.getMessage(Snowflake(872557344029020190)).edit {
        this.content = ""

        if (embed == null) embed {
            field {
                name = repoName
                value = "Latest commit: `$commitHash`"
            }

            color = Color(0xff0000)
        }

        else embed?.apply {
            if (fields.none { it.name == repoName }) field {
                name = repoName
                value = "Latest commit: $commitHash"
            }
            else fields.replaceAll {
                return@replaceAll if (it.name == repoName) it.also { field {
                    name = repoName
                    value = "Latest commit: $commitHash"
                } } else it
            }
        }
    }
}
