package br.com.zwebapp.domain.contracts;

import com.facebook.react.bridge.Promise;

import br.com.zwebapp.domain.exceptions.PrinterException;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public interface IPrinterService {
  void printImageBase64(String base64) throws PrinterException;
  void printText(String text) throws PrinterException;
}
