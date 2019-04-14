package com.firelord.core_fw_android.widget.webview;

import android.content.Context;
import android.util.Log;

import com.tencent.smtt.export.external.interfaces.ConsoleMessage;
import com.tencent.smtt.sdk.QbSdk;
import com.tencent.smtt.sdk.WebChromeClient;

public class X5WebViewUtils {
    //#region init

    public static void init(Context oApplicationContext) {
        QbSdk.PreInitCallback cb = new QbSdk.PreInitCallback() {
            @Override
            public void onViewInitFinished(boolean arg0) {
                Log.d("app", " onViewInitFinished is " + arg0);
            }

            @Override
            public void onCoreInitFinished() {
                //do nothing
            }
        };
        QbSdk.initX5Environment(oApplicationContext, cb);
    }

    //#endregion

    //#region loadUrl

    public static void loadUrl(X5WebView oX5WebView, String strUrl) {
        oX5WebView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onConsoleMessage(ConsoleMessage consoleMessage) {
                Log.i("consoleMessage", consoleMessage.message());
                return super.onConsoleMessage(consoleMessage);
            }
        });
        oX5WebView.getSettings();
        oX5WebView.loadUrl(strUrl);
    }

    //#endregion
}
