import React,{ useState } from 'react'
import 'antd/dist/antd.css'
import { Card,Input,Button,Spin } from 'antd'

import {
    UserAddOutlined,
    KeyOutlined
  } from '@ant-design/icons';

const Login=()=>{
    const [userName,setUserName]=useState('')
    const [password,setPassword]=useState('')
    const [isLoading,setIsLoading]=useState(false)
    
    const checkLogin=()=>{
        setIsLoading(true)
        setTimeout(()=>{
            setIsLoading(false)
        },1000)
    }

    return(
        <div className='login-div'>
           <Spin tip='Loading...' spinning={isLoading}>
                <Card title='DaCxiaoZ' bordered={true} style={{width:400}}>
                    <Input 
                        id="userName"
                        size="large"
                        placeholder="Enter you userName"
                        prefix={<UserAddOutlined style={{color:'rgba(0,0,0,.25)'}} />}
                        onChange={(e)=>{setUserName(e.target.value)}}
                    />
                    <br/><br/>
                    <Input.Password
                        id="password"
                        size="large"
                        placeholder="Enter you password"
                        prefix={<KeyOutlined style={{color:'rgba(0,0,0,.25)'}} />}
                        onChange={(e)=>{setPassword(e.target.value)}}
                    />
                    <br/><br/>
                    <Button type="primary" size="large" block onClick={checkLogin}>Login in</Button>
                </Card>
            </Spin>
        </div>
    )
}
export default Login