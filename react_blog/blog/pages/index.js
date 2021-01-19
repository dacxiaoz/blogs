import React,{useState} from 'react'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import {Row,Col,List} from 'antd'
import servicePath from '../config/apiUrl'

import {
  ReconciliationOutlined,
} from '@ant-design/icons';

import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

import Author from '../components/Author'
import Header from '../components/Header'
import Advert from '../components/Advert'
import Footer from '../components/Footer'


const Home=(list)=>{
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

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
          <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
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
                      <span> <ReconciliationOutlined /> {item.typeName}</span>
                      <span> <ReconciliationOutlined /> {item.view_count}</span>
                      </div>
                      <div className="context"
                      dangerouslySetInnerHTML={{__html:marked(item.introduce)}}>
                      </div>
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
      <style jsx>{`
        pre{
          display: block;
          background-color: #283646 !important;
           padding: .5rem !important;
           overflow-y: auto;
           font-weight: 300;
           font-family: Menlo, monospace;
           border-radius: .3rem;
      }
      
      pre >code{
          border:0px !important;
          background-color: #283646 !important;
          color:#FFF;
      
      }
      code {
          display: inline-block ;
          background-color:#f3f3f3;
          border:1px solid #fdb9cc;
          border-radius:3px;
          font-size: 12px;
          padding-left: 5px;
          padding-right: 5px;
          color:#4f4f4f;
          margin: 0px 3px;
      
      }
      
      .list-context img{
         width:100% ;
         border-radius:5px;
         border:1px solid #f0f0f0;
         max-width:1000px !important;
         display: block;
         margin:8px  auto ;
      
      }      
      `}
      </style>
    </div>
  )
}

Home.getInitialProps = async ()=>{
  const promise = new Promise((resolve)=>{
    axios(servicePath.getArticlelist).then(
      (res)=>{
        resolve(res.data)
      }
    )
  })
  return await promise
}

export default Home