package com.pocpossdk.infrastructure.integrations.rede.domain.entities;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.pocpossdk.domain.contracts.IMappable;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public class RedePaymentExtras {
  private @NonNull String packageName;

  public RedePaymentExtras(@NonNull String packageName) {
    this.packageName = packageName;
  }

  public @NonNull String getPackageName() {
    return packageName;
  }

  public void setPackageName(@NonNull String packageName) {
    this.packageName = packageName;
  }
}
