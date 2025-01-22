import { z } from 'zod'

import {
  checkoutSubject,
  gatewayTransactionSubject,
  paymentSubject,
  productSubject,
  userSubject,
  inviteSubject,
  billingSubject,
  metricSubject,
  organizationSubject,
} from './subjects'

export const appAbilitiesSchema = z.union([
  userSubject,
  checkoutSubject,
  paymentSubject,
  productSubject,
  gatewayTransactionSubject,
  organizationSubject,
  inviteSubject,
  billingSubject,
  metricSubject,
  z.tuple([z.literal('manage'), z.literal('all')]),
])
