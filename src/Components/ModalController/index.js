import React from 'react';
import {
    FaRegWindowClose, 
} from 'react-icons/fa';
import { Container, Content } from './style';

export default function ModalController({ children, size, content, items, AlignitemsModal, onHandler, h }) {
  return (
    <Container AlignitemsModal={AlignitemsModal}>
        <Content size={size} content={content} items={items} h={h}>
            {children}

            <button className="closeModal" onClick={e=>onHandler(e)}>
                <FaRegWindowClose />
            </button>
        </Content>
    </Container>
  );
}
