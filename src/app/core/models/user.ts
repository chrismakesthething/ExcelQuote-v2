export interface Roles {
    salesRep?: boolean;
    // editor?: boolean;
    admin?: boolean;
}

export interface User {
    uid: string;
    email: string;
    roles: Roles;
}
