import { WebSocket, Server, Client } from "mock-socket"
import { COMMAND, ProtocolsPayload, RolePayload } from "../sdk/commands";
import { ROLE, SCREEN_SHARE_PROTOCOL } from "../sdk/enums";


export class ClientConnection {

    private _socket: WebSocket;

    private _serverMock: Server
    private _serverSideSocket: Client | null = null;
    private _serverDelay = 500;

    private serverMockLogger(message: string) {
        console.log("[MOCK SERVER] - ", message);
    }
    constructor() {
        this._serverMock = new Server("ws://localhost:8080");
        this._socket = new WebSocket('ws://localhost:8080');
    }
    async startConnection() {
        this._serverMock.on("connection", socket => {
            this.serverMockLogger("Connection established");
            this._serverSideSocket = socket;
        });
        this._socket.onopen = () => {
            return
        };
    }
    endConnection() {
        this._socket.close();
    }

    async listenRole(callback: (role: ROLE) => void) {
        const socket = this._socket
        // @ts-ignore
        socket.addEventListener('message', function (event: MessageEvent<string>) {
            const data = JSON.parse(event.data);
            if (data.command === COMMAND.ROLE) {
                const { role } = data.payload as RolePayload;
                // @ts-ignore
                socket.removeEventListener("message", this);
                callback(role)
            }
        });

        setTimeout(() => {
            this._serverSideSocket?.send(JSON.stringify({
                command: COMMAND.ROLE,
                payload: {
                    role: ROLE.PRESENTER
                }
            }))
            this.serverMockLogger("Sent role")
        }, this._serverDelay)
    }
    async listenProtocols(callback: (protocols: SCREEN_SHARE_PROTOCOL[]) => void) {
        const socket = this._socket
        // @ts-ignore
        socket.addEventListener('message', function (event: MessageEvent<string>) {
            const data = JSON.parse(event.data);
            if (data.command === COMMAND.PROTOCOLS) {
                const { protocols } = data.payload as ProtocolsPayload;
                // @ts-ignore 
                socket.removeEventListener("message", this);
                callback(protocols)
            }
        });

        setTimeout(() => {
            this._serverSideSocket?.send(JSON.stringify({
                command: COMMAND.PROTOCOLS,
                payload: {
                    protocols: [
                        SCREEN_SHARE_PROTOCOL.VNC,
                        SCREEN_SHARE_PROTOCOL.WEBRTC
                    ]
                }
            }))
            this.serverMockLogger("Sent protocols")
        }, this._serverDelay)
    }


};
