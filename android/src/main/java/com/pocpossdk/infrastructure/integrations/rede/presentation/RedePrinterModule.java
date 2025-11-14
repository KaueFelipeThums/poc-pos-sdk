package com.pocpossdk.infrastructure.integrations.rede.presentation;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.pocpossdk.domain.contracts.IPrinterService;
import com.pocpossdk.domain.shared.utils.AppLogger;
import com.pocpossdk.infrastructure.integrations.rede.services.RedePrinterService;
import com.pocpossdk.infrastructure.integrations.rede.services.RedeSdkInitializer;
import com.pocpossdk.infrastructure.integrations.rede.services.RedeSdkInitializerException;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public class RedePrinterModule extends ReactContextBaseJavaModule {
  private final String TAG = "RedePrinterModule";
  private final IPrinterService printerService;

  public RedePrinterModule(ReactApplicationContext reactContext) {
    super(reactContext);

    try {
      if (!RedeSdkInitializer.isInitialized()) {
        RedeSdkInitializer.initialize(reactContext);
      }
    } catch (RedeSdkInitializerException e) {
      AppLogger.error(TAG, "Falha na inicialização do SDK: " + e.getMessage());
    } catch (Exception e) {
      AppLogger.error(TAG, "Erro inesperado na inicialização: " + e.getMessage());
    }

    this.printerService = new RedePrinterService();
  }

  @NonNull
  @Override
  public String getName() {
    return "RedePrinterModule";
  }

  @ReactMethod
  public void printImageBase64(String base64Image, Promise promise) {
    printerService.printImageBase64(base64Image)
        .thenAccept(result -> {
          promise.resolve(result.toMap());
        })
        .exceptionally(e -> {
          promise.reject("PRINT_ERROR", e);
          return null;
        });
  }
}
