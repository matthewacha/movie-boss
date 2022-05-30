import { ReactNode } from 'react';
import styled from 'styled-components';

import { primaryColor } from '../../styles/colors';

interface Props {
    children: ReactNode;
    visible: boolean;
}

export default function Alert({ children, visible }: Props) {
    return (
        <AlertWrapper visible={visible}>
            <AlertContent>{children}</AlertContent>
        </AlertWrapper>
    );
}

const AlertWrapper = styled.div`
    display: ${(props: { visible: boolean }) => (props.visible ? 'flex' : 'none')};
    width: 100%;
    justify-content: center;
`;

const AlertContent = styled.span`
    background-color: #fff;
    padding: 10px 16px;
    border: 1px solid ${primaryColor};
    border-radius: 10px;
    z-index: 99;
`;
