package com.pocpossdk.domain.valueObjects;

/**
 * @author Kaue Thums <kaue.thums@zucchetti.com>
 */
public class Receipt {
    private final String merchantCopy;
    private final String customerCopy;

    public Receipt(String merchantCopy, String customerCopy) {
        this.merchantCopy = merchantCopy;
        this.customerCopy = customerCopy;
    }

    public boolean hasMerchantCopy() {
        return merchantCopy != null && !merchantCopy.isEmpty();
    }

    public boolean hasCustomerCopy() {
        return customerCopy != null && !customerCopy.isEmpty();
    }

    public String getMerchantCopy() {
        return merchantCopy;
    }

    public String getCustomerCopy() {
        return customerCopy;
    }
}
