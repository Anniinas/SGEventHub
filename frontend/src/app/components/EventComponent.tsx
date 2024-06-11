// frontend/components/EventComponent.tsx

"use client"

import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { fetcEventById, DataType } from '../../../public/fetchEventById';

const EventComponent: React.FC = () => {
  const [data, setData] = useState<DataType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  //const searchParams = useSearchParams();
  const id = useParams().id;

  useEffect(() => {
    const loadData = async () => {
      if (id) {
        try {
          const result = await fetcEventById('/api', id as string);
          setData(result);
          setLoading(false);
        } catch (err) {
          setError('Failed to fetch data');
          setLoading(false);
        }
      }
    };

    loadData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!data) return <div>No data found</div>;

  return (
    <div>
      <h1>Kisakutsu</h1>
      <div>
        <ul>
          <li>Järjestäjä: <a href={data.eventDetails.organizerUrl}>{data.eventDetails.organizer}</a></li>
          <li>Vastuuhenkilö: <a href={`mailto:${data.eventDetails.promoterEmail}`}>{data.eventDetails.promoter}</a> </li>
          <li>Kilpailupäivä: {data.eventDetails.showDate}</li>
          <li>Viimeinen osallistumispäivä: {data.eventDetails.showLastDate}</li>
          <li>Avoimuus: {data.eventDetails.restrictions}</li>
          <li>Tulosten ratkaisu: {data.eventDetails.resultType}</li>
        </ul>
        <ul>
          <li>Yhteen luokkaan otetaan maksimissaan {data.eventRules.maxInClass} osallistujaa</li>
          <li>Yhdeltä ratsastajalta maksimissaan {data.eventRules.maxParticipantInClass} hevosta / luokka</li>
          <li>Yksi hevonen saa osallistua maksimissaan {data.eventRules.maxClassesInEvent} luokkaan koko kilpailuissa</li>
          <li>VRL tunnus {data.eventRules.requireVRLAccount === "true" ? "on pakollinen" : "on vapaaehtoinen"}.</li>
        </ul>
      </div>

      <div>
        <h3>Luokkalistaus</h3>
        <ul>
          {Object.keys(data.eventClasses).map((classKey, classIndex) => (
            <li key={classKey}>Luokka {classIndex + 1}: {classKey}</li>
          ))}
        </ul>

      </div>

      <div>
        <h3>Osallistujat</h3>
        {Object.keys(data.eventClasses).map((classKey, classIndex) => (
          <div key={classKey}>
            <h3>Luokka {classIndex + 1}: {classKey}</h3>
            <ul>
              {data.eventClasses[classKey].participants.split(', ').map((participant, index) => (
                <li key={index}>{participant}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div >
  );
};

export default EventComponent;
