
import {store} from 'redux/store'
import './Avatar.scss'
function Avatar(){
    const avatarUrl=store.getState().user.msg.avatarUrl;
    return(
        <span className="avatar">
            <img src={avatarUrl} alt="" />
        </span>
    )
}

export default Avatar