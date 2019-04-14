package com.firelord.test_core_fw_android.widget;

import android.os.Bundle;
import android.app.Activity;

import com.firelord.core_fw_android.R;
import com.firelord.core_fw_android.component.misc.resource.ResourceUtils;
import com.firelord.core_fw_android.widget.webview.X5WebView;
import com.firelord.core_fw_android.widget.webview.X5WebViewUtils;

public class ActivityWebView extends Activity {
    //#region onCreate

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_web_view);

        X5WebView oX5WebView = findViewById(R.id.webView);
        String strUrl = ResourceUtils.getStr(this, R.string.WEB_VIEW_URL);
        X5WebViewUtils.loadUrl(oX5WebView, strUrl);
    }

    //#endregion
}
