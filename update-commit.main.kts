@file:DependsOn("dev.kord:kord-core:0.7.4")

import dev.kord.common.Color
import dev.kord.common.entity.ChannelType
import dev.kord.common.entity.Snowflake
import dev.kord.core.Kord
import dev.kord.core.behavior.edit
import dev.kord.core.entity.channel.TextChannel
import kotlinx.coroutines.runBlocking

val repoName = args[0]
val commitHash = args[1].take(10)

runBlocking {
    val bot = Kord(System.getenv("DISCORD_KEY"))

    val channel = bot.getChannel(Snowflake(714982475004117065))!! as TextChannel
    channel.getMessage(Snowflake(872499032025620500)).edit {

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

    bot.login()
}