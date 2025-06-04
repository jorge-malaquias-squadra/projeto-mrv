'use client';
import React, { Suspense, useEffect, useState } from 'react';
import { Status } from '../../shared/enums/status';
import { getLeads } from '../../services/backend-comunication.service';
import LeadCard from '../lead-card';
import { Lead } from '../../shared/interfaces/lead';
import Loading from '../loading';

interface LeadsListProps {
  status: Status;
}

const LeadsList: React.FC<LeadsListProps> = ({ status }) => {

  const [leads, setLeads] = useState<Lead[] | null>(null);

  const loadLeads = async () => {
    const fetchedLeads = await getLeads(status);
    setLeads(fetchedLeads);
  }

  useEffect(() => {
    (async () => loadLeads())();
  }, []);

  if (leads === null) {
    return <div className="mt-5 w-full h-full flex justify-center items-center">
      <Loading />
    </div>;
  }

  if (!leads.length) {
    return <div className="mt-5 w-full h-full flex justify-center items-center">
      Nenhum convite para exibir
    </div>;
  }

  return (
    <>
      {leads?.map((lead, key) => (
        <LeadCard onAnswer={loadLeads} lead={lead} key={key} i={key} />
      ))}
    </>
  );
};

export default LeadsList;