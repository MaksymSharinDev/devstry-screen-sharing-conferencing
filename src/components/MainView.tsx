
import { useMachine } from '@xstate/react';
import { useEffect, useRef } from 'react';

import PresenterOverlay from './organisms/PresenterOverlay';
import Connecting from './atoms/Connecting';

import appMachine from '../actors/App/AppMachine';
import { ROLE } from '../sdk/enums';


const MainView = () => {


    const [state, transition, interpreter] = useMachine(appMachine,{
        devTools: true,
    });

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const initCanvas = () => { canvasRef.current?.getContext('2d')?.clearRect(0, 0, 1000, 1000); };

    useEffect(() => {
        initCanvas();
    }, []);


    return (<>
        {state.matches('Connecting') &&
            <Connecting />
        }
        <canvas ref={canvasRef} className="w-100 h-100" />
        {state.matches('ConferenceView') &&
            state.context.role === ROLE.PRESENTER &&
            <PresenterOverlay />
        }
    </>
    );
}


export default MainView;