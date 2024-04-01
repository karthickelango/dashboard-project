import { React, useContext, useState } from 'react'
import { Avatar, Box, IconButton, Menu, MenuItem, useTheme } from '@mui/material'
import { ColorModeContext, tokens } from '../../theme'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import DataContext from '../../context/DataContext'
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../constant/apiurl'

const UserMenu = ({collapsed}) => {
  const { userDetail } = useContext(DataContext)
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const colorMode = useContext(ColorModeContext)
  const [profileMenu, setProfileMenu] = useState(null);
  const open = Boolean(profileMenu);
  const isUserSignedIn = localStorage?.getItem('token')
  const navigate = useNavigate()

  // handel logout
  const handelSignOut = () => {
    localStorage.removeItem('token')
    navigate('/')
    window.location.reload()
  }
  // handel open menu
  const handleClick = (event) => {
    setProfileMenu(event.currentTarget);
  };
  //handel clode menu
  const handleClose = () => {
    setProfileMenu(null);
  };

  return (
    <Box sx={{background: `${colors.primary[400]} !important`, }}>
      <div className={theme.palette.mode === "dark" ? 'dark-mode user-menu' : 'light-mode user-menu'}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }} onClick={handleClick}>
          <Avatar alt={userDetail.username} src={ userDetail.avatar != null ? `${BASE_URL}/${userDetail.avatar}` : '' }
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            style={{ width: '30px', height: '30px', marginRight: '15px', marginTop: collapsed ? '6px' : '0px' }} 
            className='mtm-6'/>
          <div style={{display: collapsed ? 'none': 'block'}} className='mobile-view'>
            <div style={{ fontSize: '14px', fontWeight: '600', color: theme.palette.mode === "dark" ? '#ffffff' : '#000' }}>{userDetail.username}</div>
            <div style={{ fontSize: '14px', fontWeight: '500', color: theme.palette.mode === "dark" ? '#ffffff' : '#000' }}>{userDetail.email}</div>
          </div>
          <MoreVertIcon
            style={{ marginLeft: '20px', cursor: 'pointer', display: collapsed ? 'none': 'block' }}
            sx={{ color: theme.palette.mode === "dark" ? '#ffffff' : '#0009', fontSize: 20 }}
            className='mobile-view'
          />
        </div>
        <Menu
          id="menu"
          profileMenu={profileMenu}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          className='profile-menu'
        >
          <MenuItem onClick={handleClose}><Link to='/myaccount'>My account</Link></MenuItem>
          <MenuItem onClick={handleClose}>
            {/* icons */}
            <Box display='flex'>
              <div onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === 'dark' ? (
                  <>
                    <span style={{marginRight: '10px'}}>Switch to Light mode</span>
                    <LightModeOutlinedIcon />
                  </>
                ) : (
                  <>
                    <span style={{marginRight: '10px'}}>Switch to Dark mode</span>
                    <DarkModeOutlinedIcon />
                  </>
                )}
              </div>
            </Box>
          </MenuItem>
          <MenuItem onClick={() => handelSignOut()}>Logout</MenuItem>
        </Menu>
      </div>
    </Box>
  )
}

export default UserMenu