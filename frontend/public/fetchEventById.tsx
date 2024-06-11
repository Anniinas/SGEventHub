// frontend/app/public/fetcEventById.tsx
import axios from 'axios';

export interface DataType {
  id: string;
  eventDetails: EventDetails;
  eventRules: EventRules;
  eventClasses: { [key: string]: EventParticipants };
}

export interface EventDetails {
  organizer: string;
  organizerUrl: string;
  promoter: string;
  promoterEmail: string;
  restrictions: string;
  resultType: string;
  showDate: number;
  showLastDate: number;
}

export interface EventRules {
  maxClassesInEvent: number;
  maxInClass: number;
  maxParticipantInClass: number;
  requireVRLAccount: string;
}

export interface EventParticipants {
  participants: string;
}

export const fetcEventById = async (url: string, id: string): Promise<DataType> => {
  try {
    const response = await axios.get(`${url}/${id}`);
    const item = response.data.item[0];
    console.log(response);
    const data: DataType = {
      id: item.id,
      eventDetails: {
        organizer: item.eventDetails.organizer,
        organizerUrl: item.eventDetails.organizerUrl,
        promoter: item.eventDetails.promoter,
        promoterEmail: item.eventDetails.promoterEmail,
        restrictions: item.eventDetails.restrictions,
        resultType: item.eventDetails.resultType,
        showDate: item.eventDetails.showDate,
        showLastDate: item.eventDetails.showLastDate
      },
      eventRules: {
        maxClassesInEvent: item.eventRules.maxClassesInEvent,
        maxInClass: item.eventRules.maxInClass,
        maxParticipantInClass: item.eventRules.maxParticipantInClass,
        requireVRLAccount: item.eventRules.requireVRLAccount
      },
      eventClasses: Object.keys(item.eventClasses).reduce((acc, classKey) => {
        acc[classKey] = {
          participants: item.eventClasses[classKey].participants,
        };
        return acc;
      }, {} as { [key: string]: { participants: string } })
    };
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
