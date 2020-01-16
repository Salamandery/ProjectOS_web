import styled from 'styled-components';

export const Container = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .5);
    padding: 20px;
    z-index: 99999;

    display: flex;
    justify-content: center;
    align-items: ${props => props.AlignitemsModal || 'flex-start'};
`;
export const Content = styled.div`
    display: flex;
    justify-content: ${props => props.content || 'center'};
    align-items: ${props => props.items || 'center'};
    background: #e6e6e6;
    border-radius: 5px;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, .2);
    padding: 40px;
    width: ${props => props.size ? props.size : "400px"};
    height: ${props => props.h ? "100%" : "auto"};

    .closeModal {
        margin-top: ${props => props.h ? "-50%": "-120px"};
        margin-right: -20px;
        background: #e6e6e6;
        border: 0;
        border-radius: 4px;
        font-size: 24px;
    }

    h1 {
        font-size: 32px;
    }

    .labelModal {
        padding: 30px 10px 40px;
        font-weight: bold;
    }
`;