import { Event } from "xstate";
import { ClientConnection } from "../../models/ClientConnection";
import { SCREEN_SHARE_PROTOCOL } from "../../sdk/enums";

interface CONNECTION_ESTABLISHED extends Event {
    type: "CONNECTION_ESTABLISHED";
    data: {}
}

interface INIT_STREAM extends Event {
    type: "INIT_STREAM",
    data: {}
}

interface MSG_PROTOCOLS extends Event {
    type: "MSG_PROTOCOLS",
    data: {
        protocols: SCREEN_SHARE_PROTOCOL[],
    }
}

interface MSG_ROLE extends Event {
    type: "MSG_ROLE",
    data: {
        role: ROLE
    }
}
