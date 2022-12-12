import { ROLE, SCREEN_SHARE_PROTOCOL } from "./enums";

// All commands 

export enum COMMAND {
  ROLE = "ROLE",
  PROTOCOLS = "PROTOCOLS"
}

export interface PacketBody{
    command: COMMAND,
    payload: Object
}


export interface RolePayload {
    role: ROLE
}

export interface ProtocolsPayload {
    protocols: SCREEN_SHARE_PROTOCOL[]
}