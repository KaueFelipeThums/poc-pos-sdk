package com.pocpossdk.infrastructure.integrations.rede.services;

import android.content.Context;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;

import rede.smartrede.sdk.api.RedeSdk;
import rede.smartrede.sdk.api.IRedeSdk;
import rede.smartrede.sdk.RedePayments;
import rede.smartrede.commons.contract.ITerminalFunctions;
import rede.smartrede.commons.contract.IConnectorPrinter;

import com.pocpossdk.shared.utils.AppLogger;
import com.pocpossdk.domain.exceptions.SdkInitializerException;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public class RedeSdkInitializerService {
  private static final String TAG = "RedeSdkInitializerService";
  private static IRedeSdk redeSdkInstance;
  private static RedePayments redePayments;
  private static ITerminalFunctions terminalFunctions;
  private static IConnectorPrinter connectorPrinter;

  private RedeSdkInitializerService() {
  }

  public static synchronized void initialize(ReactApplicationContext context) throws SdkInitializerException {
    if (redeSdkInstance != null) {
      AppLogger.info(TAG, "RedeSdk já inicializado");
      return;
    }

    try {
      AppLogger.info(TAG, "Inicializando RedeSdk");

      redeSdkInstance = RedeSdk.newInstance(context.getApplicationContext());
      redePayments = redeSdkInstance.getRedePayments(context.getApplicationContext());
      terminalFunctions = redeSdkInstance.getTerminalFunctions();
      connectorPrinter = terminalFunctions.getConnectorPrinter();

      AppLogger.info(TAG, "RedeSdk inicializado com sucesso");
    } catch (Exception e) {
      AppLogger.error(TAG, "Erro ao inicializar RedeSdk: " + e.getMessage());
    }
  }

  public static IRedeSdk getRedeSdk() throws SdkInitializerException {
    if (redeSdkInstance == null) {
      AppLogger.error(TAG, "RedeSdk não foi inicializado");
      throw new SdkInitializerException("RedeSdk não foi inicializado");
    }
    return redeSdkInstance;
  }

  public static RedePayments getRedePayments() throws SdkInitializerException {
    if (redePayments == null) {
      AppLogger.error(TAG, "RedePayments não foi inicializado");
      throw new SdkInitializerException("RedePayments não foi inicializado");
    }
    return redePayments;
  }

  public static ITerminalFunctions getTerminalFunctions() throws SdkInitializerException {
    if (terminalFunctions == null) {
      AppLogger.error(TAG, "TerminalFunctions não foi inicializado");
      throw new SdkInitializerException("TerminalFunctions não foi inicializado");
    }
    return terminalFunctions;
  }

  public static IConnectorPrinter getConnectorPrinter() throws SdkInitializerException {
    if (connectorPrinter == null) {
      AppLogger.error(TAG, "ConnectorPrinter não foi inicializado");
      throw new SdkInitializerException("ConnectorPrinter não foi inicializado");
    }
    return connectorPrinter;
  }

  public static boolean isInitialized() {
    return redeSdkInstance != null;
  }

  public static synchronized void reset() {
    redeSdkInstance = null;
    redePayments = null;
    terminalFunctions = null;
    connectorPrinter = null;
  }
}
