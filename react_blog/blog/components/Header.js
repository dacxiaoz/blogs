//Ant Design的24格栅格化系统
//Ant Design做好了栅格化系统
//可以适配多种屏幕，简单理解成把页面的分成均等的24列，然后进行布局。
// 需要对适配几个属性熟悉一下：
// xs: <576px响应式栅格。
// sm：≥576px响应式栅格.
// md: ≥768px响应式栅格.
// lg: ≥992px响应式栅格.
// xl: ≥1200px响应式栅格.
// xxl: ≥1600px响应式栅格.

import React ,{useState,useEffect} from 'react'
import style from '../static/style/components/header.module.css'
import {Row,Col,Menu} from 'antd'
// 横向部件 Row 纵向部件 Col 
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import servicePath from '../config/apiUrl'

import { createFromIconfontCN } from '@ant-design/icons';
const Icon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2328986_gi7falcj2ya.js',
});

const Header=()=>{
    const [navArray,setNavArray] = useState([])
    useEffect(()=>{
        const fetchData = async ()=>{
            const result = await axios(servicePath.getTypeInfo).then((res)=>{
                return res.data.data
            })
            setNavArray(result)
        }
        fetchData()
    },[])

    const handleClick = (e)=>{
        if(e.key==0){
            Router.push('/')
        }else{
            Router.push('/list?id='+e.key)
        }
    }

    return (
    <div className={style.header}>
        <Row type="flex" justify='center'>
            <Col xs={24} sm={24} md={10} lg={15} xl={12}>
                <span className={style.logo}>技术胖</span>
                <span className={style.txt}>专注前端开发，每年100集免费视频。</span>
            </Col>
            <Col xs={6} sm={6} md={14} lg={8} xl={10}>
                <Menu mode="horizontal" onClick={handleClick}>
                    <Menu.Item key="0"  >
                        <Icon type="icon-home-filling"/>
                        首页
                    </Menu.Item>
                    {
                        navArray.map((item)=>{
                            return (
                                <Menu.Item key={item.id}>
                                    <Icon type={item.icon}/>
                                    {item.typeName}
                                </Menu.Item>
                            )
                        })
                    }

                </Menu>
            </Col>
        </Row>
    </div>
)
}
export default Header