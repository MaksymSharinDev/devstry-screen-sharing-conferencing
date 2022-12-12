import { Event } from "xstate";

interface CONNECTION_EVENT extends Event {
    type: "CONNECTION";
}

interface READY_EVENT extends Event {
    type: "READY";
}