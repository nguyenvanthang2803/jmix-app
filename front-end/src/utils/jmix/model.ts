export type EntityOperationType = 'create' | 'read' | 'update' | 'delete';

export type EntityAttrPermissionValue = 'DENY' | 'VIEW' | 'MODIFY';

export type AttributePermissionValue = 0 | 1 | 2;
export type EntityPermissionValue = 0 | 1;
export type SpecificPermissionValue = 0 | 1;

export interface EffectivePermsLoadOptions {
  entities: boolean;
  entityAttributes: boolean;
  specifics: boolean;
}

export interface Permission<
  T extends
    | AttributePermissionValue
    | EntityPermissionValue
    | SpecificPermissionValue,
> {
  target: string;
  value: T;
}
export interface EffectivePermsInfo {
  entites: Array<Permission<EntityPermissionValue>>;
  entityAttributes: Array<Permission<AttributePermissionValue>>;
  specifies: Array<Permission<SpecificPermissionValue>>;
}
export interface PermissionUser {
  authorities: [];
  entites: Array<Permission<EntityPermissionValue>>;
  entityAttributes: Array<Permission<AttributePermissionValue>>;
  specifies: Array<Permission<SpecificPermissionValue>>;
}
