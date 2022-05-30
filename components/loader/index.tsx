import { FC, forwardRef } from 'react';
import styled from 'styled-components';
import { primaryColor } from '../../styles/colors';

interface Props {
    radius?: number;
    color?: string;
    width?: number;
    height?: number;
    duration?: number;
    timing?: number;
    testId?: string;
}

const LoaderWrapper = styled.div`
    margin: 0 auto;
`;

const Loader: FC<Props> = forwardRef<SVGSVGElement, Props>(
    ({ radius = 5, color = primaryColor, width = 135, height = 30, duration, timing, testId }, ref) => {
        return (
            <LoaderWrapper data-testid={`interpunct-loader${testId ? '-' + testId : ''}`}>
                <svg
                    ref={ref}
                    version="1.1"
                    id="L4"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox={`0 0 ${4 * radius + 28} ${2 * radius}`}
                    enableBackground="new 0 0 0 0"
                    xmlSpace="preserve"
                    style={{ width, height }}
                >
                    <circle fill={color} stroke="none" cx={`${radius}`} cy={`${radius}`} r={`${radius}`}>
                        <animate
                            attributeName="opacity"
                            dur={duration ? `${duration}s` : '1.8s'}
                            values="0;1;0"
                            repeatCount="indefinite"
                            begin="0.1"
                        />
                    </circle>
                    <circle fill={color} stroke="none" cx={`${2 * radius + 14}`} cy={`${radius}`} r={`${radius}`}>
                        <animate
                            attributeName="opacity"
                            dur={duration ? `${duration}s` : '1.8s'}
                            values="0;1;0"
                            repeatCount="indefinite"
                            begin={timing ? `${timing + 0.1}` : '0.3'}
                        />
                    </circle>
                    <circle fill={color} stroke="none" cx={`${3 * radius + 28}`} cy={`${radius}`} r={`${radius}`}>
                        <animate
                            attributeName="opacity"
                            dur={duration ? `${duration}s` : '1.8s'}
                            values="0;1;0"
                            repeatCount="indefinite"
                            begin={timing ? `${2 * timing + 0.1}` : '0.5'}
                        />
                    </circle>
                </svg>
            </LoaderWrapper>
        );
    }
);

export default Loader;
