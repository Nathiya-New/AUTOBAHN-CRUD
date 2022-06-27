import React, {useContext, useState} from 'react';
import { AppContext } from './context';

function CreateData(props) {
  const {type='create'} = props
  let {updateValues={}, setShowCreateForm, setShowUpdate, createAPIFetchNow, 
    updateAPIFetchNow} = useContext(AppContext)

  const initialVal = type.toLowerCase() === 'create' ? {} : updateValues;

  const [values, setValues] = useState(initialVal);

  const handleInputChange = (e) => {
    setValues({...values, [e.target.id]: e.target.value})
  }

  const handleSubmit = (result) => {
    result.preventDefault();

   if(type.toLowerCase() === 'create') {
      createAPIFetchNow({body: JSON.stringify(values)})
    }
    else {
      updateAPIFetchNow({
        pathParams: [
          {
            key: 'ID',
            value: values?.id,
          },
        ],
        body: JSON.stringify(values)
      })
    }
  }

  const handleCancel = () => {
    setShowCreateForm(false)
    setShowUpdate(false)
    setValues({})
  }

  return (
    <div className="cls-create-form">
      <form className="form-fa m-4" onSubmit={handleSubmit}>
        <div className="cls-modal-header mb-4">
          <h2 className="cls-modal-title m-0">{type} User Data</h2>
          <button className="cls-modal-close" onClick={handleCancel}>
              ×
          </button>
        </div>

        <div className='cls-modal-fields'>
          <div className="form-group input-group">
            <label for="id">
              Id*
            </label>
            <input type="text" className="form-control" id="id" placeholder="Id" required value={values.id} onChange={handleInputChange} />
          </div>

          <div className="form-group input-group">
            <label for="title">
            Title*
            </label>
            <input type="text" className="form-control" id="title" placeholder="Title" required value={values.title} onChange={handleInputChange} />
          </div>
        </div>

        <div className='cls-modal-buttons m-4'>
          <input name="submit" value="Submit" type='submit' className="cls-submit-button" />
          <input type="button" name="cancel" value="Cancel" className="cls-cancel-button" onClick={handleCancel} />
        </div>
      </form>
    </div>
  );
}

export default CreateData;