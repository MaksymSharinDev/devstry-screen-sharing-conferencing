import { ROLE } from "./enums";

// All commands 
export enum COMMAND {
    CONNECTION = "CONNECTION",
    INVALID_PACKET = "INVALID_PACKET",
    ROLE = "ROLE"
}

export interface PacketBody{
    command: COMMAND,
    payload: Object
}


export interface RolePayload {
    role: ROLE
}