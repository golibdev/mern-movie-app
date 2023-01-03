import { useSelector, useDispatch } from 'react-redux'
import MenuIcon from '@mui/icons-material/Menu'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import { AppBar, Box, Button, IconButton, Stack, Toolbar, useScrollTrigger } from '@mui/material';
import { cloneElement, useState } from 'react';
import { Link } from 'react-router-dom'
import menuConfigs from '../../configs/menu.configs';
import { themeModes } from '../../configs/theme.configs';
import { setAuthModalOpen } from '../../redux/features/authModalSlice';
import { setThemeMode } from '../../redux/features/themeModeSlice'
import Logo from './Logo';
import UserMenu from './UserMenu';
import Sidebar from './Sidebar';

const ScrollAppBar = ({ children, window }) => {
   const { themeMode } = useSelector((state) => state.themeMode);

   const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 50,
      target: window ? window() : undefined
   })

   return cloneElement(children, {
      sx: {
         color: trigger ? "text.primary" : themeMode === themeModes.dark ? "primary.contrastText" : "text.primary",
         backgroundColor: trigger ? "background.paper" : themeMode === themeModes.dark ? "transparent" : "background.paper"
      }
   })
}

const TopBar = () => {
   const { user } = useSelector((state) => state.user)
   const { appState } = useSelector((state) => state.appState)
   const { themeMode } = useSelector((state) => state.themeMode)

   const [sidebarOpen, setSidebarOpen] = useState(false);

   const dispatch = useDispatch();
   
   const onSwitchTheme = () => {
      const theme = themeMode === themeModes.dark ? themeModes.light : themeModes.dark
      dispatch(setThemeMode(theme))
      localStorage.setItem("mode", theme);
   }

   const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

   return (
      <>
         <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} onSwitchTheme={onSwitchTheme} />
         <ScrollAppBar>
            <AppBar elevation={0} sx={{ zIndex: 9999 }}>
               <Toolbar sx={{ alignItems: "center", justifyContent: "space-between" }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                     <IconButton
                        color='inherit'
                        sx={{ mr: 2, display: { md: "none" } }}
                        onClick={toggleSidebar}
                     >
                        <MenuIcon/>
                     </IconButton> 

                     <Box component={Link} to={'/'} sx={{ display: { xs: "inline-block", md: "none" }, textDecoration: "none", color: themeMode === "dark" ? "#fff" : "#000" }}>
                        <Logo/>
                     </Box>
                  </Stack>

                  {/* main menu */}
                  <Box flexGrow={1} alignContent="center" display={{ xs: "none", md: "flex" }}>
                     <Box component={Link} to={'/'} sx={{ marginRight: "30px", textDecoration: "none", color: themeMode === "dark" ? "#fff" : "#000" }}>
                        <Logo/>
                     </Box>
                     {menuConfigs.main.map((item, index) => (
                        <Button
                           key={index}
                           sx={{
                              color: appState.includes(item.state) ? "primary.contrasText" : "inherit",
                              mr: 2
                           }}
                           component={Link}
                           to={item.path}
                           variant={appState.includes(item.state) ? "contained" : "text"}
                        >
                           {item.diplay}
                        </Button>
                     ))}
                     <IconButton 
                        sx={{ color: "inherit" }}
                        onClick={onSwitchTheme}
                     >
                        {themeMode === themeModes.dark ? <DarkModeOutlinedIcon/> : <WbSunnyOutlinedIcon/>}
                     </IconButton>
                  </Box>
                  {/* main menu */}

                  <Stack spacing={3} direction="row" alignItems="center">
                     {!user && <Button
                        variant='contained'
                        onClick={() => dispatch(setAuthModalOpen(true))}
                     >
                        sign in
                     </Button>
                     }
                  </Stack>
                  {user && <UserMenu/>}
               </Toolbar>
            </AppBar>
         </ScrollAppBar>
      </>
   )
}

export default TopBar