// Types for proposal API

export interface PatchProposalDataRequest {
    data: Record<string, unknown | null>;
  }
  
  export interface PatchProposalDataResponse {
    data: Record<string, unknown>;
  }
  
  /**
   * Represents a single proposal item in the /v3/proposal-search response
   */
  export interface ProposalSearchResult {
    created_at: number;
    updated_at: number;
    title: string;
    uuid: string;
    series_uuid: string;
    company_id: number;
    version: number;
    status: string;
    data: Record<string, unknown>;
  }
  
  /**
   * Represents the response from /v3/proposal-search
   */
  export interface ProposalSearchResponse {
    data: ProposalSearchResult[];
  }
  
  export interface Proposal {
    archived_at: number | null;
    attachments: ProposalAttachment[];
    background_image: ProposalMedia | null;
    background_video: ProposalMedia | null;
    blocks: ProposalBlock[];
    company_powerups: Powerups;
    company_registration_number: string | null;
    company_tax_mode_live: 'standard' | 'simplified' | 'tax-free' | 'none';
    company_website: string | null;
    contact_avatar_uuid: string | null;
    contact_email: string;
    contact_id: number;
    contact_name: string | null;
    contact_phone: string | null;
    contact_title: string | null;
    creator_id: number;
    creator_name: string | null;
    currency: string;
    data: ProposalData;
    description_md: string | null;
    editor: ProposalEditor;
    expires_at: number | null;
    invoicing: ProposalInvoicing;
    is_agreement: boolean;
    is_only_proposal_in_series: boolean;
    is_test: boolean;
    language: string;
    pending: boolean;
    pending_reason: string | null;
    recipient_company_name: string | null;
    recipient_email: string | null;
    recipient_id: number | null;
    recipient_is_set: boolean;
    recipient_name: string | null;
    recipient_phone: string | null;
    signatures: ProposalSignature[];
    status_changed_at: number;
    status: 'accepted' | 'active' | 'draft' | 'expired' | 'rejected' | 'template' | 'withdrawn' | 'replaced' | null;
    tax_options: ProposalTaxOptions;
    title_md: string | null;
    tracking: ProposalTracking;
    updated_at: number;
    uuid: string;
    series_uuid: string;
    value_with_tax: number;
    value_without_tax: number;
    version: number | null;
  }
  
  // --- Supporting Types ---
  
  export interface ProposalAttachment {
    mime_type: string;
    name: string;
    url: string;
  }
  
  export interface ProposalMedia {
    id: number;
    uuid: string;
  }
  
  export type Unit =
    | 'day'
    | 'h'
    | 'kg'
    | 'm'
    | 'month'
    | 'person'
    | 'sqm'
    | 'unit'
    | 'year'
    | 'night'
    | 'no-unit';
  
  export interface ProposalBlock {
    updated_at?: number;
    source_content_updated_at?: number;
    comment?: string;
    content_id?: number;
    currency?: string;
    description?: string;
    fixed_discount?: number;
    image_uuids?: string[];
    inventory_connected?: boolean;
    language: string;
    multi_product_data?: MultiProductRow[];
    multi_product_enabled?: boolean;
    optional_picked?: boolean;
    optional?: boolean;
    package_split?: PackageSplit;
    percent_discount?: number;
    quantity_editable?: boolean;
    quantity_max?: number;
    quantity_min?: number;
    quantity_variable_data?: string;
    quantity_variable?: boolean;
    quantity_visible?: boolean;
    quantity?: number;
    recurring?: boolean;
    relative?: boolean;
    sources?: {
      integration: {
        integrationId: number;
        uniqueId: string;
        metadata: Record<string, unknown>;
      };
    };
    title?: string;
    type: 'product-block' | 'video-block';
    unit_value_with_discount_with_tax?: number;
    unit_value_with_discount_without_tax?: number;
    unit_value_without_discount_with_tax?: number;
    unit_value_without_discount_without_tax?: number;
    unit?: Unit;
    uuid: string;
    video_url?: string;
  }
  
  export interface Powerups {
    [key: string]: any;
  }
  
  export interface ProposalData {
    [key: string]: any;
  }
  
  export interface ProposalEditor {
    cc?: number[];
    notification_user_ids?: number[];
  }
  
  export interface ProposalSignature {
    date: string;
    ip: string;
    name: string;
    user_agent: string;
    user_id?: number;
  }
  
  export interface ProposalTaxOptions {
    mode?: 'standard' | 'simplified' | 'tax-free' | 'none';
    tax_included?: boolean;
    tax_label_key?: string;
  }
  
  export interface ProposalTracking {
    accepted_at?: string;
    accepted_by_mobile?: boolean;
    created_from_proposal?: string;
    created_from_rfp?: number;
    created_from_template?: string;
    expired_at?: string;
    expiration_reminder_sent_at?: string;
    first_viewed_at?: string;
    last_viewed_at?: string;
    number_of_views?: number;
    rejected_at?: string;
    sent_at?: string;
    withdrawn_at?: string;
    marked_as_accepted_by_user?: {
      email?: string;
      id: number;
      name?: string;
    };
  }
  
  export interface ProposalInvoicing {
    data_prefill?: any;
    data?: { [x: string]: string };
    enabled?: boolean;
    form_overrides?: object;
    reminder_sent_at?: string;
    submitted_at?: string;
  }
  
  export interface GetProposalResponse {
    data: Proposal;
  }
  
  export interface ProposalRecipientIntegrationSource {
    integration?: {
      id: number;
      contactId: string;
      metadata: Record<string, unknown>;
    };
  }
  
  export type ProposalRecipient =
    | { id: number }
    | {
        first_name?: string;
        last_name?: string;
        email?: string;
        phone?: string;
        company_name?: string;
        sources?: ProposalRecipientIntegrationSource;
      };
  
  // --- PackageSplit and related types ---
  
  /**
   * Describes how VAT should be applied to a product or package.
   * See proposal block spec for details.
   */
  export interface PackageSplit {
    /**
     * When a discount is applied to the product, determines whether this part of the VAT split should be affected.
     * If true, this part of the value will not be affected by discounts when calculating VAT.
     */
    enable_discount?: boolean;
  
    /**
     * Determines whether this part of the value should be affected by price overrides, or stay fixed.
     * See spec for details.
     */
    fixed?: boolean;
  
    /**
     * The type of service provided. Used for data insights, not shown in UI.
     */
    type: 'accommodation' | 'meetingRoom' | 'food' | 'other';
  
    /**
     * Remembers whether the value input by the user was with or without tax.
     */
    value_saved_with_tax?: boolean;
  
    /**
     * Pre-calculated value for the split after tax is applied (in cents).
     */
    value_with_tax?: number;
  
    /**
     * Pre-calculated value for the split before tax is applied (in cents).
     */
    value_without_tax?: number;
  
    /**
     * The VAT rate to be applied (0-1). Optional in schema, but always present in practice.
     */
    vat?: number;
  
    /**
     * @deprecated Use value_without_tax instead
     * Deprecated, maintained only for legacy proposals.
     */
    value?: number;
  }
  
  // --- UnitValues ---
  
  /**
   * Represents the four pre-calculated unit values for a product or row, in cents.
   * All fields are optional to allow partial updates.
   */
  export interface UnitValues {
    /**
     * The value of one unit of the product excluding tax, and before applying the discount.
     */
    unit_value_without_discount_without_tax?: number;
  
    /**
     * The value of one unit of the product excluding tax, after applying the discount.
     */
    unit_value_with_discount_without_tax?: number;
  
    /**
     * The value of one unit of the product including tax, before applying the discount.
     */
    unit_value_without_discount_with_tax?: number;
  
    /**
     * The value of one unit of the product including tax, after applying the discount.
     */
    unit_value_with_discount_with_tax?: number;
  }
  
  // --- MultiProductRow and related types ---
  
  /**
   * Represents a row in the breakdown of a multi-product block.
   * See proposal block spec for details.
   */
  export interface MultiProductRow {
    uuid: string;
    dateFrom?: string;
    dateTo?: string;
    discount?: number; // 0-1, percent discount
    fixed_discount?: number; // cents
    packageInfo?: {
      packageName?: string;
      sourceRowUuid: string;
    };
    occupancy?: number;
    label?: string;
    quantity?: number;
    unit?: UnitSchema;
    subrows?: MultiProductSubRow[];
    unitValues?: UnitValues;
    _unitValueWasOverridden?: boolean;
    compoundedValues?: UnitValues;
  }
  
  // Placeholder for MultiProductSubRow, update as needed
  export type MultiProductSubRow = Omit<MultiProductRow, 'subrows'> & {
    subrows?: MultiProductSubRow[];
  };
  
  // Placeholder for UnitSchema, update as needed
  export type UnitSchema = {
    code: string;
    name: string;
  };
  
  // --- Create Proposal ---
  
  export interface CreateProposalRequest {
    description_md?: string;
    recipient?: ProposalRecipient;
    data?: Record<string, unknown>;
    blocks?: ProposalBlock[];
    attachments?: ProposalAttachment[];
  }
  
  export interface CreateProposalResponse {
    proposal: {
      uuid: string;
      url: string;
    };
  }