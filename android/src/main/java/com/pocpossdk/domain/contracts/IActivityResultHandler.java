package com.pocpossdk.domain.contracts;

import android.content.Intent;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public interface IActivityResultHandler {
  void handleActivityResult(int requestCode, int resultCode, Intent data);
}
