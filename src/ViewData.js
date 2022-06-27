import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from './context'
import './styles.css';

function ViewData(props) {
  const {showCreateForm, 
    setShowCreateForm, 
    showUpdate,
    setShowUpdate,
    setUpdateValues,
    handleCreate,
    viewAPIFetchNow,
    viewAPIResponse,
    deleteAPIFetchNow,
    createApiValues, 
    setCreateApiValues,
    setUpdateApiValues, 
    updateApiValues,
    deleteAPIResponse
  } = useContext(AppContext)

  const [isSuccess, setIsSuccess] = useState('')


  const handleUpdate =(props, item) => {
    setShowUpdate(true)
    setUpdateValues(item)
  }

  const handleDelete =(props, item) => {
    deleteAPIFetchNow({
      pathParams: [
        {
          key: 'ID',
          value: item?.id,
        },
      ],
      body: JSON.stringify(item)
    })
  }

  useEffect(()=> {
    viewAPIFetchNow()
  }, [])

  useEffect(()=> {
    if(createApiValues &&  Object.keys(createApiValues).length > 0) {
      viewAPIFetchNow()
      setShowCreateForm(false)

      setIsSuccess('The user created successfully')
      setCreateApiValues({})

      setTimeout(() => {
        setIsSuccess('')
      }, 2000);
    }
  }, [createApiValues])

  useEffect(()=> {
    if(updateApiValues && updateApiValues &&  Object.keys(updateApiValues).length > 0) {
      viewAPIFetchNow()
      setShowUpdate(false)

      setIsSuccess('The user updated successfully')
      setUpdateApiValues({})

      setTimeout(() => {
        setIsSuccess('')
      }, 2000);
    }
  }, [updateApiValues])

  useEffect(()=> {
    if(deleteAPIResponse && deleteAPIResponse?.status) {
      viewAPIFetchNow()

      setIsSuccess('The user deleted successfully')

      setTimeout(() => {
        setIsSuccess('')
      }, 2000);
    }
  }, [deleteAPIResponse])

  return (
    <div className="cls-view-container">
      <div className={`cls-app-container ${showUpdate || showCreateForm ? 'cls-table-disable' : 'cls-table-enable'}`}>
        
        <button className='cls-create-btn' onClick={handleCreate}>Create</button>

        <div className='cls-toast-container'>
          {isSuccess && 
            <div>{isSuccess}</div>
          }
        </div>

        <div className={`cls-table-wrapper`}>
          {viewAPIResponse.length > 0 && (
            <table>
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th> update </th>
                <th> delete </th>
              </tr>
                {viewAPIResponse.map((item, index) => {
                  return (
                    <tr className={`cls-row cls-row-${index}`}> 
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                      <td> <button onClick={(e) => handleUpdate(e, item)}>Update</button> </td>
                      <td> <button onClick={(e) => handleDelete(e, item)}>Delete</button> </td>
                    </tr>
                  )
                })}
              </table>
            )}
        </div>
      </div>
    </div>
  )
}

export default ViewData;