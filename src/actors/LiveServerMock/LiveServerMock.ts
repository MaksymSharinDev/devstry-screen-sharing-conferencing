import { createMachine } from 'xstate';
const LiveServerMockMachine = createMachine({
    id: 'LiveServerMock',
    tsTypes: {} as import("./LiveServerMock.typegen").Typegen0,
    schema: {
        context: {} as {
            config: {}
        },
        events: {} as { type: 'eventType' },
    },
    context: {
        config: {},
    },
    initial: 'initialState',
    states: {
        initialState: {},
    },
});

export default LiveServerMockMachine;