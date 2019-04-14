package com.firelord.core_fw_android.component.misc.resource;

import android.content.Context;

public class ResourceUtils {
    //#region getStr

    public static String getStr(Context oContext, int iResId){
        String strRes = oContext.getString(iResId);
        return strRes;
    }

    //#endregion
}
