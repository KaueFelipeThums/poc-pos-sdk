package com.pocpossdk.domain.entities;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;

import com.pocpossdk.domain.enums.ScannerStatus;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public class ScannerResponseData {
  private @NonNull String code;

  public ScannerResponseData(@NonNull String code) {
    this.code = code;
  }

  public @NonNull String getCode() {
    return code;
  }

  public void setCode(@NonNull String code) {
    this.code = code;
  }

  public WritableMap toMap() {
    WritableMap map = Arguments.createMap();
    map.putString("code", code != null ? code : "");
    return map;
  }
}
