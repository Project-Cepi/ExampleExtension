plugins {
    // Apply the Kotlin JVM plugin to add support for Kotlin.
    id("org.jetbrains.kotlin.jvm") version "1.4.10"

    // Apply the application plugin to add support for building a jar
    java
}

repositories {
    // Use jcenter for resolving dependencies.
    jcenter()

    // Use mavenCentral
    maven(url = "https://repo1.maven.org/maven2/")
    maven(url = "http://repo.spongepowered.org/maven")
    maven(url = "https://libraries.minecraft.net")
    maven(url = "https://jitpack.io")
    maven(url = "https://jcenter.bintray.com/")
}

dependencies {
    // Align versions of all Kotlin components
    implementation(platform("org.jetbrains.kotlin:kotlin-bom"))

    // Use the Kotlin JDK 8 standard library.
    implementation(kotlin("stdlib"))

    // Use the Kotlin reflect library.
    implementation(kotlin("reflect"))

    // Use the JUpiter test library.
    testImplementation("org.junit.jupiter:junit-jupiter:5.6.0")

    // Compile Minestom into project
    implementation("com.github.Minestom:Minestom:master-SNAPSHOT")

    // Use the Netty library
    implementation("io.netty:netty-transport-native-epoll:4.1.52.Final")

    // KHTTP
    implementation("khttp:khttp:1.0.0")

    // Implement Klaxon
    implementation("com.beust:klaxon:5.0.1")
}

tasks.withType<Test> {
    useJUnitPlatform()
}

java {
    sourceCompatibility = JavaVersion.VERSION_11
    targetCompatibility = JavaVersion.VERSION_11
}