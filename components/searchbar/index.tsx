import { ChangeEvent, HTMLInputTypeAttribute } from 'react';
import styled from 'styled-components';
import Image, { StaticImageData } from 'next/image';

import { primaryColor } from '../../styles/colors';

interface Props {
    className?: string;
    name: string;
    icon: { src: string | StaticImageData; alt: string };
    id: string;
    type: HTMLInputTypeAttribute;
    placeholder: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({ className, name, icon, id, type, placeholder, onChange }: Props) {
    return (
        <InputWrapper className={`search_bar_wrapper ${className}`}>
            <Image src={icon.src} alt={icon.alt} width="25" />
            <input name={name} type={type} id={id} onChange={onChange} placeholder={placeholder} />
        </InputWrapper>
    );
}

const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-bottom: 2px solid;
    color: ${primaryColor};
    width: 100%;

    input {
        width: calc(100% - 35px);
        border: 0;
        outline: none;
        color: ${primaryColor};
        font-size: 1.2em;
        margin-left: 10px;
        font-weight: 900;

        &::placeholder {
            opacity: 0.8;
            color: ${primaryColor};
            font-weight: 300;
        }
    }
`;
