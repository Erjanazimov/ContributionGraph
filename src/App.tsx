import React, {useEffect, useState} from 'react';
import moment from 'moment';
import './App.sass';
import axios from "axios";
import 'moment/locale/ru';

interface DateCount {
    [date: string]: number;
}

const App: React.FC = () => {
    const [days, setDays] = useState<string[]>([]);
    const [months, setMonths] = useState<string[]>([]);

    const [calendar, setCalendar] = useState<DateCount | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://dpg.gg/test/calendar.json');
                const data = response.data;
                setCalendar(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();

        return () => {
        };
    }, []);
    useEffect(() => {
        const month = moment();
        let monthsList = [];
        for (let i = 0; i <= 12; i++) {
            const durationMonth = moment.duration({months: 1});
            monthsList.push(moment(month).format("MMM"));
            month.subtract(durationMonth);
        }
        setMonths(monthsList);

        let day = moment();
        let daysList = [];
        const dayOfWeekOffset = (7 - parseInt(moment().format("d"), 10)) % 7;
        for (let i = 0; i < dayOfWeekOffset; i++) {
            daysList.push("");
        }

        for (let i = 357; i >= 0; i--) {
            daysList.push(moment(day).format("YYYY-MM-DD"));
            const duration = moment.duration({days: 1});
            day.subtract(duration);
        }

        setDays(daysList);
    }, []);


    const cycleColor = (event: React.MouseEvent<HTMLLIElement>) => {
        const currentStep = Number(event.currentTarget.getAttribute('data-activity')) || 0;
        let nextStep = currentStep + 1;
        if (nextStep === 5) {
            nextStep = 0;
        }
        event.currentTarget.setAttribute('data-activity', nextStep.toString());
    };

    return (
        <div className='week_block'>
            <ol className="days-of-week">
                <li>ПН</li>
                <li>СР</li>
                <li>ПТ</li>
            </ol>
            <div className="month">
                <ol>
                    {months.map((month, index) => (
                        <li key={index}>{month}</li>
                    ))}
                </ol>
            </div>
            <div className="days">
                <ol>
                    <div className='week'>
                        {days.map((day, index) => {
                            const date = moment("2022-11-03");
                            const formattedDate = date.format("dddd, MMMM D, YYYY");
                            if (calendar && calendar[day] <= 9) {
                                return <li key={index} onClick={cycleColor} style={{
                                    background: '#ACD5F2'
                                }}>
                                    <span className="tooltip">
                                        <span className='tooltip_title'>
                                            {calendar?.[day] ?? 0} contributions
                                    </span>
                                        <br/>
                                    <span className="tooltip_text">{formattedDate}</span>
                                    </span></li>
                            }

                            if (calendar && calendar[day] >= 10 && calendar[day] <= 19) {
                                return <li key={index} onClick={cycleColor} style={{
                                    background: '#7FA8C9'
                                }}>
                                 <span className="tooltip">
                                        <span className='tooltip_title'>
                                            {calendar?.[day] ?? 0} contributions
                                    </span>
                                        <br/>
                                    <span className="tooltip_text">{formattedDate}</span>
                                    </span>
                                </li>
                            }

                            if (calendar && calendar[day] >= 20 && calendar[day] <= 29) {
                                return <li key={index} onClick={cycleColor} style={{
                                    background: '#527BA0'
                                }}>
                                    <span className="tooltip">
                                        <span className='tooltip_title'>
                                            {calendar?.[day] ?? 0} contributions
                                    </span>
                                        <br/>
                                    <span className="tooltip_text">{formattedDate}</span>
                                    </span>
                                </li>
                            }

                            if (calendar && calendar[day] >= 30) {
                                return <li key={index} onClick={cycleColor}>
                                    <span className="tooltip">
                                        <span className='tooltip_title'>
                                            {calendar?.[day] ?? 0} contributions
                                    </span>
                                        <br/>
                                    <span className="tooltip_text">{formattedDate}</span>
                                    </span>
                                </li>
                            }


                            return (
                                <li key={index} onClick={cycleColor}>
                                    <span className="tooltip">
                                        <span className='tooltip_title'>
                                            {calendar?.[day] ?? 'No'} contributions
                                    </span>
                                        <br/>
                                    <span className="tooltip_text">{formattedDate}</span>
                                    </span>
                                </li>
                            )
                        })}
                    </div>
                </ol>
            </div>
            <div className='background_block'>
                <p style={{
                    paddingRight: 10
                }}>
                    Меньше
                </p>
                <div className='list'>
                    <p style={{
                        backgroundColor: '#EDEDED'
                    }}/>
                    <p style={{
                        backgroundColor: '#ACD5F2'
                    }}/>
                    <p style={{
                        backgroundColor: '#7FA8C9'
                    }}/>
                    <p style={{
                        backgroundColor: '#527BA0'
                    }}/>
                    <p style={{
                        backgroundColor: '#254E77'
                    }}/>
                </div>
                <p style={{
                    paddingLeft: 10
                }}>
                    Больше
                </p>
            </div>
        </div>
    );
};

export default App;
