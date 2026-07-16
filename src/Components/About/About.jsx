import Leadership from "./Leadership";
import AboutSection from "./AboutSection";
import AboutVideo from "./AboutVideo";

const Dashboard = () => {

    return (
        <div style={{ background: "var(--cream, #F7F3EA)" }}>
            <Leadership />
            <AboutSection/>
            <AboutVideo/>
        </div>
    );
};

export default Dashboard;