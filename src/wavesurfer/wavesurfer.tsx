import React, { useEffect, useRef, useState } from "react";
import Base from "./components/Base";
import Input from "./components/Input";
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from "wavesurfer.js/src/plugin/regions";
import styles from "./wavesurfer.module.css";

const Wavesurfer: React.FC = () => {

    const onLoadSound = (wavesurfer: WaveSurfer | undefined) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target } = e;
        const { files } = target;
        if (files?.length) {
            const file = files[0];
            wavesurfer?.loadBlob(file);
        }
    }

    return (
        <div>
            <Base>{({ ready, playRegion, playWave, setRegion, regions, wavesurfer }) => {

                return (
                    <div>
                        { ready ? (
                            <div>
                                <button onClick={playWave}>
                                    play/pause
                                </button>


                                <button onClick={() => playRegion(regions[regions.length - 1])}>
                                    play region
                                </button>

                                <button onClick={() => {
                                    setRegion({
                                        start: 1,
                                        end: 3
                                    })
                                }}>set region</button>

                            </div>
                        ) : null}
                        <Input onLoadSound={onLoadSound(wavesurfer)} />
                    </div>
                )
            }}</Base>
        </div>
    )
}

export default Wavesurfer
