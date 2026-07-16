import Slider from "./Slider";
import VolunteerGrid from "./Volunteergrid";
import AboutCharity from "./Aboutcharity";
import WhatWeDo from "./WhatWeDo";
import PopularCauses from "./PopularCauses";
import EventsSection from "./Eventssection";

const Dashboard = () => {

    return (
        <div style={{background:"var(--cream, #F7F3EA)"}}>
            <Slider />
            <VolunteerGrid/>
            <AboutCharity/>
            <WhatWeDo/>
            <PopularCauses/>
            <EventsSection/>
        </div>
    );
};

export default Dashboard;