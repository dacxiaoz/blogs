import {Avatar ,Divider} from 'antd'
import style from '../static/style/components/author.module.css'
// Avatar头像
// Divider分隔线
const Autor = ()=>{
    
    return (
        <div className={style.authorDiv+' comm-box'}>
            <div><Avatar size={100} scr="https://newimg.jspang.com/myqrCode.jpg"/></div>
            <div className={style.authorIntroduction}>
                因为美好的东西都是免费的，比如水、阳光和空气，所以本站视频全部免费。
                <Divider>社交账号</Divider>
                <Avatar size={28} icon="github" className={style.account} />
                <Avatar size={28} icon="qq" className={style.account} />
                <Avatar size={28} icon="wechat" className={style.account} />
            </div>
        </div>
    )
}

export default Autor