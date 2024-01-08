import React, {useMemo} from 'react';

import Lottie from "react-lottie";
import animationData from "../lotties/passive_logic_homework_lottie.json";



const LottieRenderer: React.FC = () => {


    const lottieOptions = useMemo(() => ({
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }), []);

    return (
        <div className='lottie__container' aria-label="Temperature animation">
            <Lottie
                options={lottieOptions}
                height={600}
                width={885}
            />
        </div>
    );


};

export default LottieRenderer;
