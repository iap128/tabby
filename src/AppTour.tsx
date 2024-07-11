import { Tour, TourProps } from "antd";
import { FC, useEffect, useState } from "react";
import { getCookie } from "typescript-cookie";

interface Props {
    closeAction: () => void;
    weatherRef: React.MutableRefObject<null>;
    quickLinksRef: React.MutableRefObject<null>;
    settingsRef: React.MutableRefObject<null>;
}

const AppTour: FC<Props> = ({ closeAction, weatherRef, quickLinksRef, settingsRef }) => {
    const [open, setOpen] = useState(false);
    const firstVisit = getCookie('firstVisit');
  
    useEffect(() => {
      if (firstVisit == null) {
        setOpen(true);
    }}, [firstVisit]);

    const close = () => {
        setOpen(false);
        closeAction();
    }
    
    const steps: TourProps['steps'] = [
        {
            title: 'Welcome to Tabby',
            description: 'This is a simple new tab page that shows the time, weather, and quick links.',
            cover: <img src="./tabby.png" alt="tabby cat"/>,
            target: null,
        },
        {
            title: 'Weather',
            description: 'The weather card shows current conditions and a 5-day forecast. It is powered with a weather underground API key.',
            target: () => weatherRef.current,
        },
        {
            title: 'Quick Links',
            description: 'The quick links card shows a list of links that you can add and quickly access.',
            target: () => quickLinksRef.current,
        },
        {
            title: 'Ready to get started?',
            description: 'Open settings to get an API key and add your links',
            target: () => settingsRef.current,
        }
    ];

    return (
        <Tour open={open} onClose={close} steps={steps} />
    )
};

export default AppTour;