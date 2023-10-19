import birthday from '../style/images/birthday2.jpg'
import cake from '../style/images/cake.jpg'
import Celebrants from './Celebrants'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { birthdayCelebrants } from '../services/LandingPageAPI';
import React, {useState, useEffect} from 'react'
import moment from 'moment-timezone';

import { CardActionArea } from '@mui/material';
import { capitalizeWords } from '../utils/global';
import NIPPON from '../style/images/nippon.jpg'

const CardA = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const [birthdayCeleb, setBirthdayCeleb] = useState([])

    useEffect(() => {
        const getBirthday = async() => {
            const birthdayData = await birthdayCelebrants()
            setBirthdayCeleb(birthdayData)
        }
        getBirthday()
    }, [])

    return (
        <Box sx={{ minWidth: 275, mb: 2}}>
            <Card variant="outlined" sx={{borderRadius: '10px', mb: 2}}>
                <CardContent sx={{paddingBottom: 0}}>
                    <Stack direction="row" spacing={2} sx={{alignItems: 'center'}} mb={2}>
                        <Avatar alt="Remy Sharp" src={cake} />
                        <div>
                            <Typography variant="body2" sx={{fontSize: '14px'}}>
                                Today's Birthday Celebrant\s
                            </Typography>
                            <Typography variant="subtitle1" sx={{fontSize: '14px'}}>
                                {moment(Date.now()).format('MMMM DD, YYYY')}
                            </Typography>
                        </div>
                    </Stack>
                    {birthdayCeleb.length > 0 ? birthdayCeleb.map((bday, index) => (
                        <Celebrants key={index} name={`${capitalizeWords(bday.LastName)}, ${capitalizeWords(bday.FirstName)}`} img={"test"} birthday={moment(bday.Birthday).tz('Asia/Manila').format('DD')}/>
                    )) : undefined}
                </CardContent>
                <CardMedia component={"img"} image={birthday} alt='birthday' width={'auto'} height={'auto'}/>
            </Card>
            <Card variant="outlined" sx={{ borderRadius: '10px' }}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    height="140"
                    image={NIPPON}
                    alt="green iguana"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Change of Company Name
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{textAlign: 'justify'}}>
                        Effective August 1, 2012, our company name has been changed from <span style={{fontWeight: 'bolder'}}>NITTETSU CORPORATION PHILIPPINES</span>
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>
    )
}

export default CardA