import {EntityOperationType} from '../../models/User';
import {
  AttributePermissionValue,
  EffectivePermsInfo,
  EntityAttrPermissionValue,
  EntityPermissionValue,
  Permission,
  PermissionUser,
} from './model';

export function getAttributePermission(
  entityName: string,
  attributeName: string,
  perms?: PermissionUser,
): EntityAttrPermissionValue {
  if (!perms) return 'DENY';
  const {entityAttributes} = perms;
  // find strict perm match 'car:engine'
  const explicitPerm: Permission<AttributePermissionValue> =
    entityAttributes.find(
      perm => perm.target === `${entityName}:${attributeName}`,
    ) as Permission<AttributePermissionValue>;
  if (explicitPerm != null)
    return convertAttributePermValue(explicitPerm.value);

  return 'DENY';
}
function convertAttributePermValue(
  val: AttributePermissionValue,
): EntityAttrPermissionValue {
  switch (val) {
    case 2:
      return 'MODIFY';
    case 1:
      return 'VIEW';
    default:
      return 'DENY';
  }
}
// export function isOperationAllowed(
//   entityName: string,
//   operation: EntityOperationType,
//   perms?: EffectivePermsInfo,
// ): boolean {
//     if(!perms) return false;
//     const {entities} = perms;
//     const explicitTerm:Permission<EntityPermissionValue>= entities.find
// }
export const hasAnyAuthority = (
  authorities: [] | undefined,
  hasAnyAuthorities: string[],
) => {
  if (authorities === hasAnyAuthorities) {
    return true;
  }
  return false;
};
