package com.example.RajaUAS;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.EditText;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

public class SecondActivity extends AppCompatActivity {

    public static final String EXTRA_REPLY = "com.rian.myproject.extra.REPLY";
    private EditText mReply;

    @Override
    protected void onCreate(Bundle SavedInstanceState){
        super.onCreate(SavedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        this.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        getSupportActionBar().hide();
        setContentView(R.layout.activity_dua);
        mReply = findViewById(R.id.editText_second);
        Intent muncul = getIntent();
        String isiSurat = muncul.getStringExtra(FirstActivity.EXTRA_MESSAGE);
        TextView textView = findViewById(R.id.text_message);
        textView.setText(isiSurat);
    }
    public void returnReply(View view){
        String bales = mReply.getText().toString();
        Intent balesIntent = new Intent();
        balesIntent.putExtra(EXTRA_REPLY, bales);
        setResult(RESULT_OK, balesIntent);
        finish();
    }
}
