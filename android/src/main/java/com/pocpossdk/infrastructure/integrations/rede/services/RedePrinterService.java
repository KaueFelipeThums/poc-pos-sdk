package com.pocpossdk.infrastructure.integrations.rede.services;

import java.util.concurrent.CompletableFuture;
import java.util.HashMap;
import java.util.Map;

import android.graphics.Bitmap;
import android.util.Base64;
import com.facebook.react.bridge.ReactApplicationContext;

import rede.smartrede.commons.contract.IConnectorPrinter;
import rede.smartrede.commons.printer.PrintAttributes;

import com.pocpossdk.domain.contracts.IPrinterService;
import com.pocpossdk.domain.contracts.IActivityResultHandler;
import com.pocpossdk.domain.entities.PrinterResponse;
import com.pocpossdk.domain.shared.utils.AppLogger;
import com.pocpossdk.domain.shared.utils.BitmapUtils;
import com.pocpossdk.domain.enums.PrinterStatus;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public class RedePrinterService implements IPrinterService {
  private final String TAG = "RedePrinterService";

  public CompletableFuture<PrinterResponse> printImageBase64(String base64Image) {
    AppLogger.info(TAG, "Iniciando impressão");
    CompletableFuture<PrinterResponse> pending = new CompletableFuture<>();

    try {
      final Bitmap bitmap = BitmapUtils.base64ToBitmap(base64Image);

      if (bitmap == null) {
        AppLogger.error(TAG, "Imagem inválida para impressão");
        throw new PrinterException("Imagem inválida para impressão");
      }

      if (!RedeSdkInitializer.isInitialized()) {
        AppLogger.error(TAG, "SDK não inicializado");
        throw new PrinterException("SDK não inicializado");
      }

      IConnectorPrinter printer = RedeSdkInitializer.getConnectorPrinter();

      printer.setPrinterCallback(new IPrinterCallback() {
        @Override
        public void onError(String error) {
          AppLogger.error(TAG, "Erro na impressão: " + error);
          pending.complete(new PrinterResponse(
              PrinterStatus.UNKNOWN_ERROR,
              "Erro na impressão: " + error));
          BitmapUtils.recycle(bitmap);
        }

        @Override
        public void onCompleted() {
          AppLogger.info(TAG, "Impressão realizada com sucesso");

          pending.complete(new PrinterResponse(
              PrinterStatus.SUCCESS,
              "Impressão realizada com sucesso"));
          BitmapUtils.recycle(bitmap);
        }
      });

      Map<String, Integer> attrs = new HashMap<>();
      attrs.put(PrintAttributes.KEY_ALIGN, 0);
      attrs.put(PrintAttributes.KEY_TYPEFACE, 1);
      attrs.put(PrintAttributes.KEY_TEXTSIZE, 22);

      printer.printBitmapWithAttributes(bitmap, attrs);
    } catch (PrinterException e) {
      AppLogger.error(TAG, "Erro na impressão: " + e.getMessage());
      pending.complete(new PrinterResponse(
          PrinterStatus.UNKNOWN_ERROR,
          "Erro na impressão: " + e.getMessage()));
    } catch (Exception e) {
      AppLogger.error(TAG, "Erro inesperado na impressão: " + e.getMessage());
      pending.complete(new PrinterResponse(
          PrinterStatus.UNKNOWN_ERROR,
          "Erro inesperado na impressão: " + e.getMessage()));
    }
  }
}
