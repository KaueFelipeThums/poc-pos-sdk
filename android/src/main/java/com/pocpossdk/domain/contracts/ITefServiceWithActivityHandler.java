package com.pocpossdk.domain.contracts;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public interface ITefServiceWithActivityHandler<TResp extends IMappable, TReq>
    extends ITefService<TResp, TReq>, IActivityResultHandler {
}
