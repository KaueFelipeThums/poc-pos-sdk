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
import com.pocpossdk.infrastructure.integrations.rede.services.RedeSdkInitializer;
import com.pocpossdk.domain.exceptions.SdkInitializerException;
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

    try {
      if (!RedeSdkInitializer.isInitialized()) {
        RedeSdkInitializer.initialize(reactContext);
      }
    } catch (SdkInitializerException e) {
      AppLogger.error(TAG, "Falha na inicialização do SDK: " + e.getMessage());
    } catch (Exception e) {
      AppLogger.error(TAG, "Erro inesperado na inicialização: " + e.getMessage());
    }

    this.scannerService = new RedeScannerService();
  }

  @NonNull
  @Override
  public String getName() {
    return "RedeScannerModule";
  }

  @ReactMethod
  public void scan(Promise promise) {
    scannerService.printImageBase64()
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

  @ReactMethod
  public void getCapabilities(Promise promise) {
    WritableArray capabilities = Arguments.createArray();
    capabilities.pushString(ScannerCapabilities.SCAN.name());
    promise.resolve(capabilities);
  }
}
