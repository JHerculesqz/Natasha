package com.firelord.test_core_fw_android;

import android.app.Application;

import com.firelord.core_fw_android.widget.webview.X5WebViewUtils;

public class TestCoreFwAndroidApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();

        X5WebViewUtils.init(getApplicationContext());
    }
}
