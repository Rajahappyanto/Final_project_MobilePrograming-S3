buildscript {
    repositories {
        google()
        mavenCentral()
        maven {
            url = uri("https://jitpack.io")
        }
    }
    dependencies {
        classpath("com.google.gms:google-services:4.4.0")
        classpath("com.android.tools.build:gradle:8.1.4")

    }
}

allprojects {
    repositories {
        google()
        mavenCentral()
    }

    gradle.projectsEvaluated {
        tasks.withType<JavaCompile> {
            options.compilerArgs.add("-Xlint:deprecation")
            options.compilerArgs.add("-Xlint:unchecked")
        }
    }
}

tasks.register("clean", Delete::class) {
    delete(rootProject.buildDir)
}