package com.firelord.test_core_fw_android;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import com.firelord.core_fw_android.R;
import com.firelord.core_fw_android.component.misc.activity.ActivityUtils;
import com.firelord.test_core_fw_android.widget.ActivityWebView;

public class MainActivity extends Activity {
    //#region onCreate

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //webView
        Button oBtn = findViewById(R.id.buttonWebView);
        oBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                ActivityUtils.go2(MainActivity.this, ActivityWebView.class);
            }
        });
    }

    //#endregion
}
