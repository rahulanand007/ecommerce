import React, { Fragment,useState } from 'react'
import "./Header.css"
import { Backdrop, SpeedDial,SpeedDialAction } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useDispatch } from 'react-redux';
import { logout } from '../../../actions/userAction';


const UserOptions = ({user}) => {

  const dispatch =useDispatch()
  const alert = useAlert()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  
  let options;

  if(user){
    if(!user.isAuthenticated){
     options = [
      {icon:<ListAltIcon/>, name:"Orders", func:orders},
      {icon:<PersonIcon/>, name:"Profile", func:account},
      {icon:<ExitToAppIcon/>, name:"Logout", func:logoutUser}
    ]

    if(user.role==="admin"){
      options.unshift({icon:<DashboardIcon/>, name:"Dashboard", func:dashboard})
    }}
  }else{
     options  = [
      {icon:<PersonIcon/>, name:"Login", func:login}
     ]
  }
 
  const urlArr = window.location.href.split("/")
  

  function dashboard(){
    navigate("/admin/dashboard")
  }

  function login(){
    navigate("/login")
  }

  function orders(){
    navigate("/orders")
  }

  function account(){
    navigate("/account")
  }

  
  function logoutUser(){
    dispatch(logout())
    setOpen(false)
    alert.success("Logout Successfull") 
    navigate("/login")
  }
  
  return (
    <Fragment>
        {urlArr[urlArr.length-1]==="login"?"":(
          <Fragment>
                <Backdrop open={open} style={{zIndex:"10"}}/>
                <SpeedDial
                  ariaLabel='SpeedDial tooltip example'
                  onClose={()=>setOpen(false)}
                  onOpen={()=> setOpen(true)}
                  open={open}
                  direction="down"
                  className='speedDial'
                  icon={<img className='speedDialIcon' 
                            src={user? (user.avatar.url?user.avatar.url:"/profileicon.png"):"/profileicon.png"}
                            alt="Profile"
                    />}
                >
                  {options.map((item)=>(
                    <SpeedDialAction
                      key={item.name}
                      icon={item.icon}
                      tooltipTitle={item.name}
                      onClick={item.func}
                      />
                  ))}
        </SpeedDial>
          </Fragment>
        )}
    </Fragment>
  )
}

export default UserOptions