import { createMachine } from "xstate"
import { ROLE, SCREEN_SHARE_PROTOCOL } from "../../sdk/enums"
import liveClientMachine from "../LiveClient/LiveClientMachine";
import { READY_EVENT, CONNECTION_EVENT } from "./events";
const app =
  /** @xstate-layout N4IgpgJg5mDOIC5QEMAOqB0BhA9gOzzAGMAXASzygGIsB5AOXoFEsAVASQYG0AGAXUShUOWGXL5BIAB6IAzAFYAjBgU8esgCyyATDwBsAdh4GANCACeiRcYxrZi7QA4eATg0b1ixQF9vZtJgA6shiAMpgJOSUsFQASkwAggAiAJq8AkggwqLieJIyCHp6shgaetryso7yai7yBnpmlgjWBraeTq7unj6+Zng4EHCSAZLZYmQSmQUAtI0WiHPtahoGsi56LvpV2n0gAdj4hKQUUGMiE1OgBRraTYiOJYry5doub+Vr2r3+6Id4ADMwAAnMB4IhgABqZDAAHdzjlJnlpogDA0MO8avY9LcXLIeHcFi19BgDFoDE5dNoydSDHsDsEwhEolB4Jlxrl8oglHoVGoeJUtvJ5LdTETrLyybIKY4qTS0b5fEA */
  createMachine({
    context: {
      role: ROLE.UNSELECTED,
      screenShareProtocol: SCREEN_SHARE_PROTOCOL.UNSELECTED,
    },
    tsTypes: {} as import("./AppMachine.typegen").Typegen0,
    schema: {
      context: {} as {
        role: ROLE;
        screenShareProtocol: SCREEN_SHARE_PROTOCOL;
      },
      events: {} as
        CONNECTION_EVENT |
        READY_EVENT
    },
    predictableActionArguments: true,
    id: "app",
    initial: "Connecting",
    states: {
      Connecting: {
        invoke: {
          src: "Connect",
          id: "LiveClientMachine"
        },
        on: {
          CONNECTION: {
            target: "WaitSettings",
          },
        },
      },
      ConferenceView: {},
      WaitSettings: {
        on: {
          READY: {
            target: "ConferenceView",
          },
        },
      },
    },
  }, {
    actions: {
    },
    services: {
      Connect: liveClientMachine,
      //RunMockServer: //LiveServerMock
    }
  })

export default app