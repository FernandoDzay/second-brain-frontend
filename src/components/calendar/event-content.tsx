import { EventContentArg } from '@fullcalendar/core/index.js';

type Props = EventContentArg;

const EventContent: React.FC<Props> = (props) => {
    return <>{props.event.title}</>;
};

export default EventContent;
