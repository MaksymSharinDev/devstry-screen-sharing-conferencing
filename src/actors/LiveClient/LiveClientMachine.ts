import { assign, createMachine } from 'xstate';
import { ROLE, SCREEN_SHARE_PROTOCOL } from '../../sdk/enums';
import { LiveClient } from '../../services/LiveClient';
import { INIT_STREAM_EVENT } from './events';
const liveClientMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBsCWA3MBhNYB2ALgHQDGA9nnmCQanlAMQQVhF3pkDWramOq+YuUrVa9BOzIkAhrQoBtAAwBdJcsSgADmVio5eDSAAeiAEwBOc0QCMAVkWK752wA5bpgCwBmADQgAnoi2XqY21uYe5l7OAOxeMaa2AL5JfrzYuIREaLAE+FgUAGaoUACuAE6yqBRMLES5sjwYGQJZOXl4BXjFZZX6aobauvqGJgjOHkSKAGzTMTEz04r2Lr4BiAsuRPGmM4petjHmMS4xKWnN-ILZqLn5RSUVVRREAO7SegBKZMhgtVRsPAcbg3PiZYjte7dR59ap4N4fAjfX4SIFSZ54NQDJAgIZ6OGjRAHaxEUynewnUymawxazLPyBBAuRSTLwuFzTWy2OymI7zc4gdJXNq3DpdHpPfQIvQABXKZAIUh+sH+rEkIKF4Jud06D16GOlBDlCqVyFgqI4Mn6KmxWh0+IohIQxNJ5MUlOptPp63G1hJ3MsLPdq325gFmtaxAAkhBfgwowA5KMAFQA+gBlZOfACiAEEALK23H2kY4sZRaak93xcw0mJLcIMxDmUxeUnWNx2NnWeLTLwpVIgPBkCBwQwRwSDEsEsuIDy2banSL7Cws6zTaxN53WULhFxRWIeE598OXLXCKg0OhQKfDGegMZeFlTFw76Yt8wzNlbjyObZc8JFF5Zkog8aZTzBSNtTFPVJXvYs70dWdxjbNkYmXEJPw8ddNx9aYPEmZw-Ww1t13mDwIJaa5IV1aF9Sld4vh+MBbwdAxkJpUJ8PiSJjxOJ9TC3E4STJVt925I4WVMSjhQhUUoQlWEXkYo15UVcgzVY0sH0QaxsMXdDP0wtdpi3dktmwrw+xcAivGw5YZK1GjxRhA15V+LT4LGWxORseJ3CiKzFHMfczOfKyrI8XZbEsA5wMHCcRR1Fz6LhIhNDU01PKQnSEB8hcexiAKvCCkLzC3WsSUiDx92CtwCI7RyoJo9MCHKMBpAAW2y9jcrZVkCM5CwEifectzpBYiHMOZEkSNlojmJrqPkvBWvarrDRlZBZEKMhym6nE8W04w5xCbZBoCkaWVscb10UGxW25YLYvqpako6NaOs6w1Pq6mVpBIbgCB6p0lhiIgEmOalbCikrjlupYHoOFdsIWeI3rknV0wqQoAZYw7pxyk6EDpUIgtMaYOUp4IQnG917umhIfNR1t0Ix6D8Gx8pcZIVgVK5nmxwJxDeuJux7vJynZjcErBJ9P1EZ3ZHaWigizgSs8oNgMBVJNDSQeQjkF2mVsHBq2Z3XrOnfym-ce3pmWivZ7XdfUn4iDa-wABEwFx0pkFdrLhbYp0WwlmHPAOetKaiW6nxsedu2wjsCOSDXIOuF3jTd5AiFKbWADFpGQZAACMAc4bOg7tEXQ57IgTafFkqct0z5cAmxHD7USWwIij06orIYw84PjvLDsiDA5YdxOZxHDWRlJIblwxMUVYTfygckiAA */
  createMachine({
    context: { liveClient: new LiveClient() },
    tsTypes: {} as import("./LiveClientMachine.typegen").Typegen0,
    schema: {
      context: {} as {
        liveClient: LiveClient ;
      },
      services: {} as {
        establishConnection: {
          data: {};
        };
        getRole: {
          data: {
            role: ROLE;
          };
        };
        getScreenShareProtocol: {
          data: {
            screenShareProtocol: SCREEN_SHARE_PROTOCOL;
          };
        };
      },
      events: {} as INIT_STREAM_EVENT,
    },
    id: "liveClient",
    initial: "connecting",
    states: {
      connecting: {
        invoke: {
          src: "establishConnection",
          onDone: [
            {
              target: "listenConfiguration",
              actions: "shareInstance",
            },
          ],
        },
      },
      listenConfiguration: {
        entry: "setSocket",
        type: "parallel",
        states: {
          waitRole: {
            invoke: {
              src: "getRole",
              onDone: [
                {
                  target: "role",
                },
              ],
            },
          },
          waitProtocols: {
            invoke: {
              src: "getProtocols",
              onDone: [
                {
                  target: "protocol",
                },
              ],
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
        entry: "emitReady",
        on: {
          INIT_STREAM: {
            target: "setProtocol",
          },
        },
      },
    },
  }, {
    services: {
      establishConnection: async (ctx) => {
        
        await ctx.liveClient.connect()
        return {}
      }
    },
    actions: {
    }
  });

export default liveClientMachine