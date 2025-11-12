package br.com.zwebapp.domain.contracts;

import android.content.Intent;

import br.com.zwebapp.domain.exceptions.TefException;
import br.com.zwebapp.domain.entities.RedePaymentRequest;
import br.com.zwebapp.domain.entities.RedePaymentResponse;

public interface IRedeTefService {
  Intent createPaymentIntent(RedePaymentRequest redePaymentRequest) throws TefException;

  RedePaymentResponse processPaymentResult(Intent data) throws TefException;
}
