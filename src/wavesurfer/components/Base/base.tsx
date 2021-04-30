import React, { Children, useEffect, useRef, useState } from "react";
import { JsxElement } from "typescript";
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from "wavesurfer.js/src/plugin/regions";
import styles from "./base.module.css";

interface IWavesurferConfig {
    container: string,
    waveColor: string,
    progressColor: string,
    plugins: Array<WaveSurfer.PluginDefinition>
}

interface IRegionConfig {
    start: number,
    end: number
}

interface IBaseRenderProp {
    playWave: () => void,
    playRegion: (region:WaveSurfer) => void,
    ready: boolean,
    wrapper: Element | undefined,
    wavesurfer: WaveSurfer | undefined,
    regions: Array<WaveSurfer>,
    setRegion: (config: IRegionConfig) => void,
}

const BaseRenderProp: React.FC<{ children: (data: IBaseRenderProp) => JSX.Element }> = ({ children }) => {

    const [ready, setReady] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [regions, setRegions] = useState<Array<WaveSurfer>>([]);

    const wrapperRef = useRef<Element>();
    const wavesurferRef = useRef<WaveSurfer>();
 

    //getters
    const { current: wrapper } = wrapperRef;
    const { current: wavesurfer } = wavesurferRef;

    //setters
    const setWrapper = (): void => {
        wrapperRef.current = document.querySelector("#waveform") || undefined;
    }
    const setWavesurfer = (config: IWavesurferConfig) => {
        if (wrapperRef.current) {
            wavesurferRef.current = WaveSurfer.create(config);
            wavesurferRef.current.on("ready", readyWave);
        }
    };
    const setRegion = (config: IRegionConfig) => {
        if (wrapperRef.current && wavesurferRef.current) {
            const region = wavesurferRef.current.addRegion(config);
            setRegions([...regions, region]);
        }
    }

    //methods
    const readyWave = () => {
        setReady(true);
    }
    const playWave = () => {
        wavesurfer?.playPause();
    }
    const playRegion = (region:WaveSurfer) => {
        region?.play();
    }

    //lifecycle
    const componentDidUpdate = () => {
        setWrapper();
        setWavesurfer({
            container: '#waveform',
            waveColor: 'violet',
            progressColor: 'purple',
            plugins: [
                RegionsPlugin.create({})
            ]
        });
        setMounted(true);
        return () => {
            wavesurfer?.destroy();
        }
    }

    const componentRender = () => (
        <div>
            <div className={styles.wavesurfer__timeline}>
                <div id="waveform"></div>
            </div>
            { children({
                playWave,
                playRegion,
                setRegion,
                ready,
                wrapper: wrapperRef.current,
                wavesurfer: wavesurferRef.current,
                regions
            })}
        </div>
    )

    useEffect(componentDidUpdate, []);
    return componentRender();
}


export default BaseRenderProp