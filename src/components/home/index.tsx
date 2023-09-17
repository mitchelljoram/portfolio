import { useState, useEffect } from 'react';
import {Basic} from './basic';
import {ParticlePhysics} from './particlePhysics';
import {Hello} from './hello';

export function Home(props) {

    let random = Math.floor(Math.random()*2);

    if (random === 0) {
        return (
            <div>
                <Hello/>
                <ParticlePhysics {...props}/>
            </div>
        );
    }
    return (
        <div>
            <Hello/>
            <Basic {...props}/>
        </div>
    );
}
