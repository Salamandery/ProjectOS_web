import React from 'react';
import {
    useSelector,
    useDispatch
} from 'react-redux';
import {
    FaList
} from 'react-icons/fa';
import ProtoTypes from 'prop-types';
import {
    Container,
    Content,
    Wrapper,
    ButtomMenu
} from './style';
import Header from '../../../Components/HeaderComponent';
import {
    handlerMenu
} from '../../../Services/store/user/action';
import MenuBar from './menu';

const Portal = ({children, noHeader}) => {
    const dispatch = useDispatch();
    const menu = useSelector(state=>state.user.handlerMenu);

    function handlerMenuRequest() {
        dispatch(handlerMenu(!menu));
    }

    return (
        <Container>
            { noHeader === false ?
                <Wrapper>
                    <ButtomMenu onClick={handlerMenuRequest}>
                        <FaList />
                    </ButtomMenu>
                    <Header />
                </Wrapper>
              : null
            }
            <Wrapper w="100%" h="100%">
                <MenuBar status={menu} />
                <Content>
                    {children}
                </Content>
            </Wrapper>
        </Container>
    );
}

Portal.propTypes = {
    children: ProtoTypes.element.isRequired,
    noHeader: ProtoTypes.bool,
}

Portal.defaultProps = {
    noHeader: false
}

export default Portal;