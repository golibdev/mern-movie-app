import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Stack, Toolbar, Typography } from '@mui/material';
import {  useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import menuConfigs from '../../configs/menu.configs';
import uiConfigs from '../../configs/ui.configs';
import Logo from './Logo';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';

import { themeModes } from '../../configs/theme.configs';

const Sidebar = ({ open, toggleSidebar, onSwitchTheme }) => {
   const { user } = useSelector((state) => state.user);
   const { appState } = useSelector((state) => state.appState);
   const { themeMode } = useSelector((state) => state.themeMode);

   const sidebarWidth = uiConfigs.size.sidebarWidth;

   const drawer = (
      <>
         <Toolbar sx={{ paddingY: "20px", color: "text.primary" }}>
            <Stack width="100%" direction="row" justifyContent="center">
               <Logo/>
            </Stack>
         </Toolbar>
         <List sx={{ paddingX: "30px" }}>
            <Typography variant='h6' marginBottom="20px">MENU</Typography>
            {menuConfigs.main.map((item, index) => (
               <ListItemButton
                  key={index}
                  component={Link}
                  to={item.path}
                  sx={{
                     borderRadius: "10px",
                     marginY: 1,
                     backgroundColor: appState.includes(item.state) ? "primary.main" : "unset"
                  }}
                  onClick={() => toggleSidebar(false)}
               >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText disableTypography primary={
                     <Typography textTransform={"uppercase"}>{item.diplay}</Typography>
                  } />
               </ListItemButton>
            ))}
            {user && (<>
               <Typography variant='h6' marginBottom="20px">PERSONAL</Typography>
               {menuConfigs.user.map((item, index) => (
                  <ListItemButton
                     key={index}
                     component={Link}
                     to={item.path}
                     sx={{
                        borderRadius: "10px",
                        marginY: 1,
                        backgroundColor: appState.includes(item.state) ? "primary.main" : "unset"
                     }}
                     onClick={() => toggleSidebar(false)}
                  >
                     <ListItemIcon>{item.icon}</ListItemIcon>
                     <ListItemText disableTypography primary={
                        <Typography textTransform={"uppercase"}>{item.diplay}</Typography>
                     } />
                  </ListItemButton>
               ))}
            </>)}
            <Typography variant='h6' marginBottom="20px">THEME</Typography>
            <ListItemButton
               onClick={onSwitchTheme}
            >
               <ListItemIcon>
                  {themeMode === themeModes.dark ? <DarkModeOutlinedIcon/> : <WbSunnyOutlinedIcon/>}
               </ListItemIcon>
               <ListItemText disableTypography primary={
                  <Typography textTransform={"uppercase"}>
                     {themeMode === themeModes.dark ? "dark mode" : "light mode"}
                  </Typography>
               } />
            </ListItemButton>
         </List>
      </>
   )
   return (
      <Drawer
         open={open}
         onClose={() => toggleSidebar(false)}
         sx={{ "& .MuiDraver-Paper": {
            boxSizing: "border-box",
            width: sidebarWidth,
            borderRight: "0px"
         } }}
      >
         {drawer}
      </Drawer>
   )
}

export default Sidebar