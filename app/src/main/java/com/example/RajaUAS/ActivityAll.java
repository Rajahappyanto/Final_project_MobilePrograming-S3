package com.example.RajaUAS;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.provider.AlarmClock;
import android.view.Window;
import android.view.WindowManager;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;

import java.util.Calendar;

public class ActivityAll extends AppCompatActivity {

    ImageView greetImg;
    TextView greetText;

    private CardView buttonMaps;
    private CardView buttonCalender;
    private CardView buttonAlarm;
    private CardView buttonTelpon;
    private CardView buttonMovie;
    private CardView buttonScroll;
    private CardView buttonFibo;

    private CardView buttonTwo;




    @Override
    protected void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        this.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        getSupportActionBar().hide();
        setContentView(R.layout.all_activity);


        greetImg = findViewById(R.id.greeting_img);
        buttonMaps = findViewById(R.id.Lokasi);
        buttonCalender = findViewById(R.id.Kalender);
        buttonAlarm = findViewById(R.id.SetAlarm);
        buttonTelpon = findViewById(R.id.SetTelpon);
        buttonMovie = findViewById(R.id.SetMovie);
        buttonFibo = findViewById(R.id.SetFibo);
        buttonTwo = findViewById(R.id.SetMess);
        buttonScroll = findViewById(R.id.SetScroll);


        setIntent();
    }


    private void setIntent(){


        buttonScroll.setOnClickListener(v -> {
            Intent intent = new Intent(this, ActivityScroll.class);
            startActivity(intent);
        });

        buttonFibo.setOnClickListener(v -> {
            Intent intent = new Intent(this, ActivityFibonancci.class);
            startActivity(intent);
        });

        buttonTwo.setOnClickListener(v -> {
            Intent intent = new Intent(this, FirstActivity.class);
            startActivity(intent);
        });
        buttonMovie.setOnClickListener(v -> {
            Intent intent = new Intent(this, MainActivity.class);
            startActivity(intent);
        });


        buttonMaps.setOnClickListener(v -> {
            Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://www.google.com/maps/place/UNIVERSITAS+PELITA+BANGSA/@-6.3246424,107.1690454,14z/am=t/data=!4m20!1m13!4m12!1m3!2m2!1d107.1686063!2d-6.3232206!1m6!1m2!1s0x2e699b0c08ad8d01:0x2b18001d1b1371f9!2sUNIVERSITAS+PELITA+BANGSA,+Jl.+Inspeksi+Kalimalang+No.9,+Cibatu,+Cikarang+Sel.,+Kabupaten+Bekasi,+Jawa+Barat+17530!2m2!1d107.1692944!2d-6.3242459!3e9!3m5!1s0x2e699b0c08ad8d01:0x2b18001d1b1371f9!8m2!3d-6.3242459!4d107.1692944!16s%2Fg%2F1hm2jxhj1?entry=ttu"));
            startActivity(intent);
        });

        buttonCalender.setOnClickListener(v -> {
            Intent intent = new Intent(Intent.ACTION_MAIN);
            intent.addCategory(Intent.CATEGORY_APP_CALENDAR);
            startActivity(intent);
        });

        buttonAlarm.setOnClickListener(v -> {
            Intent intent = new Intent(AlarmClock.ACTION_SHOW_ALARMS);
            startActivity(intent);
        });

        buttonTelpon.setOnClickListener(view -> {
            String numberDeveloper = "08+++++++";
            Intent intent = new Intent(Intent.ACTION_DIAL, Uri.parse("tel:" + numberDeveloper));
            startActivity(intent);
        });
    }
}
