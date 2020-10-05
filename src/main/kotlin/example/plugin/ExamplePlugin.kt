package example.plugin

import net.minestom.server.extensions.Extension;

class ExamplePlugin : Extension() {

    override fun initialize() {
        logger.info("[ExamplePlugin] has been enabled!")
    }

    override fun terminate() {
        logger.info("[ExamplePlugin] has been disabled!")
    }

}