package com.pocpossdk.infrastructure.integrations.rede.services;

import java.util.concurrent.CompletableFuture;
import java.util.HashMap;
import java.util.Map;

import android.graphics.Bitmap;
import android.util.Base64;
import com.facebook.react.bridge.ReactApplicationContext;

import rede.smartrede.commons.callback.IPrinterCallback;
import rede.smartrede.commons.contract.IConnectorPrinter;
import rede.smartrede.commons.printer.PrintAttributes;

import com.pocpossdk.domain.contracts.IPrinterService;
import com.pocpossdk.domain.contracts.IActivityResultHandler;
import com.pocpossdk.domain.entities.PrinterResponse;
import com.pocpossdk.domain.enums.PrinterStatus;
import com.pocpossdk.shared.utils.AppLogger;
import com.pocpossdk.shared.utils.BitmapUtils;
import com.pocpossdk.domain.exceptions.PrinterException;
import com.pocpossdk.infrastructure.integrations.rede.services.RedeSdkInitializerService;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public class RedePrinterService implements IPrinterService {
  private static final String TAG = "RedePrinterService";

  public CompletableFuture<PrinterResponse<?>> printImageBase64(String base64Image) {
    AppLogger.info(TAG, "Iniciando impressão");
    CompletableFuture<PrinterResponse<?>> future = new CompletableFuture<>();

    try {
      final Bitmap bitmap = BitmapUtils.base64ToBitmap(base64Image);

      if (bitmap == null) {
        throw new PrinterException("Imagem inválida para impressão");
      }

      if (!RedeSdkInitializerService.isInitialized()) {
        throw new PrinterException("SDK não inicializado");
      }

      IConnectorPrinter printer = RedeSdkInitializerService.getConnectorPrinter();

      printer.setPrinterCallback(new IPrinterCallback() {
        @Override
        public void onError(String error) {
          AppLogger.error(TAG, PrinterStatus.UNKNOWN_ERROR.getDescription() + " :" + error);
          future.complete(new PrinterResponse<>(
              PrinterStatus.UNKNOWN_ERROR,
              PrinterStatus.UNKNOWN_ERROR.getDescription()));
          BitmapUtils.recycle(bitmap);
        }

        @Override
        public void onCompleted() {
          AppLogger.info(TAG, PrinterStatus.SUCCESS.getDescription());
          future.complete(new PrinterResponse<>(
              PrinterStatus.SUCCESS,
              PrinterStatus.SUCCESS.getDescription()));
          BitmapUtils.recycle(bitmap);
        }
      });

      Map<String, Integer> attrs = new HashMap<>();
      attrs.put(PrintAttributes.KEY_ALIGN, 0);
      attrs.put(PrintAttributes.KEY_TYPEFACE, 1);
      attrs.put(PrintAttributes.KEY_TEXTSIZE, 22);

      printer.printBitmapWithAttributes(bitmap, attrs);
    } catch (PrinterException e) {
      AppLogger.error(TAG, PrinterStatus.UNKNOWN_ERROR.getDescription() + " :" + e.getMessage());
      future.complete(new PrinterResponse<>(
          PrinterStatus.UNKNOWN_ERROR,
          PrinterStatus.UNKNOWN_ERROR.getDescription() + " :" + e.getMessage()));
    } catch (Exception e) {
      AppLogger.error(TAG, PrinterStatus.UNKNOWN_ERROR.getDescription() + " :" + e.getMessage());
      future.complete(new PrinterResponse<>(
          PrinterStatus.UNKNOWN_ERROR,
          PrinterStatus.UNKNOWN_ERROR.getDescription()));
    }

    return future;
  }
}
