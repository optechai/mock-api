const accounts = {
  accounts: [
    {
      account_number: 'string',
      ach_account: {
        account_number: 'string',
        routing_number: 'string',
      },
      authorized_user_id: 'string',
      billing_day: 0,
      closed_at_ms: 'string',
      currency: 'string',
      opened_at_ms: 'string',
      owner_user_id: 'string',
      permissions: [
        {
          access_level: 'INVALID',
          group: {
            family_group: 'FAMILY_INVALID',
            family_id: 'string',
          },
          user_id: 'string',
        },
      ],
      primaryId: 'account-0001',
      shard: 0,
      sub_accounts: [
        {
          closed_at_ms: 'string',
          context: {
            cash_advance: {},
            credit: {
              allow_foreign_charges: true,
            },
            crypto: {
              origin: {
                graduation: {
                  amount: {
                    currency: 'string',
                    value: 'string',
                  },
                  sponsored_account_id: 'string',
                  status: 'INVALID_GRADUATION_STATUS',
                },
              },
              transfer: {
                graduation: {
                  graduated_account_id: 'string',
                  graduated_sponsee_id: 'string',
                },
              },
            },
            deposit: {
              overdraft_protection: {
                amount: {
                  currency: 'string',
                  value: 'string',
                },
                enabled: true,
              },
            },
            installment: {
              apr: 'string',
              auto_pay: true,
              cash: {
                date: {
                  day: 0,
                  month: 0,
                  year: 0,
                },
              },
              installments: [
                {
                  amount_paid: {
                    currency: 'string',
                    value: 'string',
                  },
                  due_on: {
                    day: 0,
                    month: 0,
                    time_zone: 'string',
                    year: 0,
                  },
                  fee: {
                    currency: 'string',
                    value: 'string',
                  },
                  id: 'string',
                  paid_at_ms: 'string',
                  past_due_at_ms: 'string',
                  principal: {
                    currency: 'string',
                    value: 'string',
                  },
                  status: 'INVALID_INSTALLMENT_LOAN_STATUS',
                },
              ],
              loan_name: 'string',
              payment_schedule: 'SCHEDULE_NOT_SET',
              purchase: {
                amount: {
                  currency: 'string',
                  value: 'string',
                },
                category: {
                  category: 'string',
                  color: 'string',
                  group: 'string',
                  hide_location: true,
                  icon: {
                    fontAwesome: 'string',
                    url: 'string',
                  },
                  sub_category: 'string',
                },
                createdAtMs: 'string',
                merchant_logo_url: 'string',
                merchant_name: 'string',
                payment_id: 'string',
              },
              purchase_payment_id: 'string',
            },
            points: {},
            savings: {
              cover_image: {
                url: 'string',
                url_2x: 'string',
                url_3x: 'string',
              },
              goal: {
                currency: 'string',
                value: 'string',
              },
              icon_image: {
                url: 'string',
                url_2x: 'string',
                url_3x: 'string',
              },
              matching: [
                {
                  enabled_at_ms: 'string',
                  source_account_id: 'string',
                  user_id: 'string',
                },
              ],
              piggy_bank: true,
              round_up: true,
              title: 'string',
            },
            unsecured_credit: {
              active: true,
              auto_pay: {
                enabled: true,
                type: 'INVALID_AUTO_PAY_TYPE',
              },
              credit_limit: {
                currency: 'string',
                value: 'string',
              },
              is_interest_free: true,
              min_balance: {
                currency: 'string',
                value: 'string',
              },
              rollover_enabled: true,
              selected_credit_limit: {
                currency: 'string',
                value: 'string',
              },
            },
          },
          createdAtMs: 'string',
          id: 'string',
          type: 'INVALID_ACCOUNT_TYPE',
          updated_at_ms: 'string',
        },
      ],
      type: 'INVALID_PRIMARY_ACCOUNT_TYPE',
      updated_at_ms: 'string',
    },
    {
      account_number: 'string',
      ach_account: {
        account_number: 'string',
        routing_number: 'string',
      },
      authorized_user_id: 'string',
      billing_day: 0,
      closed_at_ms: 'string',
      currency: 'string',
      opened_at_ms: 'string',
      owner_user_id: 'string',
      permissions: [
        {
          access_level: 'INVALID',
          group: {
            family_group: 'FAMILY_INVALID',
            family_id: 'string',
          },
          user_id: 'string',
        },
      ],
      primaryId: 'account-0002',
      shard: 0,
      sub_accounts: [
        {
          closed_at_ms: 'string',
          context: {
            cash_advance: {},
            credit: {
              allow_foreign_charges: true,
            },
            crypto: {
              origin: {
                graduation: {
                  amount: {
                    currency: 'string',
                    value: 'string',
                  },
                  sponsored_account_id: 'string',
                  status: 'INVALID_GRADUATION_STATUS',
                },
              },
              transfer: {
                graduation: {
                  graduated_account_id: 'string',
                  graduated_sponsee_id: 'string',
                },
              },
            },
            deposit: {
              overdraft_protection: {
                amount: {
                  currency: 'string',
                  value: 'string',
                },
                enabled: true,
              },
            },
            installment: {
              apr: 'string',
              auto_pay: true,
              cash: {
                date: {
                  day: 0,
                  month: 0,
                  year: 0,
                },
              },
              installments: [
                {
                  amount_paid: {
                    currency: 'string',
                    value: 'string',
                  },
                  due_on: {
                    day: 0,
                    month: 0,
                    time_zone: 'string',
                    year: 0,
                  },
                  fee: {
                    currency: 'string',
                    value: 'string',
                  },
                  id: 'string',
                  paid_at_ms: 'string',
                  past_due_at_ms: 'string',
                  principal: {
                    currency: 'string',
                    value: 'string',
                  },
                  status: 'INVALID_INSTALLMENT_LOAN_STATUS',
                },
              ],
              loan_name: 'string',
              payment_schedule: 'SCHEDULE_NOT_SET',
              purchase: {
                amount: {
                  currency: 'string',
                  value: 'string',
                },
                category: {
                  category: 'string',
                  color: 'string',
                  group: 'string',
                  hide_location: true,
                  icon: {
                    fontAwesome: 'string',
                    url: 'string',
                  },
                  sub_category: 'string',
                },
                createdAtMs: 'string',
                merchant_logo_url: 'string',
                merchant_name: 'string',
                payment_id: 'string',
              },
              purchase_payment_id: 'string',
            },
            points: {},
            savings: {
              cover_image: {
                url: 'string',
                url_2x: 'string',
                url_3x: 'string',
              },
              goal: {
                currency: 'string',
                value: 'string',
              },
              icon_image: {
                url: 'string',
                url_2x: 'string',
                url_3x: 'string',
              },
              matching: [
                {
                  enabled_at_ms: 'string',
                  source_account_id: 'string',
                  user_id: 'string',
                },
              ],
              piggy_bank: true,
              round_up: true,
              title: 'string',
            },
            unsecured_credit: {
              active: true,
              auto_pay: {
                enabled: true,
                type: 'INVALID_AUTO_PAY_TYPE',
              },
              credit_limit: {
                currency: 'string',
                value: 'string',
              },
              is_interest_free: true,
              min_balance: {
                currency: 'string',
                value: 'string',
              },
              rollover_enabled: true,
              selected_credit_limit: {
                currency: 'string',
                value: 'string',
              },
            },
          },
          createdAtMs: 'string',
          id: 'string',
          type: 'INVALID_ACCOUNT_TYPE',
          updated_at_ms: 'string',
        },
      ],
      type: 'INVALID_PRIMARY_ACCOUNT_TYPE',
      updated_at_ms: 'string',
    },
  ],
}

export default accounts
