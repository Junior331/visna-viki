import { projectType } from '@/utils/types';
import { v4 as uuidv4 } from 'uuid';

export const projects: Array<projectType> = [
  {
    id: uuidv4(),
    progress: 80,
    status: 'Block',
    name: 'Project 01',
    text: `Lorem Ipsum'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.`
  },
  {
    id: uuidv4(),
    progress: 80,
    status: 'In Progress',
    name: 'Project 02',
    text: `Lorem Ipsum'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.`
  },
  {
    id: uuidv4(),
    progress: 80,
    status: 'To Do',
    name: 'Project 03',
    text: `Lorem Ipsum'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.`
  },
  {
    id: uuidv4(),
    progress: 80,
    status: 'In Review',
    name: 'Project 04',
    text: `Lorem Ipsum'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.`
  },
  {
    id: uuidv4(),
    progress: 80,
    status: 'Block',
    name: 'Project 05',
    text: `Lorem Ipsum'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.`
  },
  {
    id: uuidv4(),
    progress: 80,
    status: 'Done',
    name: 'Project 01',
    text: `Lorem Ipsum'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.`
  },
  {
    id: uuidv4(),
    progress: 80,
    status: 'In Progress',
    name: 'Project 02',
    text: `Lorem Ipsum'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.`
  },
  {
    id: uuidv4(),
    progress: 80,
    status: 'To Do',
    name: 'Project 03',
    text: `Lorem Ipsum'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.`
  },
  {
    id: uuidv4(),
    progress: 80,
    status: 'In Review',
    name: 'Project 04',
    text: `Lorem Ipsum'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.`
  },
  {
    id: uuidv4(),
    progress: 80,
    status: 'Block',
    name: 'Project 05',
    text: `Lorem Ipsum'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.`
  }
];
