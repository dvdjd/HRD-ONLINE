import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import { Worker, Viewer} from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { fullScreenPlugin, RenderEnterFullScreenProps  } from '@react-pdf-viewer/full-screen';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import { useParams } from 'react-router-dom';

const CardE = ({pdfFile}) => {
    const newplugin = defaultLayoutPlugin()
    const {cat} = useParams()
    const fullScreenPluginInstance = fullScreenPlugin()
    const { EnterFullScreen } = fullScreenPluginInstance
    const zoomPluginInstance = zoomPlugin()
    const { Zoom } = zoomPluginInstance
    const [pdf, setPdf] = useState("")
    const [pdfKey, setPdfKey] = useState(0)
    const handleSetPdf = (p) => {
        setPdfKey((prev) => prev + 1)
        setPdf(p)
    }
    useEffect(() => {
        pdfFile === "" ? undefined : handleSetPdf(pdfFile.uploadName)
    }, [pdfFile])
    return (
        <>
            <Box sx={{ minWidth: 275, mb: 2, height: "95%"}}>
                <Card variant="outlined" sx={{borderRadius: '10px', mb: 2, height: "100%"}}>
                    <CardContent sx={{paddingBottom: 0, height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                        {pdf === "" ? (<h1>Please select from the left</h1>) : (
                            <div className="pdf-container" style={{width: '100%', height: '95%'}}>
                                {cat !== "forms" ? (
                                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                        <EnterFullScreen />
                                        <Zoom />
                                    </div>
                                ) : undefined}
                                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                    <Viewer key={pdfKey} fileUrl={`http://192.168.5.3:4000/hr_uploads/${pdf}`} defaultScale={1} plugins={cat === "forms" ? [newplugin] : [zoomPluginInstance, fullScreenPluginInstance]} />
                                </Worker>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </Box>
        </>
    )
}

export default CardE