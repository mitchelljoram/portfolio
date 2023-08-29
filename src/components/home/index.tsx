import {Basic} from './basic';
import {ParticlePhysics} from './particlePhysics';

export function Home(props) {
    let random = Math.floor(Math.random()*2);

    if (random === 0) {
        return (
            <div>
                <ParticlePhysics {...props}/>
            </div>
        );
    }
    return (
        <div>
            <Basic {...props}/>
        </div>
    );
}
