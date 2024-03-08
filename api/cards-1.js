const cards = {
  cards: [
    {
      activated_at_ms: "string",
      atm: {
        enabled: true,
      },
      card_category: "INVALID_CARD_CATEGORY",
      card_program_type: "INVALID_CARD_PROGRAM_TYPE",
      card_status: "ACTIVE_WALLET_ONLY",
      card_type: "PHYSICAL",
      closed_at_ms: "string",
      createdAtMs: "2024-02-21T10:01:34.100Z",
      design: {
        metal_card: {
          category: "INVALID_CARD_CATEGORY",
        },
        plastic_card: {
          color: "INVALID_STEP_COLOR",
        },
      },
      expiration_date: {
        month: 0,
        year: 0,
      },
      id: "card-1A",
      is_replaced: true,
      issuer: "INVALID_CARD_ISSUER",
      name_on_card: "string",
      pan_suffix: "string",
      pin_status: "INVALID_CARD_PIN_STATUS",
      replaced_by: "string",
      replacement_reason: "INVALID_CARD_REPLACEMENT_REASON",
      shipping: {
        address: {
          city: "string",
          country: "string",
          line1: "string",
          line2: "string",
          location: {
            latitude: 0,
            longitude: 0,
          },
          state_province_region: "string",
          zip_postal_code: "string",
        },
        carrier: "string",
        etaMs: "string",
        service: "INVALID_SHIPMENT_SERVICE",
        status: "DELIVERED",
        tracking_number: "string",
        tracking_url: "string",
      },
      updated_at_ms: "string",
      user_id: "string",
      wallets: {
        apple_pay: {
          eligible: true,
          ineligible_reason: "string",
          wallet_account_id: "string",
        },
        google_pay: {
          eligible: true,
          ineligible_reason: "string",
          wallet_account_id: "string",
        },
      },
    },
    {
      activated_at_ms: "string",
      atm: {
        enabled: true,
      },
      card_category: "INVALID_CARD_CATEGORY",
      card_program_type: "INVALID_CARD_PROGRAM_TYPE",
      card_status: "CANCELED",
      card_type: "PHYSICAL",
      closed_at_ms: "string",
      createdAtMs: "2024-02-28T08:02:54.252Z",
      design: {
        metal_card: {
          category: "INVALID_CARD_CATEGORY",
        },
        plastic_card: {
          color: "INVALID_STEP_COLOR",
        },
      },
      expiration_date: {
        month: 0,
        year: 0,
      },
      id: "card-1B",
      is_replaced: false,
      issuer: "INVALID_CARD_ISSUER",
      name_on_card: "string",
      pan_suffix: "string",
      pin_status: "INVALID_CARD_PIN_STATUS",
      replaced_by: "string",
      replacement_reason: "INVALID_CARD_REPLACEMENT_REASON",
      shipping: {
        address: {
          city: "Palo Alto",
          country: "United States",
          line1: "120 Hawthorne Ave",
          line2: "",
          location: {
            latitude: 0,
            longitude: 0,
          },
          stateProvinceRegion: "CA",
          zipPostalCode: "94301",
        },
        carrier: "string",
        etaMs: "string",
        service: "INVALID_SHIPMENT_SERVICE",
        status: "DELIVERED",
        tracking_number: "string",
        tracking_url: "string",
      },
      updated_at_ms: "string",
      user_id: "string",
      wallets: {
        apple_pay: {
          eligible: true,
          ineligible_reason: "string",
          wallet_account_id: "string",
        },
        google_pay: {
          eligible: true,
          ineligible_reason: "string",
          wallet_account_id: "string",
        },
      },
    },
  ],
};

module.exports = cards;
