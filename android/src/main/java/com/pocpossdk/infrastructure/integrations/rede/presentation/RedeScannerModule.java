package com.pocpossdk.infrastructure.integrations.rede.presentation;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.pocpossdk.domain.contracts.IScannerService;
import com.pocpossdk.shared.utils.AppLogger;
import com.pocpossdk.infrastructure.integrations.rede.services.RedeScannerService;
import com.pocpossdk.infrastructure.integrations.rede.services.RedeSdkInitializerService;
import com.pocpossdk.domain.entities.ScannerResponse;
import com.pocpossdk.domain.enums.ScannerStatus;
import com.pocpossdk.domain.enums.ScannerCapabilities;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public class RedeScannerModule extends ReactContextBaseJavaModule {
  private final String TAG = "RedeScannerModule";
  private final IScannerService scannerService;

  public RedeScannerModule(ReactApplicationContext reactContext) {
    super(reactContext);

    if (!RedeSdkInitializerService.isInitialized()) {
      RedeSdkInitializerService.initialize(reactContext);
    }

    this.scannerService = new RedeScannerService(reactContext);
  }

  @NonNull
  @Override
  public String getName() {
    return "RedeScannerModule";
  }

  @ReactMethod
  public void scan(Promise promise) {
    scannerService.scan()
        .thenAccept(result -> {
          promise.resolve(result.toMap());
        })
        .exceptionally(e -> {
          ScannerResponse errorResponse = new ScannerResponse(
              ScannerStatus.UNKNOWN_ERROR,
              ScannerStatus.UNKNOWN_ERROR.getDescription());

          promise.resolve(errorResponse.toMap());
          return null;
        });
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  public WritableArray getCapabilities() {
    WritableArray capabilities = Arguments.createArray();
    capabilities.pushString(ScannerCapabilities.SCAN.name());
    return capabilities;
  }
}
