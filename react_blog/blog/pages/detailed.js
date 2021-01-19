import React from 'react'
import axios from 'axios'
import Head from 'next/head'
import {Row,Col,Breadcrumb,Affix} from 'antd'
// import ReactMarkdown from 'react-markdown'
// import MarkNav from 'markdown-navbar'
// import 'markdown-navbar/dist/navbar.css'

import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import Tocify from '../components/tocify.tsx'

import {
  ReconciliationOutlined,
} from '@ant-design/icons';

import Author from '../components/Author'
import Header from '../components/Header'
import Advert from '../components/Advert'
import Footer from '../components/Footer'

//tocify.tsx

const Detailed=(props)=>{
  // let markdown='# P01:课程介绍和环境搭建\n' +
  // '[ **M** ] arkdown + E [ **ditor** ] = **Mditor**  \n' +
  // '> Mditor 是一个简洁、易于集成、方便扩展、期望舒服的编写 markdown 的编辑器，仅此而已... \n\n' +
  //  '**这是加粗的文字**\n\n' +
  // '*这是倾斜的文字*`\n\n' +
  // '***这是斜体加粗的文字***\n\n' +
  // '~~这是加删除线的文字~~ \n\n'+
  // '\`console.log(111)\` \n\n'+
  // '# p02:来个Hello World 初始Vue3.0\n' +
  // '> aaaaaaaaa\n' +
  // '>> bbbbbbbbb\n' +
  // '>>> cccccccccc\n'+
  // '***\n\n\n' +
  // '# p03:Vue3.0基础知识讲解\n' +
  // '> aaaaaaaaa\n' +
  // '>> bbbbbbbbb\n' +
  // '>>> cccccccccc\n\n'+
  // '# p04:Vue3.0基础知识讲解\n' +
  // '> aaaaaaaaa\n' +
  // '>> bbbbbbbbb\n' +
  // '>>> cccccccccc\n\n'+
  // '#5 p05:Vue3.0基础知识讲解\n' +
  // '> aaaaaaaaa\n' +
  // '>> bbbbbbbbb\n' +
  // '>>> cccccccccc\n\n'+
  // '# p06:Vue3.0基础知识讲解\n' +
  // '> aaaaaaaaa\n' +
  // '>> bbbbbbbbb\n' +
  // '>>> cccccccccc\n\n'+
  // '# p07:Vue3.0基础知识讲解\n' +
  // '> aaaaaaaaa\n' +
  // '>> bbbbbbbbb\n' +
  // '>>> cccccccccc\n\n'+
  // '``` var a=11; ```'
  const tocify = new Tocify()
  const renderer = new marked.Renderer()
  
  renderer.heading=function(text,level,raw){
    const anchor = tocify.add(text,level)
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${levvel}></a>\n`
  }
  
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
  let html = marked(props.article_content)
 
  return (
    <div>
      <Head>
        <title>detailed</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
          <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
              <div>
                <div className="bread-div">
                  <Breadcrumb>
                    <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                    <Breadcrumb.Item><a href="/">视频列表</a></Breadcrumb.Item>
                    <Breadcrumb.Item>XXXXX</Breadcrumb.Item>
                  </Breadcrumb>
                </div>
                <div>
                  <div className="detailed-title">
                      React实战视频教程-某噢某某Blog开发
                  </div>
                  <div className="list-icon center">
                    <span><ReconciliationOutlined />2021-01-16</span>
                    <span><ReconciliationOutlined />视频教程</span>
                    <span><ReconciliationOutlined />10000人</span>
                  </div>
                  <div className="detailed-content"
                    dangerouslySetInnerHTML={{__html:html}}
                  >
                      {/* <ReactMarkdown
                        source={markdown}  //把什么东西进行渲染
                        escapeHtml={false} //不对html进行转换
                      /> */}
                  </div>
                </div>
              </div>
          </Col>

          <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
              <Author />
              <Advert />
              <Affix offsetTop={5}>
                <div className="detailed-nav comm-box">
                  <div className="nav-title">文章目录</div> 
                  {/* <MarkNav
                    className="article-menu"
                    source={markdown}
                    ordered={false}
                  /> */}
                  {tocify && tocify.render()}
                </div>
              </Affix>
          </Col>
      </Row>
      <Footer />
      <style jsx>{`
        .bread-div{
          padding: .5rem;
          border-bottom:1px solid #eee;
          background-color: #e1f0ff;
          }
          .detailed-title{
              font-size: 1.8rem;
              text-align: center;
              padding: 1rem;
          }
          .center{
              text-align: center;
          }
          .detailed-content{
              padding: 1.3rem;
              font-size: 1rem;
          }
          pre{
              display: block;
              background-color:#f3f3f3;
              padding: .5rem !important;
              overflow-y: auto;
              font-weight: 300;
              font-family: Menlo, monospace;
              border-radius: .3rem;
          }
          pre{
              background-color: #283646 !important;
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
          
          .title-anchor{
              color:#888 !important;
              padding:4px !important;
              margin: 0rem !important;
              height: auto !important;
              line-height: 1.2rem !important;
              font-size: .7rem !important;
              border-bottom: 1px dashed #eee;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
          }
          .active{
              color:rgb(30, 144, 255) !important;
          }
          .nav-title{
              text-align: center;
              color: #888;
              border-bottom: 1px solid rgb(30, 144, 255);
          
          }
          .article-menu{
              font-size:12px;
          }
          iframe{
              height: 34rem;
          }
          .detailed-content  img{
              width: 100%;
              border:1px solid #f3f3f3;
          }
          .title-level3{
              display: none !important;
          }
          .ant-anchor-link-title{
              font-size: 12px !important;
          }
          .ant-anchor-wrapper{
              padding: 5px !important;
          }
        `}</style>
    </div>
  )
}
//egg-cors模块 解决跨域问题
Detailed.getInitialProps = async(context)=>{
  console.log(context.query.id)
  let id =context.query.id
  const promise = new Promise((resolve)=>{
    axios('http://127.0.0.1:7001/default/getArticleById/'+id).then(
      (res)=>{
        console.log(res.data.data[0])
        resolve(res.data.data[0])
      }
    )
  })
  return await promise
}

export default Detailed