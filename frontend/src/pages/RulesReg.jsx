import React from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import unohana from '../style/images/unohana.jpg'
import unohana2 from '../style/images/unohana2.jpg'
import RulesRegCSS from './RulesRegCSS.module.css'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
const RulesReg = () => {
  const data = [
    {
      title: "First Ever Sharing App in Bonpen",
      caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel risus vel arcu sodales gravida. Nunc facilisis massa quis fringilla. Fusce a ligula eu nulla eleifend iaculis. Praesent id scelerisque nulla. Vestibulum et urna a elit sollicitudin vehicula ut eu leo. Vestibulum fermentum, turpis sit amet auctor facilisis, ex nisi vulputate nulla, vel consequat dolor nisi eu tortor. Sed a metus a orci laoreet vehicula vel et sapien. Fusce eget justo nec libero laoreet convallis id in metus. Integer tincidunt ante vitae justo vestibulum, a rhoncus urna mattis. Sed sit amet mi bibendum, malesuada leo eu, tincidunt tortor. Donec nec leo eu urna elementum congue id nec purus. Suspendisse potenti. Nulla facilisi. Nunc bibendum lorem eu metus varius eleifend. Suspendisse potenti."
    },
    {
      title: "Reserve, Chill then Ride In",
      caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel risus vel arcu sodales gravida. Nunc facilisis massa quis fringilla. Fusce a ligula eu nulla eleifend iaculis. Praesent id scelerisque nulla. Vestibulum et urna a elit sollicitudin vehicula ut eu leo. Vestibulum fermentum, turpis sit amet auctor facilisis, ex nisi vulputate nulla, vel consequat dolor nisi eu tortor. Sed a metus a orci laoreet vehicula vel et sapien. Fusce eget justo nec libero laoreet convallis id in metus. Integer tincidunt ante vitae justo vestibulum, a rhoncus urna mattis. Sed sit amet mi bibendum, malesuada leo eu, tincidunt tortor. Donec nec leo eu urna elementum congue id nec purus. Suspendisse potenti. Nulla facilisi. Nunc bibendum lorem eu metus varius eleifend. Suspendisse potenti."
    },
    {
      title: "No Van Terminals Needed",
      caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel risus vel arcu sodales gravida. Nunc facilisis massa quis fringilla. Fusce a ligula eu nulla eleifend iaculis. Praesent id scelerisque nulla. Vestibulum et urna a elit sollicitudin vehicula ut eu leo. Vestibulum fermentum, turpis sit amet auctor facilisis, ex nisi vulputate nulla, vel consequat dolor nisi eu tortor. Sed a metus a orci laoreet vehicula vel et sapien. Fusce eget justo nec libero laoreet convallis id in metus. Integer tincidunt ante vitae justo vestibulum, a rhoncus urna mattis. Sed sit amet mi bibendum, malesuada leo eu, tincidunt tortor. Donec nec leo eu urna elementum congue id nec purus. Suspendisse potenti. Nulla facilisi. Nunc bibendum lorem eu metus varius eleifend. Suspendisse potenti."
    },
    {
      title: "Automate and Boost the Speed of Van Services",
      caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel risus vel arcu sodales gravida. Nunc facilisis massa quis fringilla. Fusce a ligula eu nulla eleifend iaculis. Praesent id scelerisque nulla. Vestibulum et urna a elit sollicitudin vehicula ut eu leo. Vestibulum fermentum, turpis sit amet auctor facilisis, ex nisi vulputate nulla, vel consequat dolor nisi eu tortor. Sed a metus a orci laoreet vehicula vel et sapien. Fusce eget justo nec libero laoreet convallis id in metus. Integer tincidunt ante vitae justo vestibulum, a rhoncus urna mattis. Sed sit amet mi bibendum, malesuada leo eu, tincidunt tortor. Donec nec leo eu urna elementum congue id nec purus. Suspendisse potenti. Nulla facilisi. Nunc bibendum lorem eu metus varius eleifend. Suspendisse potenti."
    },
  ]
  return (
    <React.Fragment>
      <br /><br /><br /><br />
      <Container maxWidth="large" sx={{padding: {xs: 0, md : 0}}}>
        {data.map((data, index) => (
          index % 2 == 0 ? (
            <Box sx={{ bgcolor: '#ffffff', height: 'auto', display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexDirection: {xs: 'column-reverse', md: 'row'}}}>
              <img src={unohana2} width='30%%'height='auto' style={{flex: 1, margin: '50px 100px'}}/>
              <div style={{flex: 1, textAlign: 'center', marginRight: '48px', marginLeft: '24px'}}>
                <h2 >{data.title}</h2>
                <p style={{textAlign: 'justify'}}>{data.caption}</p>
              </div>
              
            </Box>
          ) : (
            <Box sx={{ bgcolor: '#f5f5f5', height: 'auto', display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexDirection: {xs: 'column', md: 'row'}}}>
              <div style={{flex: 1, textAlign: 'center', marginRight: '24px', marginLeft: '48px'}}>
                <h2 >{data.title}</h2>
                <p style={{textAlign: 'justify'}}>{data.caption}</p>
              </div>
              <img src={unohana} width='30%'height='auto' style={{flex: 1, margin: '50px 100px'}}/>
            </Box>
          )
        ))}
      </Container>
    </React.Fragment>
  )
}

export default RulesReg