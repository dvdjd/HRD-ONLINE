import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import React, {useState, useEffect} from 'react'
import style from '../style/style.module.css'
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Me from '../style/images/me.png'

const MVC = () => {
    
    return (
        <>  
            <br /><br /><br /><br />
            <div className={style['flex-container']}>
                <div className={`${style["flex-item"]} ${style["small"]}`}>
                <Box sx={{ minWidth: 275, mb: 2, height: "90%"}}>
                    <Card variant="outlined" sx={{borderRadius: '10px', mb: 2, maxWidth: 345}}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={Me}
                                alt="green iguana"
                            />
                            <CardContent >
                                <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Box>
                </div>
                {/* <div className={`${style["flex-item"]} ${style["large"]}`}>
                    <CardE pdfFile={selectedPdf}/>
                </div> */}
            </div>
        </>
    )
}

export default MVC