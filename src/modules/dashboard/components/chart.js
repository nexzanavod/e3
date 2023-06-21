import { ResponsiveBar } from '@nivo/bar'
const SampleChart = () => {
    const data = [
        {
            day: "Monday",
            degress: 59
        },
        {
            day: "Tuesday",
            degress: 61
        },
        {
            day: "Wednesday",
            degress: 550
        },
        {
            day: "Thursday",
            degress: 78
        },
        {
            day: "Friday",
            degress: 71
        },
        {
            day: "Saturday",
            degress: 56
        },
        {
            day: "Sunday",
            degress: 67
        }
    ];


    return (
        <div style={{ height: 400 }}>
            <ResponsiveBar
                data={data}
                keys={["degress"]}
                indexBy="day"
                margin={{ top: 0, right: 20, bottom: 50, left: 80 }}
                padding={0.3}
                valueScale={{ type: "linear" }}
                colors={["#207fff"]}
                animate={true}
                enableLabel={false}
                axisTop={null}
                axisRight={null}
                layout="horizontal" enableGridY={false} enableGridX={true}
            />
        </div>
    )
};
export default SampleChart;