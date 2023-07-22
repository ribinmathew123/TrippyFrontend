import ProfileLayout from '../../../Layout/ProfileLayout'
import { Outlet } from 'react-router-dom'

function ProfileLay() {
  return (
    <div className='flex w-full'>
      <div className='flex flex-[3]'>
      <ProfileLayout/>
      </div>
      <div className='flex flex-[13] justify-center items-center'>
      <Outlet />
      </div>
    

    </div>
  )
}

export default ProfileLay


