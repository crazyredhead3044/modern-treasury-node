// File generated from our OpenAPI spec by Stainless.

import * as Core from '~/core';
import { APIResource } from '~/resource';
import { isRequestOptions } from '~/core';
import { Page, PageParams } from '~/pagination';

export class ExternalAccounts extends APIResource {
  create(
    body: ExternalAccountCreateParams,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<ExternalAccount>> {
    return this.post('/api/external_accounts', { body, ...options });
  }

  retrieve(id: string, options?: Core.RequestOptions): Promise<Core.APIResponse<ExternalAccount>> {
    return this.get(`/api/external_accounts/${id}`, options);
  }

  update(
    id: string,
    body?: ExternalAccountUpdateParams,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<ExternalAccount>>;
  update(id: string, options?: Core.RequestOptions): Promise<Core.APIResponse<ExternalAccount>>;
  update(
    id: string,
    body: ExternalAccountUpdateParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<ExternalAccount>> {
    if (isRequestOptions(body)) {
      return this.update(id, {}, body);
    }

    return this.patch(`/api/external_accounts/${id}`, { body, ...options });
  }

  list(
    query?: ExternalAccountListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<ExternalAccountsPage>;
  list(options?: Core.RequestOptions): Core.PagePromise<ExternalAccountsPage>;
  list(
    query: ExternalAccountListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<ExternalAccountsPage> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }

    return this.getAPIList('/api/external_accounts', ExternalAccountsPage, { query, ...options });
  }

  del(id: string, options?: Core.RequestOptions): Promise<void> {
    return this.delete(`/api/external_accounts/${id}`, {
      ...options,
      headers: { Accept: '', ...options?.headers },
    });
  }

  completeVerification(
    id: string,
    body?: ExternalAccountCompleteVerificationParams,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<ExternalAccount>>;
  completeVerification(id: string, options?: Core.RequestOptions): Promise<Core.APIResponse<ExternalAccount>>;
  completeVerification(
    id: string,
    body: ExternalAccountCompleteVerificationParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<ExternalAccount>> {
    if (isRequestOptions(body)) {
      return this.completeVerification(id, {}, body);
    }

    return this.post(`/api/external_accounts/${id}/complete_verification`, { body, ...options });
  }

  verify(
    id: string,
    body: ExternalAccountVerifyParams,
    options?: Core.RequestOptions,
  ): Promise<Core.APIResponse<ExternalAccount>> {
    return this.post(`/api/external_accounts/${id}/verify`, { body, ...options });
  }
}

export class ExternalAccountsPage extends Page<ExternalAccount> {}

export interface ExternalAccount {
  account_details: Array<ExternalAccount.AccountDetails>;

  /**
   * Can be `checking`, `savings` or `other`.
   */
  account_type: 'checking' | 'other' | 'savings';

  contact_details: Array<ExternalAccount.ContactDetails>;

  counterparty_id: string | null;

  created_at: string;

  discarded_at: string | null;

  id: string;

  /**
   * This field will be true if this object exists in the live environment or false
   * if it exists in the test environment.
   */
  live_mode: boolean;

  /**
   * Additional data represented as key-value pairs. Both the key and value must be
   * strings.
   */
  metadata: Record<string, string>;

  /**
   * A nickname for the external account. This is only for internal usage and won't
   * affect any payments
   */
  name: string | null;

  object: string;

  /**
   * The address associated with the owner or `null`.
   */
  party_address: ExternalAccount.PartyAddress | null;

  /**
   * The legal name of the entity which owns the account.
   */
  party_name: string;

  /**
   * Either `individual` or `business`.
   */
  party_type: 'business' | 'individual' | null;

  routing_details: Array<ExternalAccount.RoutingDetails>;

  updated_at: string;

  verification_status: 'pending_verification' | 'unverified' | 'verified';
}

export namespace ExternalAccount {
  export interface PartyAddress {
    /**
     * Country code conforms to [ISO 3166-1 alpha-2]
     */
    country: string | null;

    created_at: string;

    id: string;

    line1: string | null;

    line2: string | null;

    /**
     * This field will be true if this object exists in the live environment or false
     * if it exists in the test environment.
     */
    live_mode: boolean;

    /**
     * Locality or City.
     */
    locality: string | null;

    object: string;

    /**
     * The postal code of the address.
     */
    postal_code: string | null;

    /**
     * Region or State.
     */
    region: string | null;

    updated_at: string;
  }

  export interface AccountDetails {
    account_number: string;

    /**
     * Supports iban and clabe, otherwise other if the bank account number is in a
     * generic format.
     */
    account_number_type: 'iban' | 'clabe' | 'wallet_address' | 'pan' | 'other';

    created_at: string;

    discarded_at: string | null;

    id: string;

    /**
     * This field will be true if this object exists in the live environment or false
     * if it exists in the test environment.
     */
    live_mode: boolean;

    object: string;

    updated_at: string;
  }

  export interface RoutingDetails {
    bank_address: RoutingDetails.BankAddress | null;

    bank_name: string;

    created_at: string;

    discarded_at: string | null;

    id: string;

    /**
     * This field will be true if this object exists in the live environment or false
     * if it exists in the test environment.
     */
    live_mode: boolean;

    object: string;

    /**
     * If the routing detail is to be used for a specific payment type this field will
     * be populated, otherwise null.
     */
    payment_type:
      | 'ach'
      | 'au_becs'
      | 'bacs'
      | 'book'
      | 'card'
      | 'check'
      | 'eft'
      | 'interac'
      | 'provxchange'
      | 'rtp'
      | 'sen'
      | 'sepa'
      | 'signet'
      | 'wire'
      | null;

    /**
     * The routing number of the bank.
     */
    routing_number: string;

    routing_number_type:
      | 'aba'
      | 'swift'
      | 'au_bsb'
      | 'ca_cpa'
      | 'cnaps'
      | 'gb_sort_code'
      | 'in_ifsc'
      | 'my_branch_code'
      | 'br_codigo';

    updated_at: string;
  }

  export namespace RoutingDetails {
    export interface BankAddress {
      /**
       * Country code conforms to [ISO 3166-1 alpha-2]
       */
      country: string | null;

      created_at: string;

      id: string;

      line1: string | null;

      line2: string | null;

      /**
       * This field will be true if this object exists in the live environment or false
       * if it exists in the test environment.
       */
      live_mode: boolean;

      /**
       * Locality or City.
       */
      locality: string | null;

      object: string;

      /**
       * The postal code of the address.
       */
      postal_code: string | null;

      /**
       * Region or State.
       */
      region: string | null;

      updated_at: string;
    }
  }

  export interface ContactDetails {
    contact_identifier: string;

    contact_identifier_type: 'email' | 'phone_number';

    created_at: string;

    discarded_at: string | null;

    id: string;

    /**
     * This field will be true if this object exists in the live environment or false
     * if it exists in the test environment.
     */
    live_mode: boolean;

    object: string;

    updated_at: string;
  }
}

export interface ExternalAccountCreateParams {
  counterparty_id: string | null;

  account_details?: Array<ExternalAccountCreateParams.AccountDetails>;

  /**
   * Can be `checking`, `savings` or `other`.
   */
  account_type?: 'checking' | 'other' | 'savings';

  contact_details?: Array<ExternalAccountCreateParams.ContactDetails>;

  /**
   * Additional data represented as key-value pairs. Both the key and value must be
   * strings.
   */
  metadata?: Record<string, string>;

  /**
   * A nickname for the external account. This is only for internal usage and won't
   * affect any payments
   */
  name?: string | null;

  /**
   * Required if receiving wire payments.
   */
  party_address?: ExternalAccountCreateParams.PartyAddress;

  party_identifier?: string;

  /**
   * If this value isn't provided, it will be inherited from the counterparty's name.
   */
  party_name?: string;

  /**
   * Either `individual` or `business`.
   */
  party_type?: 'business' | 'individual' | null;

  /**
   * If you've enabled the Modern Treasury + Plaid integration in your Plaid account,
   * you can pass the processor token in this field.
   */
  plaid_processor_token?: string;

  routing_details?: Array<ExternalAccountCreateParams.RoutingDetails>;
}

export namespace ExternalAccountCreateParams {
  export interface PartyAddress {
    /**
     * Country code conforms to [ISO 3166-1 alpha-2]
     */
    country?: string | null;

    line1?: string | null;

    line2?: string | null;

    /**
     * Locality or City.
     */
    locality?: string | null;

    /**
     * The postal code of the address.
     */
    postal_code?: string | null;

    /**
     * Region or State.
     */
    region?: string | null;
  }

  export interface AccountDetails {
    account_number: string;

    account_number_type?: 'iban' | 'clabe' | 'wallet_address' | 'pan' | 'other';
  }

  export interface RoutingDetails {
    routing_number: string;

    routing_number_type:
      | 'aba'
      | 'swift'
      | 'au_bsb'
      | 'ca_cpa'
      | 'cnaps'
      | 'gb_sort_code'
      | 'in_ifsc'
      | 'my_branch_code'
      | 'br_codigo';

    payment_type?:
      | 'ach'
      | 'au_becs'
      | 'bacs'
      | 'book'
      | 'card'
      | 'check'
      | 'eft'
      | 'interac'
      | 'provxchange'
      | 'rtp'
      | 'sen'
      | 'sepa'
      | 'signet'
      | 'wire';
  }

  export interface ContactDetails {
    contact_identifier?: string;

    contact_identifier_type?: 'email' | 'phone_number';
  }
}

export interface ExternalAccountUpdateParams {
  /**
   * Can be `checking`, `savings` or `other`.
   */
  account_type?: 'checking' | 'other' | 'savings';

  counterparty_id?: string | null;

  /**
   * Additional data in the form of key-value pairs. Pairs can be removed by passing
   * an empty string or `null` as the value.
   */
  metadata?: Record<string, string>;

  /**
   * A nickname for the external account. This is only for internal usage and won't
   * affect any payments
   */
  name?: string | null;

  party_address?: ExternalAccountUpdateParams.PartyAddress;

  /**
   * If this value isn't provided, it will be inherited from the counterparty's name.
   */
  party_name?: string;

  /**
   * Either `individual` or `business`.
   */
  party_type?: 'business' | 'individual' | null;
}

export namespace ExternalAccountUpdateParams {
  export interface PartyAddress {
    /**
     * Country code conforms to [ISO 3166-1 alpha-2]
     */
    country?: string | null;

    line1?: string | null;

    line2?: string | null;

    /**
     * Locality or City.
     */
    locality?: string | null;

    /**
     * The postal code of the address.
     */
    postal_code?: string | null;

    /**
     * Region or State.
     */
    region?: string | null;
  }
}

export interface ExternalAccountListParams extends PageParams {
  counterparty_id?: string;

  /**
   * For example, if you want to query for records with metadata key `Type` and value
   * `Loan`, the query would be `metadata%5BType%5D=Loan`. This encodes the query
   * parameters.
   */
  metadata?: Record<string, string>;

  /**
   * Searches the ExternalAccount's party_name AND the Counterparty's party_name
   */
  party_name?: string;
}

export interface ExternalAccountCompleteVerificationParams {
  amounts?: Array<number>;
}

export interface ExternalAccountVerifyParams {
  /**
   * The ID of the internal account where the micro-deposits originate from. Both
   * credit and debit capabilities must be enabled.
   */
  originating_account_id: string;

  /**
   * Both ach and eft are supported payment types.
   */
  payment_type:
    | 'ach'
    | 'au_becs'
    | 'bacs'
    | 'book'
    | 'card'
    | 'check'
    | 'eft'
    | 'interac'
    | 'provxchange'
    | 'rtp'
    | 'sen'
    | 'sepa'
    | 'signet'
    | 'wire';

  /**
   * Defaults to the currency of the originating account.
   */
  currency?:
    | 'AED'
    | 'AFN'
    | 'ALL'
    | 'AMD'
    | 'ANG'
    | 'AOA'
    | 'ARS'
    | 'AUD'
    | 'AWG'
    | 'AZN'
    | 'BAM'
    | 'BBD'
    | 'BCH'
    | 'BDT'
    | 'BGN'
    | 'BHD'
    | 'BIF'
    | 'BMD'
    | 'BND'
    | 'BOB'
    | 'BRL'
    | 'BSD'
    | 'BTC'
    | 'BTN'
    | 'BWP'
    | 'BYN'
    | 'BYR'
    | 'BZD'
    | 'CAD'
    | 'CDF'
    | 'CHF'
    | 'CLF'
    | 'CLP'
    | 'CNH'
    | 'CNY'
    | 'COP'
    | 'CRC'
    | 'CUC'
    | 'CUP'
    | 'CVE'
    | 'CZK'
    | 'DJF'
    | 'DKK'
    | 'DOP'
    | 'DZD'
    | 'EEK'
    | 'EGP'
    | 'ERN'
    | 'ETB'
    | 'EUR'
    | 'FJD'
    | 'FKP'
    | 'GBP'
    | 'GBX'
    | 'GEL'
    | 'GGP'
    | 'GHS'
    | 'GIP'
    | 'GMD'
    | 'GNF'
    | 'GTQ'
    | 'GYD'
    | 'HKD'
    | 'HNL'
    | 'HRK'
    | 'HTG'
    | 'HUF'
    | 'IDR'
    | 'ILS'
    | 'IMP'
    | 'INR'
    | 'IQD'
    | 'IRR'
    | 'ISK'
    | 'JEP'
    | 'JMD'
    | 'JOD'
    | 'JPY'
    | 'KES'
    | 'KGS'
    | 'KHR'
    | 'KMF'
    | 'KPW'
    | 'KRW'
    | 'KWD'
    | 'KYD'
    | 'KZT'
    | 'LAK'
    | 'LBP'
    | 'LKR'
    | 'LRD'
    | 'LSL'
    | 'LTL'
    | 'LVL'
    | 'LYD'
    | 'MAD'
    | 'MDL'
    | 'MGA'
    | 'MKD'
    | 'MMK'
    | 'MNT'
    | 'MOP'
    | 'MRO'
    | 'MRU'
    | 'MTL'
    | 'MUR'
    | 'MVR'
    | 'MWK'
    | 'MXN'
    | 'MYR'
    | 'MZN'
    | 'NAD'
    | 'NGN'
    | 'NIO'
    | 'NOK'
    | 'NPR'
    | 'NZD'
    | 'OMR'
    | 'PAB'
    | 'PEN'
    | 'PGK'
    | 'PHP'
    | 'PKR'
    | 'PLN'
    | 'PYG'
    | 'QAR'
    | 'RON'
    | 'RSD'
    | 'RUB'
    | 'RWF'
    | 'SAR'
    | 'SBD'
    | 'SCR'
    | 'SDG'
    | 'SEK'
    | 'SGD'
    | 'SHP'
    | 'SKK'
    | 'SLL'
    | 'SOS'
    | 'SRD'
    | 'SSP'
    | 'STD'
    | 'SVC'
    | 'SYP'
    | 'SZL'
    | 'THB'
    | 'TJS'
    | 'TMM'
    | 'TMT'
    | 'TND'
    | 'TOP'
    | 'TRY'
    | 'TTD'
    | 'TWD'
    | 'TZS'
    | 'UAH'
    | 'UGX'
    | 'USD'
    | 'UYU'
    | 'UZS'
    | 'VEF'
    | 'VES'
    | 'VND'
    | 'VUV'
    | 'WST'
    | 'XAF'
    | 'XAG'
    | 'XAU'
    | 'XBA'
    | 'XBB'
    | 'XBC'
    | 'XBD'
    | 'XCD'
    | 'XDR'
    | 'XFU'
    | 'XOF'
    | 'XPD'
    | 'XPF'
    | 'XPT'
    | 'XTS'
    | 'YER'
    | 'ZAR'
    | 'ZMK'
    | 'ZMW'
    | 'ZWD'
    | 'ZWL'
    | 'ZWN'
    | 'ZWR';
}
