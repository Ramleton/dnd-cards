import React, { useContext, useRef } from 'react';
import Card from './Card';
import { domToPng } from 'modern-screenshot';
import styled from 'styled-components';
import CardContext from '../hooks/CardContext';

const ScreenshotCard: React.FC = () => {
    const cardProps = useContext(CardContext);
    const cardRef = useRef<HTMLDivElement>(null);

    const takeScreenshot = () => {
        const cardElement = cardRef.current;

        if (cardElement) {
            if (cardProps.title) {
                domToPng(cardElement).then(dataUrl => {
                    const link = document.createElement('a');
                    link.download = `${cardProps.title.replaceAll(' ', '-')}.png`;
                    link.href = dataUrl;
                    link.click();
                });
            }
        }
    };

    return (
        <ScreenshotContainer>
            <Card forwardedRef={cardRef} />
            <ScreenshotButton onClick={takeScreenshot}>
                <ScreenshotButtonText>Screenshot Card</ScreenshotButtonText>
            </ScreenshotButton>
        </ScreenshotContainer>
    );
};

const ScreenshotContainer = styled.div`
    margin: 1em 0em;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ScreenshotButton = styled.div`
    margin: 1em 0em;
    background-color: #3a3a3a;
    border-radius: 0.5em;

    &:hover {
        cursor: pointer;
        background-color: #4a4a4a;
    }
`;

const ScreenshotButtonText = styled.p`
    color: white;
    font-size: 1.3em;
    margin: 0.5em 0.5em;
`;

export default ScreenshotCard;