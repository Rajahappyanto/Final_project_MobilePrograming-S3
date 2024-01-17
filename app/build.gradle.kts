plugins {
    id("com.android.application")
    id("com.google.gms.google-services")

}

android {
    namespace = "com.example.RajaUAS"
    compileSdk = 34
    defaultConfig {
        applicationId = "com.example.RajaUAS"
        minSdk = 24
        targetSdk = 33
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
    dependenciesInfo {
        includeInApk = true
        includeInBundle = true
    }

}

dependencies {

    implementation("androidx.appcompat:appcompat:1.6.1")
    implementation("com.google.android.material:material:1.11.0")
    implementation("androidx.constraintlayout:constraintlayout:2.1.4")
    testImplementation("junit:junit:4.13.2")
    androidTestImplementation("androidx.test.ext:junit:1.1.5")
    androidTestImplementation("androidx.test.espresso:espresso-core:3.5.1")
    implementation("com.google.android.gms:play-services-ads:22.6.0")
    implementation("com.google.android.ads.consent:consent-library:1.0.8")
    implementation("com.google.firebase:firebase-auth:22.3.0")
    implementation("com.squareup.picasso:picasso:2.71828")
    implementation("com.pierfrancescosoffritti.androidyoutubeplayer:core:12.1.0")
    implementation("com.pierfrancescosoffritti.androidyoutubeplayer:chromecast-sender:0.28")

    implementation("pl.droidsonroids.gif:android-gif-drawable:1.2.28")


    //Rounded Image View Implementation
    implementation("com.makeramen:roundedimageview:2.3.0")

    //Glide Implementation
    implementation("com.github.bumptech.glide:glide:4.16.0")

    //Volley Implementation
    implementation("com.android.volley:volley:1.2.1")

    //Shimmer Implementation
    implementation("com.facebook.shimmer:shimmer:0.5.0")


}