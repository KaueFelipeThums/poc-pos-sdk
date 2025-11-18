package com.pocpossdk.domain.entities;

import com.pocpossdk.domain.contracts.IMappable;
import com.facebook.react.bridge.WritableMap;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public class NoExtras implements IMappable {
  @Override
  public WritableMap toMap() {
    return null;
  }
}
