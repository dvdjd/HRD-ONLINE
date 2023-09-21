import CardACSS from './CardACSS.module.css'
import birthday from '../style/images/birthday2.jpg'
import cake from '../style/images/cake.jpg'
import Celebrants from './Celebrants'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Me from '../style/images/me.png'
import Box from '@mui/material/Box';
const CardA = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    return (
        <Box sx={{ minWidth: 275, mb: 2}}>
            <Card variant="outlined" sx={{borderRadius: '10px'}}>
                <CardContent sx={{paddingBottom: 0}}>
                    <Stack direction="row" spacing={2} sx={{alignItems: 'center'}} mb={2}>
                        <Avatar alt="Remy Sharp" src={cake} />
                        <div>
                            <Typography variant="body2" sx={{fontSize: '16px'}}>
                                {months[(new Date()).getMonth()]} Birthday Celebrants\s
                            </Typography>
                        </div>
                    </Stack>
                    <Celebrants name={"Erato, Jhobert M."} birthday={7}/>
                    <Celebrants name={"Acula, David Jude B."} birthday={12}/>
                    <Celebrants name={"Yedra, Kent Steven A."} birthday={32}/>
                    <Celebrants name={"Arcillas, Renzcel C."} birthday={82}/>
                </CardContent>
                <CardMedia component={"img"} image={birthday} alt='birthday' width={'auto'} height={'auto'}/>
            </Card>
        </Box>
    )
}

export default CardA