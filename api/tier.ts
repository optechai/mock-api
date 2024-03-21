const result = {
  expires_at_ms: 'string',
  qualifying_event: 'INVALID_QUALIFYING_EVENT',
  tier: {
    annual_fee: {
      currency: 'string',
      value: 'string',
    },
    direct_deposit: {
      minimum_amount: {
        currency: 'string',
        value: 'string',
      },
      period_days: 0,
    },
    subscription: {
      cost: {
        currency: 'string',
        value: 'string',
      },
      renewal: 'INVALID_RENEWAL',
    },
    tier_benefits: {
      annual_value: {
        currency: 'string',
        value: 'string',
      },
      offers: [
        {
          description: 'string',
          icon: {
            url: 'string',
            url_2x: 'string',
            url_3x: 'string',
          },
          points_multiplier: 0,
        },
      ],
      rewards: {
        cash_back_rate: 0,
      },
      savings_interest: {
        rates: [
          {
            apy_rate: 0,
            effective_at_ms: 'string',
            nominal_rate: 0,
          },
        ],
        savings_balance_cap: {
          currency: 'string',
          value: 'string',
        },
      },
    },
    type: 'NORMAL',
  },
  type_changed: {
    at_ms: 'string',
    from: 'NORMAL',
  },
}

export default result
