package com.pocpossdk.infrastructure.integrations.rede.domain.entities;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public class RedePaymentExtras {
  private @NonNull String packageName;

  public RedePaymentExtras(@NonNull String packageName) {
    this(packageName, null);
  }

  public @NonNull String getPackageName() {
    return packageName;
  }
}
