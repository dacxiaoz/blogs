import React,{useState,useEffect} from 'react'
import Head from 'next/head'
import {Row,Col,List,Breadcrumb} from 'antd'
import {
  ReconciliationOutlined,
} from '@ant-design/icons';

import Author from '../components/Author'
import Header from '../components/Header'
import Advert from '../components/Advert'
import Footer from '../components/Footer'

import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'


import axios from 'axios'
import servicePath from '../config/apiUrl'
import Link from 'next/link'

const Mylist=(list)=>{
  const [mylist,setMylist] = useState(list.data)
  
  const renderer = new marked.Renderer()
  marked.setOptions({
    renderer:renderer, //渲染的方式
    gfm:true,  //启动类似github样式的makdown
    pedantic:false,//容错
    sanitize:false,//原始输入 忽略html标签
    tables:true,    //是否允许输出github表格 gfm 为true时
    breaks:false,  //是否支持换行符 gfm 为true时
    smartLists:true,    //自动渲染我们的列表样式
    highlight:function(code){ //代码高亮
      return hljs.highlightAuto(code).value    
    }
  })
  
  useEffect(()=>{
    setMylist(list.data)
  })
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
          <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
              <div className="bread-div">
                <Breadcrumb>
                  <Breadcrumb.Item><a href="/"></a></Breadcrumb.Item>
                  <Breadcrumb.Item>视频教程</Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <List 
                header={<div>最新日志</div>}
                itemLayout="vertical"
                dataSource={mylist}
                renderItem={item=>(
                  <List.Item>
                      <div className="title">
                        <Link href={{pathname:'/detailed',query:{id:item.id}}}>
                            <a>{item.title}</a>
                        </Link>
                      </div>
                      <div className="icon">
                      <span> <ReconciliationOutlined /> {item.addTime}</span>
                      <span> <ReconciliationOutlined />{item.typeName}</span>
                      <span> <ReconciliationOutlined /> {item.view_count}</span>
                      </div>
                      <div className="context" dangerouslySetInnerHTML={{__html:marked(item.introduce)}}></div>
                  </List.Item>
                )}
              />
          </Col>
          <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
              <Author />
              <Advert />
          </Col>
      </Row>
      <Footer />
    </div>
  )
}

Mylist.getInitialProps = async (context)=>{
  let id = context.query.id
  const promise = new Promise((resolve)=>{
    axios(servicePath.getListById+id).then(
      (res)=>{
        resolve(res.data)
      }
    )
  })
  return await promise
}
export default Mylist