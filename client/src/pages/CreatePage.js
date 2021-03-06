import React,{useState,useEffect, useContext} from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';

export const CreatePage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const [link,setLink] = useState('')

    const {request} = useHttp();

    useEffect(()=>{
        window.M.updateTextFields()         //Ссылки не активны после выхода 
    },[])
    
    const pressHandler = async (e) =>{
        if(e.key === 'Enter'){
            try{
                const data = await request('/api/link/generate', 'POST', {from: link},{
                    Authorization: `Bearer ${auth.token}` 
                })
                history.push(`/detail/${data.link._id}`)
            }catch(e){

            }
        }
    }

    return(
        <div className="row">
            <div className="col s8 offset-s2" style={{paddingTop:'2rem'}}>
            <div className="input-field">
                    <input 
                        placeholder="Вставьте ссылку" 
                        id="link" 
                        type="text" 
                        onChange={e=>setLink(e.target.value)}
                        value={link}
                        onKeyPress={pressHandler} 
                    />
                    <label htmlFor="email">Email</label>
                </div>
            </div>
        </div>
    )
}