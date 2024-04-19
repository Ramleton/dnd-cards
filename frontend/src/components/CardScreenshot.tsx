import React, { useRef } from 'react';
import Card from './Card';
import { Trait } from '../Home';
import { domToPng } from 'modern-screenshot';
import styled from 'styled-components';

interface ScreenshotCardProps {
    title: string,
    desc: string,
    icon: string,
    type: string,
    traits: Trait[]
}

const ScreenshotCard: React.FC<ScreenshotCardProps> = ({ title, desc, icon, type, traits }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const takeScreenshot = () => {
        const cardElement = cardRef.current;

        if (cardElement) {
            if (title) {
                domToPng(cardElement).then(dataUrl => {
                    const link = document.createElement('a');
                    link.download = `${title.replaceAll(' ', '-')}.png`;
                    link.href = dataUrl;
                    link.click();
                });
            }
        }
    };

    return (
        <ScreenshotContainer>
            <Card title={title} desc={desc} icon={icon} traits={traits} type={type} forwardedRef={cardRef} />
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