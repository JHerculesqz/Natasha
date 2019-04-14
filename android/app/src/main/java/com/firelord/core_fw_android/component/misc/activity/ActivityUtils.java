package com.firelord.core_fw_android.component.misc.activity;

import android.content.Context;
import android.content.Intent;

public class ActivityUtils {
    //#region go2

    public static void go2(Context oFromActivity, Class<?> oToActivityClazz) {
        Intent oIntent = new Intent(oFromActivity, oToActivityClazz);
        oFromActivity.startActivity(oIntent);
    }

    //#endregion
}
