package com.pocpossdk.infrastructure.integrations.rede.presentation;

import android.app.Activity;
import android.content.Intent;

import androidx.annotation.NonNull;

import android.content.Intent;
import android.app.Activity;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;

import com.pocpossdk.domain.contracts.ITefService;
import com.pocpossdk.domain.entities.PaymentResponse;
import com.pocpossdk.domain.entities.PaymentRequest;
import com.pocpossdk.domain.enums.PaymentStatus;
import com.pocpossdk.shared.utils.AppLogger;
import com.pocpossdk.infrastructure.integrations.rede.services.RedeTefService;
import com.pocpossdk.infrastructure.integrations.rede.services.RedeSdkInitializer;
import com.pocpossdk.infrastructure.integrations.rede.domain.entities.RedePaymentExtras;
import com.pocpossdk.infrastructure.integrations.rede.mappers.RedePaymentRequestMapper;
import com.pocpossdk.domain.exceptions.SdkInitializerException;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public class RedeTefModule extends ReactContextBaseJavaModule {
  private final String TAG = "RedeTefModule";
  private final ITefService tefService;

  public RedeTefModule(ReactApplicationContext reactContext) {
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

    this.tefService = new RedeTefService(reactContext);
    reactContext.addActivityEventListener(mActivityEventListener);
  }

  @NonNull
  @Override
  public String getName() {
    return "RedeTefModule";
  }

  @ReactMethod
  public void payment(ReadableMap data, Promise promise) {
    try {
      PaymentRequest<RedePaymentExtras> paymentRequest = RedePaymentRequestMapper.map(data);

      tefService.payment(paymentRequest)
          .thenAccept(result -> {
            promise.resolve(result.toMap());
          })
          .exceptionally(e -> {
            PaymentResponse errorResponse = new PaymentResponse(
                PaymentStatus.UNKNOWN_ERROR,
                PaymentStatus.UNKNOWN_ERROR.getDescription());

            promise.resolve(errorResponse.toMap());
            return null;
          });
    } catch (Exception e) {
      AppLogger.error(TAG, "Erro ao processar pagamento: " + e.getMessage());
      PaymentResponse errorResponse = new PaymentResponse(
          PaymentStatus.UNKNOWN_ERROR,
          "Erro ao processar pagamento: " + e.getMessage());
      promise.resolve(errorResponse.toMap());
    }
  }

  private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {
    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
      tefService.handleActivityResult(requestCode, resultCode, data);
    }
  };

  @ReactMethod
  public void getCapabilities(Promise promise) {
    WritableArray capabilities = Arguments.createArray();
    capabilities.pushString("payment");
    promise.resolve(capabilities);
  }
}
