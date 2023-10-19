import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
const Gallery = () => {

  return (
    <>
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <List component="nav" aria-label="main mailbox folders" sx={{ display: 'flex', flexDirection: 'column', borderRadius: '10px', mb: 2, p: 2 }}>
          <ListItemButton>
            <ListItemText primary="Test" />
          </ListItemButton>
        </List>
      </Box>
    </>
  )
}

export default Gallery