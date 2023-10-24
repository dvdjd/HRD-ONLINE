import React, { useEffect, useState } from 'react'
import CardD from "../components/CardD"
import CardE from '../components/CardE'
import style from '../style/style.module.css'
import { useParams } from 'react-router-dom'
import { getUploadItems } from '../services/LandingPageAPI'
const PDF = () => {
    const [pdfArr, setPdfArrr] = useState([])
    const [selectedPdf, setSelectedPdf] = useState("")
    const handleSetSelectedPdf = (p) => {
        setSelectedPdf(p)
    }
    const handleAddPdf = (newElem) => {
        setPdfArrr([newElem, ...pdfArr])
    }
    const {cat} = useParams()
    useEffect(() => {
        const getPDF = async () => {
            const gPdf = await getUploadItems({type: cat})
            setPdfArrr(gPdf.data)
        }
        getPDF()
    }, [])
  return (
    <>
        <br /><br /><br /><br />
        <div className={style['flex-container']}>
            <div className={`${style["flex-item"]} ${style["small"]}`}>
                <CardD categ={pdfArr} handleAddCateg={handleAddPdf} handleSelectFile={handleSetSelectedPdf}/>
            </div>
            <div className={`${style["flex-item"]} ${style["large"]}`}>
                <CardE pdfFile={selectedPdf}/>
            </div>
        </div>
    </>
  )
}

export default PDF