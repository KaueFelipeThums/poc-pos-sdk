package com.pocpossdk.domain.contracts;

import android.content.Intent;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public interface IActivityResultHandler {
  boolean handlesRequestCode(int requestCode);

  void handleActivityResult(int resultCode, Intent data);
}
