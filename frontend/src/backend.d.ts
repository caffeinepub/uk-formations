import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface FormationOrderInput {
    customerName: string;
    additionalDetails: string;
    businessName: string;
    formationType: string;
    contactEmail: string;
}
export interface SubmissionResponse {
    orderId: bigint;
    confirmationMessage: string;
}
export interface UserProfile {
    name: string;
}
export interface FormationOrder {
    id: bigint;
    customerName: string;
    additionalDetails: string;
    businessName: string;
    formationType: string;
    contactEmail: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllOrders(): Promise<Array<FormationOrder>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getOrderById(orderId: bigint): Promise<FormationOrder | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitFormationOrder(orderInput: FormationOrderInput): Promise<SubmissionResponse>;
}
