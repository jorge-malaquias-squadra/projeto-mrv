import axios from "axios"
import { Lead } from "../shared/interfaces/lead";
import { Status } from "../shared/enums/status";

const API_URL = 'http://localhost:3001';


export async function getLeads(status: Status): Promise<Lead[]> {
  const url = new URL(API_URL + '/leads?status=' + status)
  // return fetch(url).then(res => res.json());
  return (await axios.get(url.toString()))?.data
}

export async function updateStatus(id: number, status: Status): Promise<boolean> {
  const url = new URL(API_URL + '/leads/' + id)
  return (await axios.patch(url.toString(), { status }))?.data
}