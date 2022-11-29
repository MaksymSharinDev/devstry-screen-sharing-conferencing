// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.liveClient.connecting:invocation[0]": {
      type: "done.invoke.liveClient.connecting:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    establishConnection: "done.invoke.liveClient.connecting:invocation[0]";
    getProtocols: "done.invoke.liveClient.listenConfiguration.waitProtocols:invocation[0]";
    getRole: "done.invoke.liveClient.listenConfiguration.waitRole:invocation[0]";
  };
  missingImplementations: {
    actions: "shareInstance" | "setSocket" | "emitReady";
    services: "getRole" | "getProtocols";
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    emitReady: "done.state.liveClient.listenConfiguration";
    setSocket: "done.invoke.liveClient.connecting:invocation[0]";
    shareInstance: "done.invoke.liveClient.connecting:invocation[0]";
  };
  eventsCausingServices: {
    establishConnection: "xstate.init";
    getProtocols: "done.invoke.liveClient.connecting:invocation[0]";
    getRole: "done.invoke.liveClient.connecting:invocation[0]";
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
