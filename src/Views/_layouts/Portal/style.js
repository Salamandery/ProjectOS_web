import styled from 'styled-components';
import bg from './bg-principal.jpg';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    overflow: hidden;
`;
export const Wrapper = styled.div`
    display: flex;
    height: ${props => props.h};
    width: ${props => props.w};
`;
export const Content = styled.div`
    display: flex;
    width: 100%;
    align-self: stretch;
    overflow: auto;
    padding: 10px 15px;
    height: 100%;
    background-color: url(${bg});

	-webkit-transition: all 1s ease;  
	-moz-transition: all 1s ease;  
	-o-transition: all 1s ease;  
	-ms-transition: all 1s ease;  
	transition: all 1s ease;
`;
export const MenuBar = styled.div`
    overflow: auto;
    width: ${props => props.status === true ? "30%" : "0" };
    background-color: #e6e6e6;

	-webkit-transition: all .5s ease;  
	-moz-transition: all .5s ease;  
	-o-transition: all .5s ease;  
	-ms-transition: all .5s ease;  
    transition: width .5s ease;
`;
export const ButtomMenu = styled.button`
    padding: 0px 15px;
    text-align: center;
    color: #e6e6e6;
    font-size: 24px;
    background: #0059b3;
    border: 0;

    &:hover {
        opacity: .9;
        color: #fff;
    }
`;
export const LabelMenu = styled.button`
    border: 0;
    background: transparent;
    display: flex;
    align-self: stretch;
    align-items: center;
    font-weight: bold;
    font-size: 18px;
    padding: 5px 10px;

    .icon {
        font-size: 18px;
        color: #777;
    }
`;
export const ItemMenu = styled.button`
    display: ${props => props.status === true ? "flex" : "none" };
    justify-content: baseline;
    align-self: stretch;
    font-size: 16px;
    text-align: left;
    padding: 5px 15px;
    border: 0;
    background: transparent;

    .icon {
        font-size: 18px;
    }

    &:hover {
        background: #f2f2f2;
        font-weight: bold;

        .icon {
            color: #000;
            margin-right: 5px;
        }
    }
`;
export const GroupLabel = styled.div`
    display: ${props => props.status === true ? "flex" : "none" };
    flex-direction: column;
    align-self: stretch;

    -webkit-transition: all .5s ease;  
	-moz-transition: all .5s ease;  
	-o-transition: all .5s ease;  
	-ms-transition: all .5s ease;  
    transition: height .5s ease;
`;