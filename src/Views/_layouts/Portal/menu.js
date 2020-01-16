import React, {
    useState,
    useEffect
} from 'react';
import {
    useSelector,
    useDispatch
} from 'react-redux';
import {
    FaAngleRight,
    FaCaretRight,
    FaCaretDown
} from 'react-icons/fa';
import history from '../../../Services/history';
import {
    MenuBar,
    LabelMenu,
    ItemMenu,
    GroupLabel
} from './style';
import {
    handlerMenu
} from '../../../Services/store/user/action';

export default function Menu(props) {
    const dispatch = useDispatch();
    const menu = useSelector(state=>{console.log(state.user)});
    const [hMenu, setH] = useState('auto');
    const [fActive, setfActive] = useState(true);
    const [status, setStatus] = useState(props.status);

    useEffect(()=>{
        setStatus(props.status);
    }, [props.status]);

    function handlerLabel(e) {
        setfActive(!fActive);
    }

    function handlerItem(path) {
        history.push(`${path}`);
        dispatch(handlerMenu());
        setStatus(!status);
        setfActive(!fActive);
    }

    return (
        <MenuBar status={status}>
            { menu ? ( 
                menu.map((item, idx) => (
                    <GroupLabel key={idx} status={status} h={hMenu}>
                        <LabelMenu onClick={handlerLabel}>
                            {item.label.name}
                            { fActive? <FaCaretDown className="icon" /> : 
                                      <FaCaretRight className="icon" /> }
                        </LabelMenu>
                        {
                            item.label.forms.map(form => (
                                <ItemMenu key={form.path} status={true} 
                                          onClick={e=>handlerItem(form.path)}
                                          title={form.path}>
                                    <FaAngleRight className="icon" />
                                    {form.name}
                                </ItemMenu>
                            ))
                        }    
                    </GroupLabel>
                ))) : null
            }
        </MenuBar>
    );
}