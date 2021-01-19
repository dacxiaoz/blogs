//next 支持css样式 配置
const withCss = require('@zeit/next-css')

if(typeof require !== 'undefined'){
    require.extensions['.css']=file=>{}
}

module.exports = withCss({
    cssModules: true,
    cssLoaderOptions: {
      localIdentName: '[local]___[hash:base64:5]',
      getLocalIdent: (context, localIdentName, localName, options) => {
        const hz = context.resourcePath.replace(context.rootContext, '');
        if (/node_modules/.test(hz)) {
          return localName;
        }
        return cssLoaderGetLocalIdent(context, localIdentName, localName, options);
      },
    }
})