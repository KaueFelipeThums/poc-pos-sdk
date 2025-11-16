package com.pocpossdk.infrastructure.integrations.rede.presentation;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.pocpossdk.domain.contracts.IPrinterService;
import com.pocpossdk.shared.utils.AppLogger;
import com.pocpossdk.infrastructure.integrations.rede.services.RedePrinterService;
import com.pocpossdk.infrastructure.integrations.rede.services.RedeSdkInitializerService;
import com.pocpossdk.domain.exceptions.SdkInitializerException;
import com.pocpossdk.domain.entities.PrinterResponse;
import com.pocpossdk.domain.enums.PrinterStatus;
import com.pocpossdk.domain.enums.PrinterCapabilities;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public class RedePrinterModule extends ReactContextBaseJavaModule {
  private final String TAG = "RedePrinterModule";
  private final IPrinterService printerService;

  public RedePrinterModule(ReactApplicationContext reactContext) {
    super(reactContext);

    try {
      if (!RedeSdkInitializerService.isInitialized()) {
        RedeSdkInitializerService.initialize(reactContext);
      }
    } catch (SdkInitializerException e) {
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
          PrinterResponse<?> errorResponse = new PrinterResponse<>(
              PrinterStatus.UNKNOWN_ERROR,
              PrinterStatus.UNKNOWN_ERROR.getDescription());

          promise.resolve(errorResponse.toMap());
          return null;
        });
  }

  @ReactMethod
  public void getCapabilities(Promise promise) {
    WritableArray capabilities = Arguments.createArray();
    capabilities.pushString(PrinterCapabilities.PRINT_BASE64_IMAGE.name());
    promise.resolve(capabilities);
  }
}
