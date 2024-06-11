// frontend/pages/index.tsx

"use client"

import DataComponent from '../components/DataComponent';

const CalendarPage: React.FC = () => {
  return (
    <div>
      <h1>Calendar</h1>
      <DataComponent />
    </div>
  );
};

export default CalendarPage;
