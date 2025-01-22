import { AbilityBuilder } from '@casl/ability'
import { AppAbility } from '.'
import type { User } from './models'
import type { Role } from './roles'

// Tipo para cada role => define as regras
type PermissionsByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>,
) => void

export const permissions: Record<Role, PermissionsByRole> = {
  OWNER(_, { can }) {
    // Dono pode tudo, inclusive transfer ownership
    can('manage', 'all')
  },

  ADMIN(user, { can, cannot }) {
    // Admin pode quase tudo
    can('manage', 'all')
    // mas se quiser proibir transfer ownership
    cannot('transfer_ownership', 'Organization')
  },

  MEMBER(user, { can, cannot }) {
    // Exemplo:
    // Só pode 'read' e 'create' Payment se organizationId === user.organizationId
    can(['read', 'create'], 'Payment', {
      organizationId: { $eq: user.organizationId },
    })
    // impede deletar Payment de qualquer org
    cannot('delete', 'Payment')

    // Exemplo: read/update Product da mesma org
    can(['read', 'update'], 'Product', {
      organizationId: { $eq: user.organizationId },
    })
    // E assim por diante
  },

  CUSTOMER(_, { can }) {
    // Um “cliente” que acessa o checkout...
    // Pode 'read' Product (p. ex. ver o catálogo)
    can('read', 'Product')
    // Pode 'create' Payment para si mesmo? Depende do seu fluxo
    can('create', 'Payment')
  },

  BILLING(_, { can }) {
    // Role que gerencia somente o Billing
    can('manage', 'Payment')
    // can('manage', 'Invoice') // se tiver subject “Invoice”
  },
}
