package com.pocpossdk.infrastructure.integrations.rede.services;

import java.util.concurrent.CompletableFuture;

import androidx.appcompat.app.AppCompatActivity;

import com.facebook.react.bridge.ReactApplicationContext;

import rede.smartrede.commons.callback.ICameraCallback;
import rede.smartrede.commons.contract.ITerminalFunctions;
import rede.smartrede.commons.exception.InvalidSdkStateException;

import com.pocpossdk.domain.contracts.IScannerService;
import com.pocpossdk.shared.utils.AppLogger;
import com.pocpossdk.domain.exceptions.ScannerException;
import com.pocpossdk.infrastructure.integrations.rede.services.RedeSdkInitializer;
import com.pocpossdk.domain.entities.ScannerResponse;
import com.pocpossdk.domain.entities.ScannerResponseData;
import com.pocpossdk.domain.enums.ScannerStatus;

/**
 *
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public class RedeScannerService implements IScannerService {
  private static final String TAG = "RedeScannerService";
  private final ReactApplicationContext context;

  public RedeScannerService(ReactApplicationContext context) {
    this.context = context;
  }

  @Override
  public CompletableFuture<ScannerResponse> scan() {
    AppLogger.info(TAG, "Abrindo câmera para leitura de código");
    CompletableFuture<ScannerResponse> future = new CompletableFuture<>();

    try {
      if (!RedeSdkInitializer.isInitialized()) {
        throw new ScannerException("SDK não inicializado");
      }

      AppCompatActivity activity = (AppCompatActivity) context.getCurrentActivity();
      if (activity == null) {
        throw new ScannerException("Não foi possível iniciar a leitura. Tente novamente.");
      }

      ITerminalFunctions terminalFunctions = RedeSdkInitializer.getTerminalFunctions();

      terminalFunctions.openCamera(activity, new ICameraCallback() {
        @Override
        public void onResultCamera(String scannedData) {
          AppLogger.info(TAG, ScannerStatus.SUCCESS.getDescription());
          future.complete(new ScannerResponse(
              ScannerStatus.SUCCESS,
              ScannerStatus.SUCCESS.getDescription(),
              new ScannerResponseData(scannedData)));
        }
      });

    } catch (ScannerException e) {
      AppLogger.error(TAG, ScannerStatus.UNKNOWN_ERROR.getDescription() + " :" + e.getMessage());
      future.complete(new ScannerResponse(
          ScannerStatus.UNKNOWN_ERROR,
          ScannerStatus.UNKNOWN_ERROR.getDescription() + " :" + e.getMessage()));
    } catch (Exception e) {
      AppLogger.error(TAG, ScannerStatus.UNKNOWN_ERROR.getDescription() + " :" + e.getMessage());
      future.complete(new ScannerResponse(
          ScannerStatus.UNKNOWN_ERROR,
          ScannerStatus.UNKNOWN_ERROR.getDescription()));
    }

    return future;
  }
}
