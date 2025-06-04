import React from 'react';
import css from './style.module.css';
import PinDropIcon from '@mui/icons-material/PinDrop';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Button from '../button';
import { Lead } from '../../shared/interfaces/lead';
import ProfilePhoto from '../profile-photo';
import { Status } from '../../shared/enums/status';
import { updateStatus } from '../../services/backend-comunication.service';

interface LeadCardProps {
  lead: Lead;
  i: number;
  onAnswer: () => void;
}

const CardBodyItem: React.FC<any> = ({children, noBorder,}) => {
  return (
    <div className={`${css['card-body-item']} gap-x-5 flex items-center ${!noBorder ? 'border-y-1 border-y-gray-200' : 'border-y-0'} px-6 py-3 text-gray-600`}>
      {children}
    </div>
  );
}

const LeadCard: React.FC<LeadCardProps> = ({ lead, onAnswer, i }) => {

  const expanded = lead.status !== Status.PENDING;

  const getPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price / 100);
  }

  const getDate = (dateString: string) => {
    const dateObj = new Date(dateString);
    const date = new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
    }).format(dateObj);

    const time = new Intl.DateTimeFormat("en-US", {
      timeStyle: "short",
    }).format(dateObj);

    return `${date} @ ${time}`;
  }

  const answerInvite = async (status: Status) => {
    try {
      await updateStatus(lead.id, status);
      onAnswer();
    } catch (error) {
      console.error("Error updating lead status:", error);
      return false;
    }
  }

  return (
    <div className="bg-white shadow-md pb-6 my-5">
      <div className="card-header flex p-6">
        <ProfilePhoto contactName={lead.contactFirstName} i={i} />
        <div className="ml-4">
          <div className="date text-lg font-bold">{lead.contactFirstName}</div>
          <div className="date">{getDate(lead.createdAt)}</div>
        </div>
      </div>
      <div className="card-body">
        <CardBodyItem>
          <span><PinDropIcon width="80px" /> {lead.contactAddress}</span>
          <span><BusinessCenterOutlinedIcon width="40px" /> {lead.category}</span>
          <span>Job ID: {lead.id}</span>
          {expanded && (<span><span className="font-bold">{getPrice(lead.price)}</span> Lead Invitation</span>)}
        </CardBodyItem>
        {expanded && (
          <CardBodyItem>
            <a href={`tel:${lead.contactPhoneNumber}`}><LocalPhoneOutlinedIcon /> <span className="text-[#ff6600e1] font-bold">{lead.contactPhoneNumber}</span> </a>
            <a href={`mailto:${lead.contactPhoneNumber}`}><EmailOutlinedIcon /> <span className="text-[#ff6600e1] font-bold">{lead.contactPhoneNumber}</span></a>
          </CardBodyItem>
        )}
        <CardBodyItem noBorder={expanded}>
          <span>{lead.description}</span>
        </CardBodyItem>
      </div>
      {!expanded && (
        <div className="card-footer mt-5 px-6 flex items-center gap-2">
          <Button onClick={() => answerInvite(Status.ACCEPTED)}>Accept</Button>
          <Button onClick={() => answerInvite(Status.REJECTED)} variant="secondary">Decline</Button>
          <div className="ml-5 text-gray-600">
            <span className="font-bold">{getPrice(lead.price)}</span> Lead Invitation
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadCard;