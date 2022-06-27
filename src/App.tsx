import React, {useEffect, useState} from 'react';
import './App.css';
import {AppContext} from './context'
import CreateData from './CreateData'
import ViewData from './ViewData'
import 'bootstrap/dist/css/bootstrap.min.css';
import {useContextAPI} from './useContextAPI'

function App() {
  const apiValues = useContextAPI({})

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showUpdate, setShowUpdate] = useState(false)
  const [updateValues, setUpdateValues] = useState({})
  const [createApiValues, setCreateApiValues] = useState(apiValues.createAPIResponse)
  const [updateApiValues, setUpdateApiValues] = useState(apiValues.updateAPIResponse)

  const handleCreate = () => {
    setShowCreateForm(!showCreateForm)
    apiValues.createAPIResponse = {}
  }

  useEffect (() => {
    setCreateApiValues(apiValues.createAPIResponse)
  },[apiValues?.createAPIResponse])

  useEffect (() => {
    setUpdateApiValues(apiValues.updateAPIResponse)
  },[apiValues?.updateAPIResponse])

  const initialValue = {
    ...apiValues,
    showCreateForm,
    setShowCreateForm,
    showUpdate,
    setShowUpdate,
    updateValues,
    setUpdateValues,
    handleCreate,
    createApiValues,
    setCreateApiValues,
    updateApiValues,
    setUpdateApiValues
  }

  const type = showCreateForm ? 'Create' : (showUpdate ? 'Update' : '')
  
  return (
    <AppContext.Provider value={initialValue} >
      <div className='App'>
        <div className=''>
          
          <div className='cls-content-wrapper'>
            {((showCreateForm) || (showUpdate && updateValues)) &&
              <CreateData type={type} />
            }

            <ViewData />
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;