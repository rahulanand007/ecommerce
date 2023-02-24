import React, { Fragment,useState,useEffect } from 'react'
import './UpdateProfile.css'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FaceIcon from '@mui/icons-material/Face6';
import Loader from '../layout/Loader/Loader'
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {updateProfile,clearErrors, loadUSer} from '../../actions/userAction'
import { useAlert } from 'react-alert';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import MetaData from '../layout/Header/MetaData';

const UpdateProfile = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const alert = useAlert()

  const {user} = useSelector((state)=>state.user)
  const {error,isUpdated,loading} = useSelector((state)=>state.profile)

  const [avatar, setAvatar] = useState()
  const [avatarPreview, setAvatarPreview] = useState("/profileicon.png")

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  // const [password, setPassword] = useState(user.password)
  // const {name,email,password}=user

  const updateProfileSubmit = (e)=>{
    e.preventDefault();
    const myForm = new FormData()

    myForm.set("name", name);
    myForm.set("email",email)
    // myForm.set("password",password)
    myForm.set("avatar",avatar)
    
    dispatch(updateProfile(myForm))
  }


  const updateProfileDataChange = (e)=>{
      const reader = new FileReader();

      reader.onload = ()=>{
        if(reader.readyState === 2){
          setAvatarPreview(reader.result)
          setAvatar(reader.result)
        }
      }
      reader.readAsDataURL(e.target.files[0])

    
  }

  useEffect(()=>{

    if(user){
      setName(user.name)
      setEmail(user.email)
      setAvatarPreview(user.avatar.url)
    }

    if(error){
      alert.error(error)
      dispatch(clearErrors)
    }
    if(isUpdated){
      alert.success("Profile Updated Successfully")
      dispatch(loadUSer())
      navigate('/account')

      dispatch({
        type: UPDATE_PROFILE_RESET
      })
    }
   
  },[dispatch,alert,error,navigate,isUpdated,user])


  return (
    <Fragment>
    {loading?<Loader/>:(
          <Fragment>
            <MetaData title="Update Profile"/>
            <div className='updateProfileContainer'>
              <div className='updateProfileBox'>
                <h2 className="updateProfileHeading">Update Profile</h2>
                <form
                  className='updateProfileForm'
                  encType='multipart/form-data'
                  onSubmit={updateProfileSubmit}
                >
                  <div className='updateProfileName'>
                    <FaceIcon/>
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      name="name"
                      value={name}
                      onChange={(e)=>setName(e.target.value)}
                    />
                  </div>
                  <div className='updateProfileEmail'>
                    <MailOutlineIcon/>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      name='email'
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                    />
                  </div>
                  <div id='updateProfileImage'>
                      <img src={avatarPreview} alt="Avatar Preview"/>
                      <input
                        type="file"
                        name='avatar'
                        accept='image/*'
                        onChange={updateProfileDataChange}
                      />
                  </div>
                  <div className="signUpBtn">
                  <button type="submit" value="updateProfileBtn" >Update</button>
                  </div>
                </form>
              </div>
            </div>

          </Fragment>
    )}
    </Fragment>
  )
}

export default UpdateProfile