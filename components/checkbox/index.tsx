import styled from 'styled-components';

import { primaryColor, fontColor } from '../../styles/colors';
interface Props {
    id: string;
    name: string;
    checked?: boolean;
    label: string;
    onChange?: (checked: boolean) => void;
}

export default function Checkbox({ id, name, checked, label, onChange }: Props) {
    return (
        <CheckboxCont>
            <CustomCheckbox
                type="checkbox"
                id={id}
                name={name}
                checked={checked}
                onChange={(e) => onChange && onChange(e.target.checked)}
            />
            <CheckboxLabel htmlFor={id}>{label}</CheckboxLabel>
        </CheckboxCont>
    );
}

const CheckboxCont = styled.div`
    position: relative;
    display: flex;
    padding: 4px 0;
`;

const CustomCheckbox = styled.input`
    margin-right: 15px;
    appearance: none;
    background-color: #fff;
    font: inherit;
    color: ${fontColor};
    width: 1.15em;
    height: 1.15em;
    border: 0.1em solid ${fontColor};
    border-radius: 0.2em;
    transform: translateY(-0.075em);
    display: grid;
    place-content: center;
    &::before {
        content: '';
        width: 0.5em;
        height: 0.5em;
        transform: scale(0);
        transition: 120ms transform ease-in-out;
        box-shadow: inset 1em 1em ${primaryColor};
    }
    &:checked::before {
        transform: scale(1);
    }
`;

const CheckboxLabel = styled.label`
    font-weight: 300;
`;
