// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "xstate.init": { type: "xstate.init" };
    "xstate.stop": { type: "xstate.stop" };
  };
  invokeSrcNameMap: {
    establishConnection: "done.invoke.liveClient.connecting:invocation[0]";
    getProtocols: "done.invoke.liveClient.listenConfiguration.waitProtocols:invocation[0]";
    getRole: "done.invoke.liveClient.listenConfiguration.waitRole:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    assignProtocols: "MSG_PROTOCOLS";
    assignRole: "MSG_ROLE";
    emitConnection: "CONNECTION_ESTABLISHED";
    emitReady: "INIT_STREAM" | "xstate.stop";
  };
  eventsCausingServices: {
    establishConnection: "xstate.init";
    getProtocols: "CONNECTION_ESTABLISHED";
    getRole: "CONNECTION_ESTABLISHED";
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | "Idle"
    | "connecting"
    | "listenConfiguration"
    | "listenConfiguration.protocol"
    | "listenConfiguration.role"
    | "listenConfiguration.waitProtocols"
    | "listenConfiguration.waitRole"
    | "listenStream"
    | "listenStream.waitPlatform"
    | "listenStream.waitStreamPacket"
    | "listenSurface"
    | "listenSurface.waitSurfaces"
    | "setProtocol"
    | "setProtocol.tryDefaultProtocol"
    | "setProtocol.useFallbackProtocol"
    | {
        listenConfiguration?:
          | "protocol"
          | "role"
          | "waitProtocols"
          | "waitRole";
        listenStream?: "waitPlatform" | "waitStreamPacket";
        listenSurface?: "waitSurfaces";
        setProtocol?: "tryDefaultProtocol" | "useFallbackProtocol";
      };
  tags: never;
}
