import React, {useContext} from 'react'
import { KanbanContext } from '@/utils/Providers '

const Settings = () => {
    const {setShowSettings,showSettings, setShowEditBoardModal} = useContext(KanbanContext)
  return (
    <>
      <div className={ `${showSettings ? "opacity-100  h-[80px]" : "opacity-0 h-0"} bg-white z-[100000]
      text-center p-3 rounded-md text-[12px] w-[150px] transition-all duration-500 border top-12
       right-4 shadow-sm absolute`}>
          <p
          onClick={() => {
            setShowEditBoardModal(true)
            setShowSettings(false)
          }}
          className='text-gray-light w-full mb-2 hover:font-bold cursor-pointer'>Edit board</p>
      
          <p className='text-red cursor-pointer w-full hover:font-bold'>Delete board</p>
      
      </div>
    
    </>
  )
}

export default Settings