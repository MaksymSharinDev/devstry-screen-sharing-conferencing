import { assign, createMachine, } from 'xstate';
import { CONNECTION_ESTABLISHED, INIT_STREAM, MSG_PROTOCOLS, MSG_ROLE } from './events';
import { ClientConnection } from '../../models/ClientConnection';
import { sendParent } from 'xstate/lib/actions';
import { ROLE, SCREEN_SHARE_PROTOCOL } from '../../sdk/enums';
import { CONNECTION_EVENT, READY_EVENT } from '../App/events';


const liveClientMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBsCWA3MBhNYB2ALgHQDGA9nnmCQanlAMRYDyAcqwKJYAqAkmwH0OAZW4BBAEIAZXsIASHACIBtAAwBdRKAAOZWKloUtIAB6IATAGYA7EUsBOAGwAOa5dXvrAFgCMzxwA0IACeiF5ORG7WAKzWjo4+0aqqVtEAvmlBaJg4qPjEaLAE+FgUAGaoUACuAE4AhoZ4DBAUYERFDW3Z2LiERIXFeKV4FdX1jWqaSCC6+o3GZgj20V5EqvFx7v7OPr5BoQjWPj5E5o4O9j7msdH2zumZIN25+f2oRSXllbUNqBREAHc6gYAEpkZBgBgAWWEAHEBCDmFIOJNjLMDH88AtEDZHKcnOZ7F5rM51tFzF59ogSZY1pZotFLOFnPZVMsMlkMD08n0Bp8Rt9xpjAcCCAAFGpkAhkcjIWDQuECMWI7jMFhSYSo6bo+bTRZM+xELzOGwmolnRI+KkIFmqIg+DbOKw+azrcwcp5cl59XgQCEMXisXjcASiEEcMRQrU6PQYox6xD2Sx48yqNw7ZxO7yqZzWpx2xweczF8kkinODKPPBkCBwYzPXoENGx3WgRZeaJ2VzhIus3wJa3mVz2-xeIdpnxu92PBs84jkSjUWj0ZtzTHYhAUw3Gq7nPxHYv0624uxjxwkidTj2z158oZfMa-eMxtfP0yJ2mWbusyyE1T9q0QkQRx7HMe0LWiTNXSOaxp05HJGzeD57wFR9GhFUFwTAVc4yxBMEF2T8rhJcJoj8FZXGtEkTiHCkc1cCdYOvL1ELvYZRh+dCgQMCUpRlcF4G1Ft13w3YTi-bwfz-ftrUzZwjR8ZMvy8LwmUnB54O5W93kGdjBSfPAiElCEcNbd8EFuPEe3OUtGXpSxZP-OxzkcMdVFuJMGWYhC5yQ3SH044VtElaVZVMkS20QSyjVZGzzBiSx7LzY4YuNexYLZYtM28rTeR0-BhAIGowDqABbcK331ZxViZLxHHJdKrH-aJrUnV0iCcWDGQpF0PGsHLvQKfK8EK4qyow8VkAaMoyBqcqhNfPDIoQVSwNq+rCVg9wO1ah07SuelJ3sY6vxWAbWOG0aStKiarrKsU6hIABrMAmwW3CN0LWxYMaxIx0S9LdsLcD6SLXxXRsc7fLvYRajKR7sPeszFknNbCzOfwXDs8xWrTO1OuuA93JU-qZxY6HLrhhHbqpkg6yRiLzMSO1kxSFx4nuRKcaAgi9pBpIiZWYkodeWBXt40LwQqpbzP8TtHCa-9MbTOJccSux0sg1QfCTXY4hFvoxfFEL+OQIgiuCRQwHhqpkGNviwoZyrE1TOwVisFkEmdXMeeOYsiAZL8XCZbXU0sA3iCNiXTaIKoxYAMTqZBkAAI0ep7o8dl8Pvwy5aQV9wlfiFXAl9nX5LZS5UYxhJSc0waiF9EynZlxZQM7NNQK8bXvBscxAIOaqwK9jx7MsSdssrIA */
  createMachine({
  context: {
    clientConnection: new ClientConnection(),
    role: ROLE.UNSELECTED,
    protocols: [] as SCREEN_SHARE_PROTOCOL[],
  },
  tsTypes: {} as import("./LiveClientMachine.typegen").Typegen0,
  schema: {
    context: {} as {
      clientConnection: ClientConnection;
      role: ROLE;
      protocols: SCREEN_SHARE_PROTOCOL[];
    },
    services: {} as {
      establishConnection: { data: {} };
      getRole: { data: {} };
      getScreenShareProtocol: { data: {} };
    },
    events: {} as
      | CONNECTION_ESTABLISHED
      | INIT_STREAM
      | MSG_PROTOCOLS
      | MSG_ROLE,
  },
  id: "liveClient",
  initial: "connecting",
  states: {
    connecting: {
      invoke: {
        src: "establishConnection",
      },
      on: {
        CONNECTION_ESTABLISHED: {
          target: "listenConfiguration",
          actions: "emitConnection",
        },
      },
    },
    listenConfiguration: {
      type: "parallel",
      states: {
        waitRole: {
          invoke: {
            src: "getRole",
          },
          on: {
            MSG_ROLE: {
              target: "role",
              actions: "assignRole",
            },
          },
        },
        waitProtocols: {
          invoke: {
            src: "getProtocols",
          },
          on: {
            MSG_PROTOCOLS: {
              target: "protocol",
              actions: "assignProtocols",
            },
          },
        },
        role: {
          type: "final",
        },
        protocol: {
          type: "final",
        },
      },
      onDone: {
        target: "Idle",
      },
    },
    listenStream: {
      type: "parallel",
      states: {
        waitPlatform: {},
        waitStreamPacket: {},
      },
    },
    listenSurface: {
      type: "parallel",
      states: {
        waitSurfaces: {},
      },
    },
    setProtocol: {
      initial: "tryDefaultProtocol",
      states: {
        tryDefaultProtocol: {},
        useFallbackProtocol: {},
      },
    },
    Idle: {
      exit: "emitReady",
      on: {
        INIT_STREAM: {
          target: "setProtocol",
        },
      },
    },
  },
}, {
    services: {
      establishConnection: async (ctx, _event) => async (callback, _onEvent) => {
        console.log("Establishing connection");
        await ctx.clientConnection.startConnection()
        callback({
          type: "CONNECTION_ESTABLISHED",
          data: {},
        });
        return () => {
          ctx.clientConnection.endConnection();
        }
      },
      getRole: (ctx, _event) => (callback, _onEvent) => {
        ctx.clientConnection.listenRole((role) =>
          callback({
            type: "MSG_ROLE",
            data: { role },
          })
        );
      },
      getProtocols: (ctx, _event) => (callback, _onEvent) => {
        ctx.clientConnection.listenProtocols(protocols =>
          callback({
            type: "MSG_PROTOCOLS",
            data: { protocols }
          })
        );
      }
    },
    actions: {
      emitConnection: sendParent((ctx) => ({
        type: "CONNECTION"
      } as CONNECTION_EVENT)),
      emitReady: sendParent((ctx) => ({
        type: "READY"
      } as READY_EVENT)),
      assignRole: assign({
        role: (_ctx, event) => event.data.role,
      }),
      assignProtocols: assign({
        protocols: (_ctx, event) => event.data.protocols,
      }),
    }
  });

export default liveClientMachine